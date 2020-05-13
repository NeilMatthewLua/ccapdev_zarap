var express = require('express');
var router = express.Router(); 
const mongoose = require('mongoose');
const Review = require('../models/reviews');
const Restaurant = require('../models/restaurants');
const ReviewsController = require('../controllers/reviews'); 


//Get all reviews
router.get('/', ReviewsController.get_all_reviews);

//Get review based on review id
router.get('/reviewID/:id', ReviewsController.get_reviews_by_reviewID);

//Get review based on restaurant idww
router.get('/restaurantID/:id', ReviewsController.get_reviews_by_restaurantID);

//Get review based on reviewer id
router.get('/userID/:id', ReviewsController.get_reviews_by_userID);

//Increments the upvotes of a review by amount 
router.post('/increment/:id', ReviewsController.increment_post_upvotes); 

//Adds a review to the db
router.post('/addReview/:id', ReviewsController.add_review);

//Edits the review
router.post('/edit-review/:id', ReviewsController.edit_review);


module.exports = router; 