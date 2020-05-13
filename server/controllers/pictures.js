const fse = require('fs-extra');
const fs = require('fs'); 
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const Picture = require('../models/pictures')
const Review = require('../models/reviews')

// Functions which filters image types to accept and save to storage
const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

//Specify storge location of the images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //Save the folder in the directory specified in params 
        let dest = req.params.destination;
        let path = `${process.env.IMG_PATH}${dest}`;
        fse.mkdirsSync(path);
        cb(null, path);
    },

    // add in the filename 
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


//Returns picture based on the specified ID 
exports.get_by_pictureID = (req, res) => {
    let id = req.params.id  
    Picture.findOne({ pictureID : id }, (err, doc) => {
        if(err) res.status(500).send('Error on the server.'); 
        res.status(200).send(doc)  
    })
}; 

/*
    Saves the pictures passed in the body 
    then returns a list of picture IDs
*/
exports.save_pictures = async (req, res) => {
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
}; 

//Saves the profile picture and uploads it to db 
exports.upload_profile_pic = (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('photos');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file

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
}; 

//Saves multiple pictures in storage and returns the picture objects 
exports.edit_review_pictures = (req, res) => {
    //Limit to 5 pictures to save to db 
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('photos', 5);
    upload(req, res, async function(err) {
         // req.files contains information of uploaded file

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
        //Create the picture objects to save to the db  
        let result = req.files
        //Assign the new urls to serve the images
        result = result.map(obj => (({...obj, path : `images/${req.params.destination}/${obj.filename}`, pictureID: mongoose.Types.ObjectId()}))); 
        res.send(result);
    });
}; 

//Deletes the existing pictures from the review that were unused 
exports.delete_existing_pictures = (req, res) => {
    let reviewID = req.params.id    
    let newPictures = req.body.newPictures; 
    let skip = 0; //Counts the number of pictures that are part of the original review  
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
                        if(err) {
                            if (err.code == 'ENOENT') 
                                console.log("File no longer Exists");
                            else 
                                throw err 
                        }
                    });
                    await Picture.deleteOne({'pictureID' : reviewPics[i]}, (error, result) => {
                        if(error) throw error; 
                        console.log(reviewPics[i] + " was deleted from DB")
                    })
                    console.log(`${removePath} was deleted`);
                }    
            })
        }
        //Save the new pictures to the db 
        for(let j = skip; j < newPictures.length; j++) {
            let newPic = new Picture ({
                url : newPictures[j]
            })
            newIDs.push(newPic.pictureID); 
            await newPic.save().catch(err => console.log(err)); 
        }
        res.status(200).send(newIDs); 
    })
}; 


/* 
    Deletes the pictures that were saved to storage but were unused 
    (uploading pictures while editing reviews) 
*/
exports.delete_unused_pictures = async (req, res) => {
    let urls = req.body.urls;   
    let found = false;
    let skip = 999;   
    let i;   
    //Pass by pictures that are part of the existing review
    for(i = 0; i < urls.length && !found; i++) {
        await Picture.findOne({'url' : urls[i]}, (err, result) => {
            if(result == null) {
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
            if(err) {
                if (err.code == 'ENOENT') 
                    console.log("File no longer Exists");
                else 
                    throw err 
            }
            else
                console.log(`${removePath} was deleted because it was unused`);
        });
    }
    urls.splice(skip, urls.length - skip - 1); 
    res.status(200).send(urls);
}; 

/* 
    Deletes the picture that was saved to storage but were unused 
    (uploading profile pic while editing profile) 
*/
exports.delete_unused_profile_picture = async (req, res) => {
    let url = req.body.urls;   
    let found = true;   
    //Check if the picture is inside the db 
    if(url != undefined) {
        await Picture.findOne({'url' : url.toString()}, (err, result) => { 
            if(result == null) {
                found = false;
            }
        }) 
        //If not, then delete the image in storage 
        if(!found) {  
            let relPath = url.split('/');
            let removePath = `images/${relPath[4]}/${relPath[5]}`;
            fs.unlink(removePath, (err) => {
                if(err) {
                    if (err.code == 'ENOENT') 
                        console.log("File no longer Exists");
                    else 
                        throw err 
                }
                else
                    console.log(`${removePath} was deleted because it was unused profile`);
            });
        }
    }
    res.status(200).send(url);
};