var express = require('express')
var router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/users.js')

var userCounter = 0;
var limit = 20;

router.get('/populate', (req, res, next) => {
    for(i = userCounter; i < limit; i++) {
        const user = new User({
            userID: i,
            name: faker.name.firstName() + " " + faker.name.lastName(),
            password: faker.lorem.words(1),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            points: faker.random.number(100) ,
            beenHere: ["Golden Fortune", "Narnia", "Bermuda Triangle"],
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
        console.log(user);
    }
})

router.get('/addUser', (req, res, next) => {
    userCounter++;
    const user = new User({
        userID: userCounter,
        name: "Neil Matthew Lua",
        password: "SwedishMeatballs",
        email: "killmenow@gmail.com",
        address: "The house fried chicken built",
        points: "508",
        beenHere: ["Golden Fortune", "Narnia", "Bermuda Triangle"],
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

router.get('/:userId', (req, res, next) => {
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