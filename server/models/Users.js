const mongoose = require('mongoose');
const validator = require('validator');
// const restaurantSchema = require

let userSchema = new mongoose.
Schema({
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    address: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    beenHere: {
        type: [String],
        required: false
    },
    reviewed: {
        type: [String],
        required: false
    },
    liked: {
        type: [String],
        required: false
    },
    picture: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('User',userSchema);