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

router.post('/login', (req, res) => {

    User.find({email: req.body.email})
    .then(user => {

    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
    
    // (req.body.email, (err, user) => {
    //     if (err) return res.status(500).send('Error on the server.');
    //     if (!user) return res.status(404).send('No user found.');
    //     let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    //     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    //     let token = jwt.sign({ id: user.id }, config.secret, {
    //         expiresIn: 86400 // expires in 24 hours
    //     });
    //     res.status(200).send({ auth: true, token: token, user: user });
    // });
})

module.exports = router;