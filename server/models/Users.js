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
        required: true,
        default: 0
    },
    points: {
        type: Number,
        required: true
    },
    beenHere: {
        type: [String],
        required: false,
        default: null
    },
    reviewed: {
        type: [String],
        required: false,
        default: null
    },
    liked: {
        type: [String],
        required: false,
        default: null
    },
    picture: {
        type: String,
        required: true,
        default: null
    }
})

module.exports = mongoose.model('User',userSchema);