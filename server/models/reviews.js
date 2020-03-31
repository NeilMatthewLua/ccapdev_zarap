const mongoose = require('mongoose')
// let validator = require('validator')

let reviewSchema = new mongoose.Schema({
    reviewID: {
        type: mongoose.Schema.ObjectId, 
        required: true,
        auto: true
    },
    restaurantID: {
        type: mongoose.ObjectId,
        required: true, 
    },
    reviewerID: {
        type: mongoose.ObjectId,
        required: true, 
    },
    restaurantID: {
        type: mongoose.ObjectId, 
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
    },
    reviewPictures: {
        type: [mongoose.ObjectId],
        required: false, 
        default: [] 
    }
})

module.exports = mongoose.model('reviews', reviewSchema); 