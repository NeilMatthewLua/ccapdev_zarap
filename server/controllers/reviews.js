const fs = require('fs'); 
const mongoose = require('mongoose');
const Review = require('../models/reviews');
const Restaurant = require('../models/restaurants');

//Get all reviews
exports.get_all_reviews = (req, res) => { 
    Review.find({}, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc); 
    });
}; 

//Get review based on review id
exports.get_reviews_by_reviewID = (req, res) => { 
    let id = req.params.id
    Review.findOne({ reviewID : id }, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc) 
    });
}; 

//Get review based on restaurant id
exports.get_reviews_by_restaurantID = (req, res) => { 
    let id = req.params.id
    Review.find({ restaurantID : id }, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc) 
    });
}; 

//Get review based on reviewer id
exports.get_reviews_by_userID = (req, res) => { 
    let id = req.params.id
    Review.find({ reviewerID : id }, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc) 
    });
}; 

//Increments the upvotes of a review by amount 
exports.increment_post_upvotes = (req, res) => {
    let amount = req.body.value; 
    let id = req.params.id; 
    Review.findOneAndUpdate({reviewID : id}, {$inc : {'upvotes' : amount}}, (err, result) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    })
}; 

//Adds a review to the db
exports.add_review = (req,res) => {
    
    let reviewerID = mongoose.Types.ObjectId();
    let overallRatingUpdate = Math.round(((req.body.restaurant.overallRating * req.body.restaurant.reviews.length) + req.body.rating) / (req.body.restaurant.reviews.length + 1) * 10) / 10;

    let item = new Review({
        reviewID: reviewerID, 
        reviewerID: req.body.userID.userID,
        restaurantID: req.body.restaurant.restaurantID,
        rating: req.body.rating,
        review: req.body.review,
        upvotes: 0,
        reviewPictures: req.body.reviewPictures
    });
    
    item.save()
    .then(async doc => {
        await Restaurant.findOneAndUpdate({restaurantID : req.body.restaurant.restaurantID}, {$push : {'reviews' : reviewerID}
        }, { new: true })
        .then(() =>{
                Restaurant.findOneAndUpdate({restaurantID : req.body.restaurant.restaurantID},
                {'overallRating' : overallRatingUpdate}, {new: true })
                .then(() => res.send({review: doc}))
                .catch(() => res.status(500))
            })
        .catch(() => res.status(500))

        res.status(200).send({review: doc})
    })
};

//Edits the review
exports.edit_review = (req, res) => {
    let data = req.body; 
    let id = req.params.id; 
    Review.findOneAndUpdate({reviewID : id}, {'review': data.review, 'rating': data.rating, 'reviewPictures' : data.photos}, (err, result) => {
        if (err) throw err
        res.status(200).send(result); 
    })
}; 

