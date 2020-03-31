var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const Restaurant = require('../models/restaurants');

//Get all Restos
router.get('/', (req, res) => { 
    Restaurant.find({}, (err, doc) => {
        if(err) res.status(500).send('Error on the server.');
        res.status(200).send(doc) 
    });
}); 

//Get Resto based on Resto ID
router.get('/:id', (req, res) => {  
    let id = req.params.id
    Restaurant.findOne({ restaurantID : id }, (err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc)  
    });
});

//Get Resto based on Owner ID
router.get('/owner/:id', (req, res) => { 
    let id = req.params.id
    Restaurant.find({ ownerID : id }, (err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc) 
    });
});

router.post('/update-rating/:id', (req, res) => { 
    let id = req.params.id
    let body = req.body 
    Restaurant.findOneAndUpdate({restaurantID : id}, {'overallRating' : body.rating}, (err,result) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    })
});

module.exports = router; 