const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/users')
const Picture = require('../models/pictures')

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

let sampleNames= [
    'Neil',
    'Gabriel',
    'Kurt',
    'Arnold',
    'Matthew',
    'Jesus',
    'Richard',
    'Alvin',
    'Geosef',
    'Anjelo',
    'Klaus',
    'George',
    'Frank',
    'Arnold',
    'Adam',
    'Jake',
    'Saul',
    'Timmy',
    'Jhonny',
    'Dylan',
]

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

async function hashPassword (password) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash);
      });
    })
  
    return hashedPassword;
}

async function populateUsers(userCounter, limit) {
 
    let doc = await loadPictures();

    let user = new User({
        name: "Ben Dover",
        password: await hashPassword("bensicles"),
        email: "ben@gmail.com",
        address: faker.address.streetAddress(),
        points: 0,
        picture: doc[11].pictureID
    });

    await save(user);
    
    for(i = userCounter; i < limit; i++) {
        let user = new User({
            name: sampleNames[i] + " " + faker.name.lastName(),
            password: await hashPassword("sample"),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            points: 0,
            picture: doc[i].pictureID
        });
        
        await save(user);
    }
    return;
} 
module.exports = populateUsers