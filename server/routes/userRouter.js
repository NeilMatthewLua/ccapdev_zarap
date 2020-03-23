var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const User = require('../models/users.js');
const Picture = require('../models/pictures.js');
const Restaurant = require('../models/restaurants.js');

router.post('/addUser',async (req, res, next) => { //adds a user
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
            res.status(200).send({auth: true})
        })
        .catch(err => {
            res.status(500).send("There was a problem with registering the user")
        });
})

router.get('/:userID', (req, res, next) => { //finds a user by userID
    const id = req.params.userID;
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
    User.find({})
        .exec()
        .then(doc => {
            console.log(doc.length);
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
})

router.post('/login', async (req, res) => {
    await User.findOne({email: req.body.user.email})
    .then(user => {
        if(req.body.user.password == user.password)
            res.status(200).send({auth: true, user: user })
        else
            res.status(401).send({ auth: false});
    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
})

module.exports = router;