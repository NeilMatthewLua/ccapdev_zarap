var express = require('express')
var router = express.Router()
const fse = require('fs-extra');
const fs = require('fs'); 
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const Picture = require('../models/pictures')
const Review = require('../models/reviews')

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //Save the folder in the directory specified in params 
        let dest = req.params.destination;
        let path = `${process.env.IMG_PATH}${dest}`;
        fse.mkdirsSync(path);
        cb(null, path);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Get Picture Object by ID 
router.get('/:id', (req, res) => {
    let id = req.params.id  
    Picture.findOne({ pictureID : id }, (err, doc) => {
        if(err) res.status(500).send('Error on the server.'); 
        res.status(200).send(doc)  
    })
})

router.post('/save-pictures', async (req, res) => {
    let pics = req.body; 
    let ids = [];
    for(let i = 0; i < pics.length; i++) {
        let pic = new Picture ({ 
            url : pics[i]
        })
        ids.push(pic.pictureID); 
        await pic.save()
                 .then()
                 .catch(err => res.status(500).send("Server Error"))
    }
    res.send(ids); 
})

router.post('/upload-profile-pic', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('photos');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        res.send(req.file); 
    });
});

router.post('/upload-multiple/:destination', (req, res) => {
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('photos', 5);

    upload(req, res, async function(err) {
         
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        const files = req.files;
        let counter = 0; //Change this to a global id counter
        let pictureID = mongoose.Types.ObjectId();
        let result = files.map(obj => (({...obj, id : counter++})));
        result = files.map(obj => (({...obj, path : `images/${req.params.destination}/${obj.filename}`, pictureID: pictureID})));
        res.send(result);

        let mongoDestination = `http://localhost:9090/static/${req.params.destination}/` + result[0].filename;

        let pic = new Picture({
            pictureID: pictureID,
            url: mongoDestination
        })
        await pic.save()
    });
});

router.post('/edit-review-pics/:destination', (req, res) => {
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('photos', 5);

    upload(req, res, async function(err) {
         
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let id = mongoose.Types.ObjectId();
        let result = req.files
        result = result.map(obj => (({...obj, path : `images/${req.params.destination}/${obj.filename}`, pictureID: id})));
        res.send(result);
    });
});

router.post('/delete-existing/:id', (req, res) => {
    let reviewID = req.params.id    
    let newPictures = req.body.newPictures; 
    let skip = 0;
    let newIDs = [] 
    Review.findOne({'reviewID': reviewID}, async (err, review) => {
        if(err) throw err; 
        let reviewPics = review.reviewPictures;   
        for(let i = 0; i < reviewPics.length; i++) {
            //Look for the existing pictures of the review and compare if any remain the same 
            await Picture.findOne({'pictureID' : reviewPics[i]}, async (error, pic) => {
                if(error) throw error; 
                let found = false; 
                for(let j = 0; j < newPictures.length && !found; j++) {
                    if(newPictures[j] === pic.url) {
                        newIDs.push(reviewPics[i]); 
                        found = true; 
                        skip++; 
                    }
                }
                //Delete the review pictures that are no longer used 
                if(!found) {
                    let doc = pic.url;    
                    let relPath = doc.split('/');
                    let removePath = `images/${relPath[4]}/${relPath[5]}`;
                    fs.unlink(removePath, (err) => {
                        if (err) throw err;
                    });
                    await Picture.deleteOne({'pictureID' : reviewPics[i]}, (error, result) => {
                        if(error) throw error; 
                        console.log(reviewPics[i] + " was deleted from DB")
                    })
                    console.log(`${removePath} was deleted`);
                }    
            })
        }
        for(let j = skip; j < newPictures.length; j++) {
            let newPic = new Picture ({
                url : newPictures[j]
            })
            newIDs.push(newPic.pictureID); 
            await newPic.save().catch(err => console.log(err)); 
        }
        res.status(200).send(newIDs); 
    })
})

router.post('/delete-unused-pics', async (req, res) => {
    let urls = req.body.urls;   
    let found = false;
    let skip = 999;   
    let i; 
    //Pass by pictures that are part of the review
    for(i = 0; i < urls.length && !found; i++) {
        await Picture.findOne({'url' : urls[i]}, (err, result) => {
            if(result === null) {
               found = true;
               skip = i;      
            }
        }) 
    }
    // Delete unused pictures
    for(let j = skip; j < urls.length; j++) {
        let url = urls[j]; 
        let relPath = url.split('/');
        let removePath = `images/${relPath[4]}/${relPath[5]}`;
        fs.unlink(removePath, (err) => {
            if (err.code == 'ENOENT') 
                console.log("File no longer Exists"); 
            else if(err) 
                throw err; 
            else
                console.log(`${removePath} was deleted`);
        });
    }
    res.status(200).send(urls);
})

module.exports = router; 