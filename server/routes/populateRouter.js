var express = require('express')
var router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const faker = require('faker')
const Users = require('../models/users')
const Reviews = require('../models/reviews')
const Restaurants = require('../models/restaurants') 
const Pictures = require('../models/pictures')
const populateUsers = require('../scripts/populateUsers')
const populatePictures = require('../scripts/populatePictures')
const populateReviews = require('../scripts/populateReviews')
const populateRestaurants = require('../scripts/populateRestaurants')

var userCounter = 0; 
var limit = 20;

router.get('/', (req, res, ) => {
    Users.deleteMany({})
      .then(() => {
        console.log("Users Dropped"); 
        return Reviews.deleteMany({})
            .then(() => {
                console.log("Reviews Dropped"); 
            })
            .catch(err => {
                console.log(err);
            });
      })
      .then(() => {
        return Restaurants.deleteMany({})
            .then(() => {
                console.log("Restaurants Dropped"); 
            })
            .catch(err => {
                console.log(err);
            });
      })
      .then(() => {
        return Pictures.deleteMany({})
            .then(() => {
                console.log("Pictures Dropped"); 
                console.log("")
            })
            .catch(err => {
                console.log(err);
            });
      })
      .then(() => {
        //Populate Pictures
        populatePictures(userCounter, limit)
        console.log("Pictures populated")
        .then(() => {
          //Populate Users
          populateUsers(userCounter, limit)
          console.log("Users populated")
          .then(() => {
            //Populate Restaurants
            populateRestaurants(userCounter, limit)
            console.log("Restaurants populated")
            // .then(() => {
            //   //Populate Reviews
            //   populateReviews(userCounter, limit);
            // })
          })
        })
      })
     .then(() => {
         res.send("Populated"); 
     })
     .catch(err => {
         console.log(err); 
     })
})

module.exports = router;