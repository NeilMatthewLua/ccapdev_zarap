var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const User = require('../models/users.js');

router.post('/addUser', (req, res, next) => { //adds a user
    var userCounter;
    //gets the last userID
    User.findOne({}, {}, { 
        sort: { 'created_at' : -1 }
     })
     .exec()
     .then(doc => {
         userCounter = doc['userID'] + 1; //TODO test this
     })
     .catch(err => {
         res.send(err)
     })
            
    const user = new User({
        userID: userCounter,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        address: req.body.password,
        points: 0,
        beenHere: null,
        reviewd: null,
        liked: null,
        picture: null
    });

    user
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
})

router.get('/:userID', (req, res, next) => { //finds a user by userID
    const id = req.params.userId;
    console.log(id);
    User.find({userID: id})
        .exec()
        .then(doc => {
            console.log(doc);;
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
})

module.exports = router;