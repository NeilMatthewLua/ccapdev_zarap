const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/users.js')
const Review = require('../models/reviews')

function populateUsers(userCounter, limit) {
    var promises = []; 
    for(i = userCounter; i < limit; i++) {
        let user = new User({
            userID: i,
            name: faker.name.firstName() + " " + faker.name.lastName(),
            password: faker.lorem.words(1),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            points: faker.random.number(100) ,
            beenHere: ["Golden Fortune", "Narnia", "Bermuda Triangle"],
            reviewed: [], 
            liked: [],
            picture: "none"
        });
        promises.push(
        user
        .save()
        .catch(err => {
            console.log(err);
        })) 
    }
    Promise.all(promises)
        .then(() => {
            connectUserReviews(); 
        }) 
}

function connectUserReviews() {
    User.find({}, (err, users) => {})
    .then((res) => {
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

module.exports = {populateUsers, connectUserReviews, updateUserPoints }; 