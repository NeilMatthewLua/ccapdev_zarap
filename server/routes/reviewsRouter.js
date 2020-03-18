var express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const Review = require('../models/reviews');

router.get('/', (req, res) => { 
}); 

router.post('/', (req, res) => {
});

module.exports = router; 