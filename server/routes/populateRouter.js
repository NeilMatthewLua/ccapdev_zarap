var express = require('express')
var router = express.Router()
const path = require('path')
const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/Users.js')
const populateUsers = require('../scripts/populateUsers')
const populateReviews = require('../scripts/populateReviews')

var userCounter = 0; 
var limit = 20;

router.get('/', (req, res, next) => {
    //Populate Users
    populateUsers(userCounter, limit); 
    //Populate Reviews
    populateReviews(userCounter, limit); 
})

module.exports = router;