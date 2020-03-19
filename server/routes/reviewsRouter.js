var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const Review = require('../models/reviews');

router.get('/', (req, res) => { //Get all reviews
    Review.find({}, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
}); 

router.get('/:id', (req, res) => { //Get review based on review id
    let id = req.params.id
    Review.findOne({ reviewID : id}, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
});

router.get('restaurant/:id', (req, res) => { //Get review based on restaurant id
    let id = req.params.id
    Review.find({ restaurantID : id}, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
});

router.get('user/:id', (req, res) => { //Get review based on reviewer id
    let id = req.params.id
    Review.find({ userID : id}, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
});

module.exports = router; 