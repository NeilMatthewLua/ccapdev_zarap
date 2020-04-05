var express = require('express')
var router = express.Router()
const PicturesController = require('../controllers/pictures.js')

//Returns picture based on the specified ID 
router.get('/:id', PicturesController.get_by_pictureID)

/*
    Saves the pictures passed in the body 
    then returns a list of picture IDs
*/
router.post('/save-pictures', PicturesController.save_pictures)

//Saves the profile picture and uploads it to db 
router.post('/upload-profile-pic', PicturesController.upload_profile_pic)

//Saves multiple pictures in storage and returns the picture objects
router.post('/edit-review-pics/:destination', PicturesController.edit_review_pictures)

/* 
    Deletes the existing pictures from the review that were unused 
    in the new edited review
*/
router.post('/delete-existing/:id', PicturesController.delete_existing_pictures)

/* 
    Deletes the pictures that were saved to storage but were unused 
    (either in uploading profile pictures or uploading pictures while editing reviews) 
*/
router.post('/delete-unused-pics', PicturesController.delete_unused_pictures)

/* 
    Deletes the picture that was saved to storage but were unused 
    (uploading profile pic while editing profile) 
*/
router.post('/delete-unused-profile-pics', PicturesController.delete_unused_profile_picture)


module.exports = router; 