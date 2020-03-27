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
    await User.findOne({email:req.body.email})
    .then(res => {
        res.send({
            "status": "failed",
            "error": { "code": 200, "message": "Account with that email already exists!" }
        })
    })
    .catch(async () => {
        const user = new User({
            name: req.body.firstname + " " + req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            address: req.body.homeaddress,
            points: 0,
            beenHere: [],
            reviewed: [],
            liked: [],
            picture: pictureID
        });
    
        await user
            .save()
            .then(result => {
                res.send({
                    "status": "success",
                    auth: true
                })
            })
            .catch(err => {
                res.status(500).send("There was a problem with registering the user")
            });
    })
})

router.get('/:userID', (req, res, next) => { //finds a user by userID
    const id = req.params.userID;
    User.find({userID: id})
        .exec()
        .then(doc => {
            res.status(200).send({user: user});
        })
        .catch(err => {
            res.send(500).send({error: err});
        })
})

router.get('/', (req, res, next) => { //finds a user by userID
    User.find({})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
})

router.post('/login', async (req, res) => {
    await User.findOne({email: req.body.user.email})
    .then( async user => {
        if(req.body.user.password == user.password) {
            await Picture.findOne({pictureID: user.picture})
            .then(picture => {
                res.status(200).send({auth: true, user: user, picture: picture})
            })
        }   
        else
            res.status(401).send({ auth: false});
    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
})

router.post('/updateUser', async (req, res) => {  
    let filter = {email: req.body.user.email};
    let update = {
        name: req.body.user.firstname + " " + req.body.user.lastname,
        password: req.body.user.password,
        email: req.body.user.email,
        address: req.body.user.address,
        points: req.body.user.points,
        beenHere: req.body.user.beenHere,
        reviewed: req.body.user.reviewed,
        liked: req.body.user.liked,
    };
    let oldPicture = {pictureID: req.body.user.picture};
    let updatePicture = {
        url: req.body.user.uploadedFile[0].url
    }
    await User.findOneAndUpdate(filter, update, {
        new: true
    })
    .then( async user => {
        update = {pictureID: user.picture};
            await Picture.findOneAndUpdate(oldPicture, updatePicture, {
                new: true
            })
            .then(picture => {
                return res.status(200).send({
                    user: user,
                    picture: picture
                });
            })
    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
})

module.exports = router;