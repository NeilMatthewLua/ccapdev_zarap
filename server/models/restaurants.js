const mongoose = require('mongoose')
// let validator = require('validator')

let restaurantSchema = new mongoose.Schema({
    restaurantID: { //Restaurant ID
        type: mongoose.ObjectId, 
        required: true,
        unique: true,
        auto: true
    }, 
    ownerID: { //Owner ID
        type: mongoose.ObjectId, 
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
    city: {
        type: String, 
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
            type: {
                Monday: {
                    type: String
                },
                Tuesday: {
                    type: String
                },
                Wednesday: {
                    type: String
                },
                Thursday: {
                    type: String
                },
                Friday: {
                    type: String
                },
                Saturday: {
                    type: String
                },
                Sunday: {
                    type: String
                }
            },
        required: true
    },
    contactDetails: { //Phone number
        type: String, 
        required: true
    },
    overallRating: { //Overall rating
        type: Number,
        required: true
    },
    reviews: { //Review Ids of that restaurant 
        type: [mongoose.ObjectId], 
        required: true
    },
    pictures: { 
        type:  [mongoose.ObjectId],
        required: true
    },
    menu: { 
        type: [mongoose.ObjectId],
        required: true
    },
    defaultPicture: { 
        type:  mongoose.ObjectId, 
        required: true
    },
})

module.exports = mongoose.model('restaurants', restaurantSchema); 