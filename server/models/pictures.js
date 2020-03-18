let mongoose = require('mongoose')
// let validator = require('validator')

let pictureSchema = new mongoose.Schema({ 
    pictureID: { //ID
        type: Number, 
        unique: true, 
        required: true
    },
    url: { //Picture URL
        type: String, 
        required: true
    }
})
module.exports = mongoose.model('pictures', pictureSchema); 