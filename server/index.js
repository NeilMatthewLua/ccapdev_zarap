// All imports needed here
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient; 

var url = 'mongodb://localhost/RazapDB'; 

// Creates the express application
const app = express();
const port = 9090;

// Home route
app.get('/', function(req, res) {
    MongoClient.connect(url) 
      .then(function(err, db) {
      var dbase = db.db("RazapDB");
      console.log("Connected"); 
      dbase.createCollection("user", function(err, res) {
        if (err) throw err;
        console.log("User created!");
      }); 
      dbase.createCollection("restaurant", function(err, res) {
        if (err) throw err;
        console.log("restaurant created!");
      }); 
      dbase.createCollection("review", function(err, res) {
        if (err) throw err;
        console.log("review created!");
      }); 
      dbase.createCollection("picture", function(err, res) {
        if (err) throw err;
        console.log("picture created!");
      }); 
      db.close(); 
    })
    .catch(); 
    res.send("Cool Beans"); 
});

// Listening to the port provided
app.listen(port, function() {
  console.log('Backend listening at port '  + port)
});
