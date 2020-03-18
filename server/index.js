// All imports needed here
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();

// Creates the express application
const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to MongoDB");
    mongoose.connection.db.dropCollection("users")
      .then(() => {
        console.log("Users Dropped"); 
      })
      .catch(err => {
        console.log(err);
      });
    })
  .then(() => {
    mongoose.connection.db.dropCollection("reviews")
      .then(() => {
        console.log("Reviews Dropped"); 
      })
      .catch(err => {
        console.log(err);
      });
    })
  .catch(function(err) {
    console.log(err);
    })

// Home route
app.get('/', function(req, res) {
    res.send("Cool Beans"); 
});

const userRouter = require('./routes/userRouter');
const populateRouter = require('./routes/populateRouter');

// Router for users
app.use('/user', userRouter);
// Populates the database tables
app.use('/populate', populateRouter);

// Listening to the port provided
app.listen(port, function() {
  console.log(`http://localhost:${port}`)
});

