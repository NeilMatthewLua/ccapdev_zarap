const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/users')
const Picture = require('../models/pictures')

function save(user) {
    return new Promise((resolve) => {
        user
        .save()
        .then(() => {
            resolve();
        })
        .catch(err => {
            console.log(err);
        })
    })
}

//Loads pictures from database
function loadPictures() {
    return new Promise((resolve) => {
        Picture.find({})
        .exec()
        .then(doc => {
            return resolve(doc)
        })
    })
}

async function populateUsers(userCounter, limit) {
 
    let doc = await loadPictures();

    for(i = userCounter; i < limit; i++) {
        let user = new User({
            name: faker.name.firstName() + " " + faker.name.lastName(),
            password: faker.lorem.words(1),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            points: faker.random.number(100) ,
            picture: doc[i].pictureID
        });

        await save(user);
    }
    return;
} 

module.exports = populateUsers; 