// All imports needed here
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Creates the express application
const app = express();
const port = process.env.PORT;

//To allow sending of data between frontend and backend
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to MongoDB"); 
  })
  .catch(function(err) {
    console.log(err);
  })

// Home route
app.get('/', function(req, res) {
    res.send("Cool Beans"); 
});

const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewsRouter');
const populateRouter = require('./routes/populateRouter');
const pictureRouter = require('./routes/picturesRouter');
// Routes
app.use('/user', userRouter);
app.use('/review', reviewRouter);
app.use('/pictures', pictureRouter)
// Populates the database tables
app.use('/populate', populateRouter);


// Listening to the port provided
app.listen(port, function() {
  console.log(`http://localhost:${port}`)
});

