const mongoose = require('mongoose');
const faker = require('faker')
const Review = require('../models/reviews'); 

function populateReviews(userCounter, limit) {
    let i; 
    for(i = userCounter; i < limit; i++) {
        let item = new Review({
            reviewID : i,
            restaurantID : i,
            rating : faker.random.number(5), 
            review: faker.lorem.words(10),
            upvotes: faker.random.number(40)
        });    
        item.save()
            .catch(err => {
                console.log(err); 
            }); 
    }        
}; 

module.exports = populateReviews; 
