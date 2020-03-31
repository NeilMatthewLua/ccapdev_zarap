const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/users')
const Picture = require('../models/pictures')

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

async function populateUsers(userCounter, limit) {
 
    let doc = await loadPictures();

    for(i = userCounter; i < limit; i++) {
        let user = new User({
            name: sampleNames[i] + " " + faker.name.lastName(),
            password: faker.lorem.words(1),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            points: 0,
            picture: doc[i].pictureID
        });

        await save(user);
    }
    return;
} 


function connectUserReviews() {
    User.find({}, (err, users) => {})
    .then((res) => {
        console.log(res.length)
        res.forEach((user) => {
            //Get all reviews associated with user 
            Review.find({ownerID : user.userID}, "restaurantID")
                .then(review => {
                    let restoIDs = []; 
                    //Get the resto IDs and place into an array
                    review.forEach((resto, beenHere) => { 
                        beenHere.push(resto.restaurantID); 
                    });
                    User.update({userID: user.userID}, {beenHere : restoIDs, reviewed : restoIDs}, () => {
                        console.log("Updated"); 
                    })
                })
            //Randomize the reviews liked by the user 
            
        })
        //Get all the reviews then for each user
        //Search the review with their objectID then assign resto to been here, reviewed, 
        //then randomize a review to like increment the review's upvote counter 
    })
    
}

function updateUserPoints() {
    //update the user's no. of points based on their reviews 
}

module.exports = populateUsers;