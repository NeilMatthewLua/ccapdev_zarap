// All imports needed here
const express = require('express');
const path = require('path');

// Creates the express application
const app = express();
const port = 9090;

// Home route
app.get('/', function(req, res) {
    
});

// Students route
app.get('/students', function(req, res) {
  res.render('students'); 
});


// Listening to the port provided
app.listen(port, function() {
  console.log('Backend listening at port '  + port)
});
