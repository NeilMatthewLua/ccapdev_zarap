const mongoose = require('mongoose');
const faker = require('faker')
const Review = require('../models/reviews'); 

function populateReviews(userCounter, limit) {
    let i; 
    for(i = userCounter; i < limit; i++) {
        let item = new Review({
            restaurantID : "5e759b950b19d637245b2980",
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
