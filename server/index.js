// All imports needed here
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

var url = 'mongodb://localhost/ZarapDB'; 

// Creates the express application
const app = express();
const port = 9090;

mongoose.connect(url, {useNewUrlParser: true})
.then(() => {
  console.log("Connected to MongoDB");
  mongoose.connection.db.dropCollection("users");
})
.catch(function(err) {
  console.log(error);
})

// Home route
app.get('/', function(req, res) {
    res.send("Cool Bean"); 
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