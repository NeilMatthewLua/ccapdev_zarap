var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const User = require('../models/users.js');
const Picture = require('../models/pictures.js');
const Restaurant = require('../models/restaurants.js');

router.post('/addUser', async (req, res, next) => { //adds a user

    let pictureID
    await Picture.find({}, {}, { sort: { '_id' : -1 } },  function(err, post) {
        pictureID = post[0]['pictureID']
    })

    const user = new User({
        name: req.body.firstname + " " + req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        address: req.body.homeaddress,
        points: 0,
        beenHere: [],
        reviewd: [],
        liked: [],
        picture: pictureID
    });

    await user
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
})

router.get('/:userID', (req, res, next) => { //finds a user by userID
    const id = req.params.userID;
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

router.get('/', (req, res, next) => { //finds a user by userID
    console.log("All users:");
    User.find({})
        .exec()
        .then(doc => {
            console.log(doc.length);
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
    Restaurant.find({})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
})

module.exports = router;