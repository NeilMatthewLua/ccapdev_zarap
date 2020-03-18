var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const populateReviews = require('../scripts/populateReviews'); 
const Review = require('../models/reviews');

router.get('/', (req, res) => { 
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            populateReviews();
        })
        .catch(function (error) {
            console.log(error); 
        });
}); 

router.post('/', (req, res) => {
    // const pic = new Picture({
  //   pictureID: 3, 
  //   url: "sadsadasda"
  // });
  // pic.save().then(result => {
  //   console.log(result); 
  // })
  // res.send(pic); 
});

module.exports = router; 