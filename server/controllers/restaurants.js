//Models
const Restaurant = require('../models/restaurants');

//Mongoose Document Manipulation
const mongoose = require('mongoose');
const path = require('path');
const url = process.env.MONGO_URI; 

//Gets all Restaurants
exports.get_all_restaurants = (req, res) => { 
    Restaurant.find({}, (err, doc) => {
        if(err) res.status(500).send('Error on the server.');
        res.status(200).send(doc) 
    });
}

//Get Restaurant based on Resto ID
exports.get_restaurant_id = (req, res) => {  
    let id = req.params.id
    Restaurant.findOne({ restaurantID : id }, (err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc)  
    });
}

//Get Restaurant based on Owner ID
exports.get_restaurant_ownerid = (req, res) => { 
    let id = req.params.id
    Restaurant.find({ ownerID : id }, (err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc) 
    });
}

//Updates Restaurant rating
exports.update_restaurant_rating = (req, res) => { 
    let id = req.params.id
    let body = req.body 
    Restaurant.findOneAndUpdate({restaurantID : id}, {'overallRating' : body.rating}, (err,result) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    });
}

//Get Restaurant based on search key
exports.get_search_restaurant_restoName = (req, res) => {
    let restoName = req.params.restoName
    Restaurant.find({name: {$regex: restoName, $options: "i"}},(err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc)  
    });
}