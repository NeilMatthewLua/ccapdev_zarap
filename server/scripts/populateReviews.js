const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const Review = require('../models/reviews'); 

function randomReview(length) {
    let words = ["Cool", "Astounding", "Terrible", "Tasty", "Will Visit Again", "Neil Loves Ky"];
    let res = "Hello! ";
    for(i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * words.length); 
        res += words[index] + " ";  
    } 
    return res; 
}

function populateReviews(limit) {
    let i; 
    for(i = 0; i < limit; i++) {
        let item = new Review({
            reviewID : i,
            restaurantID : i,
            rating : 1 + Math.floor(Math.random() * 4), 
            review: randomReview(Math.floor(Math.random() * 5)),
            upvotes: Math.floor(Math.random() * 30)
        });    
        item.save()
            .catch(function (error) {
                console.log(error); 
            }); 
    }        
}; 

module.exports = populateReviews; 
