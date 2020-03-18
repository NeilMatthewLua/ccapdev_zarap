const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/Users.js')

function populateUsers(userCounter, limit) {
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
} 

module.exports = populateUsers; 