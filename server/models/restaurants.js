let mongoose = require('mongoose')
// let validator = require('validator')

let restaurantSchema = new mongoose.Schema({
    restaurantID: { //Restaurant ID
        type: Number, 
        required: true,
        unique: true
    }, 
    ownerID: { //Owner ID
        type: Number, 
        required: true, 
        unique: true //Can users have multiple restos
    },
    name: { //Restaurant Name
        type: String,
        required: true
    },
    establishmentType: { //Enum consisting of (Quick Bites, Fine Dining, Casual Dining)
        type: [String],
        required: true
    },
    fullAddress: { //Complete Address
        type: String, 
        required: true
    },
    cuisines: { //Cuisines e.g. Asian, Western, etc.
        type: [String],
        required: true
    },
    costForTwo: { //Approximate cost for two
        type: Number, 
        required: true
    },
    operatingHours: { //Operating hours
        type: [String], //Change to object
        required: true
    },
    contactDetails: { //Phone number
        type: Number, 
        required: true
    },
    overallRating: { //Overall rating
        type: Number,
        required: true
    },
    reviews: { //TODO Convert into schema
        type: [String], 
        required: true
    },
    pictures: { //TODO Convert into schema
        type: [String],
        required: true
    },
    menu: { //TODO
        type: [String],
        required: true
    },
    defaultPicture: { //TODO
        type: String, 
        required: true
    },

    // schedule: { Use as basis for Operating hours
    //     type: [{
    //         Monday: {
    //             type: String
    //         },
    //         Tuesday: {
    //             type: String
    //         },
    //         Wednesday: {
    //             type: String
    //         },
    //         Thursday: {
    //             type: String
    //         },
    //         Friday: {
    //             type: String
    //         },
    //         Saturday: {
    //             type: String
    //         },
    //     }]
    // }
})

module.exports = mongoose.model('restaurants', restaurantSchema); 