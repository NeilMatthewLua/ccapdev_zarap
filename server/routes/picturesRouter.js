var express = require('express')
var router = express.Router()
const fs = require('fs-extra');
const multer = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const Picture = require('../models/pictures')

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
        fs.mkdirsSync(path);
        cb(null, path);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

router.get('/', (req, res) => {
    res.send("okay")
})

router.get('/:id', (req, res) => {
    let id = req.params.id  
    Picture.find({ pictureID : id }, (err, doc) => {
        if(err) res.send(err); 
        res.send(doc); 
    })
})

router.post('/save-picture', (req, res) => {
    //Save Pictures
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

    upload(req, res, function(err) {
         
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
        let result = files.map(obj => (({...obj, id : counter++})));
        result = files.map(obj => (({...obj, path : `images/${req.params.destination}/${obj.filename}`})));
        console.log(result); 
        res.send(result);
    });
});

module.exports = router; 