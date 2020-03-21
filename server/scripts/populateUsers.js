const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/users')
const Picture = require('../models/pictures')

function populateUsers(userCounter, limit, promises) {
    return new Promise(resolve => {
        Picture.find()
        .exec()
        .then(doc => {
            for(i = userCounter; i < limit; i++) {
                const user = new User({
                    userID: mongoose.Types.ObjectId(),
                    name: faker.name.firstName() + " " + faker.name.lastName(),
                    password: faker.lorem.words(1),
                    email: faker.internet.email(),
                    address: faker.address.streetAddress(),
                    points: faker.random.number(100) ,
                    beenHere: ["Golden Fortune", "Narnia", "Bermuda Triangle"],
                    reviewd: null,
                    liked: null,
                    picture: doc[i]['url']
                });
                
                promises.push(
                user
                .save()
                .catch(err => {
                    console.log(err);
                }))
                console.log(promises)
            } 
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
    })
} 

module.exports = populateUsers; 