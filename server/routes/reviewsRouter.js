var express = require('express');
var router = express.Router();
const path = require('path');
const Review = require('../models/reviews');

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
    Review.findOneAndUpdate({reviewID : id}, {$inc : {'upvotes' : amount}}, (err,res) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    })
})

router.post('/addReview/:id', (req,res) => {
    let pictures = [];
    for(let i = 0; i < req.body.photos.length; i++) {
        pictures.push(req.body.photos[i].pictureID)
    }
    
    let item = new Review({
        reviewerID :req.body.userID.userID,
        restaurantID : req.body.restaurantID,
        rating : req.body.rating,
        review: req.body.review,
        upvotes: 0,
        reviewPictures: pictures
    });
    item.save()
    .then(doc => {
        res.send({review: doc})
    })
})

router.post('/:id', (req, res) => {
    let amount = req.body.value; 
    let id = req.params.id; 
    Review.findOneAndUpdate({reviewID : id}, {$inc : {'upvotes' : amount}}, (err,res) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    })
})

module.exports = router; 