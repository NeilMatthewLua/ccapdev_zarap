const mongoose = require('mongoose');
const validator = require('validator');
// const restaurantSchema = require

let userSchema = new mongoose.
Schema({
    userID: {
        type: mongoose.ObjectId,
        required: true,
        auto: true, 
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
        type: [mongoose.ObjectId],
        required: true,
        default: []
    },
    reviewed: {
        type: [mongoose.ObjectId],
        required: true,
        default: []
    },
    liked: {
        type: [mongoose.ObjectId],
        required: true,
        default: []
    },
    picture: {
        type: mongoose.ObjectId,
        required: true,
        default: undefined
    }
})

module.exports = mongoose.model('User',userSchema);
