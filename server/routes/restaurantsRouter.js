var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const Restaurant = require('../models/restaurants');

router.get('/', (req, res) => { //Get all Restos
    Restaurant.find({}, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
}); 

router.get('/:id', (req, res) => { //Get Resto based on Resto ID 
    let id = req.params.id
    Restaurant.findOne({ restaurantID : id }, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
});

router.get('owner/:id', (req, res) => { //Get Resto based on Owner ID
    let id = req.params.id
    Review.find({ ownerID : id }, (err, doc) => {
        if(err) throw err; 
        return res.json(doc); 
    });
});

module.exports = router; 