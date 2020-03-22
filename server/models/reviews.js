const mongoose = require('mongoose')
// let validator = require('validator')

let reviewSchema = new mongoose.Schema({
    reviewID: {
        type: mongoose.ObjectId, 
        required: true,
        unique: true,
        auto: true
    },
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true, 
        auto: true
    },
    reviewerID: {
        type: mongoose.Schema.ObjectId,
        required: true, 
    },
    restaurantID: {
        type: mongoose.Schema.ObjectId, 
        required: true,
    },
    rating: {
        type: Number, 
        required: true
    },
    review: {
        type: String,
        required: true, 
        default: ""
    },
    upvotes: {
        type: Number, 
        required: true, 
        default: 0
    }
})

module.exports = mongoose.model('reviews', reviewSchema); 