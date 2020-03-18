// All imports needed here
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Picture = require('./models/pictures');
require('dotenv').config();

// Creates the express application
const app = express();
const port = process.env.PORT;
/*
  collection names
  user 
  restaurant
  review
  picture
*/

const reviewsRouter = require('./routes/reviewsRouter');  

// Set Routes
app.use('/reviews', reviewsRouter); 

// Listening to the port provided
app.listen(port, function() {
  console.log('Backend listening at port '  + port)
});
