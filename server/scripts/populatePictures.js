const mongoose = require('mongoose')
const Picture = require('../models/pictures.js')

function randomizeURL(index) {
    var urls = [""]
}

function populatePictures(userCount, limit) {
    var i; 
    for(i = userCount; i < limit; i++) {
        let pic = new Picture ({
            pictureID: i, 

        })
    }
}