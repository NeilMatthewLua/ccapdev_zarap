var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const Review = require('../models/reviews');
const Restaurant = require('../models/restaurants');

//Get all reviews
router.get('/', (req, res) => { 
    Review.find({}, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc); 
    });
}); 

//Get review based on review id
router.get('/reviewID/:id', (req, res) => { 
    let id = req.params.id
    Review.findOne({ reviewID : id }, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc) 
    });
});

//Get review based on restaurant id
router.get('/restaurantID/:id', (req, res) => { 
    let id = req.params.id
    Review.find({ restaurantID : id }, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc) 
    });
});

//Get review based on reviewer id
router.get('/userID/:id', (req, res) => { 
    let id = req.params.id
    Review.find({ reviewerID : id }, (err, doc) => {
        if(err) throw err; 
        res.status(200).send(doc) 
    });
});

//Increments the upvotes of a review by amount 
router.post('/increment/:id', (req, res) => {
    let amount = req.body.value; 
    let id = req.params.id; 
    Review.findOneAndUpdate({reviewID : id}, {$inc : {'upvotes' : amount}}, (err, result) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    })
})

router.post('/addReview/:id', (req,res) => {
    let pictures = [];
    for(let i = 0; i < req.body.photos.length; i++) {
        pictures.push(req.body.photos[i].pictureID)
    }
    
    let reviewerID = mongoose.Types.ObjectId();
    let overallRatingUpdate = Math.round(((req.body.restaurant.overallRating * req.body.restaurant.reviews.length) + req.body.rating) / (req.body.restaurant.reviews.length + 1) * 10) / 10;

    let item = new Review({
        reviewID: reviewerID, 
        reviewerID: req.body.userID.userID,
        restaurantID: req.body.restaurant.restaurantID,
        rating: req.body.rating,
        review: req.body.review,
        upvotes: 0,
        reviewPictures: pictures
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
})

router.post('/edit-review/:id', (req, res) => {
    let data = req.body; 
    let id = req.params.id; 
    Review.findOneAndUpdate({reviewID : id}, {'review': data.review, 'rating': data.rating, 'reviewPictures': data.pictureIDs.data}, (err, result) => {
        if (err) throw err
        res.status(200).send(result); 
    })
})

router.post('/:id', (req, res) => {
    let amount = req.body.value; 
    let id = req.params.id; 
    Review.findOneAndUpdate({reviewID : id}, {$inc : {'upvotes' : amount}}, (err,result) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    })
})

module.exports = router; 