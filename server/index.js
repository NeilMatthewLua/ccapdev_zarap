// All imports needed here
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path'); 
require('dotenv').config()

// Creates the express application
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname,'/images'))); 

//To allow sending of data between frontend and backend
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use('/static', express.static(path.join(__dirname,'/images'))); 


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to MongoDB"); 
  })
  .catch(function(err) {
    console.log(err);
  })

// Home route
app.get('/', function(req, res) {
    res.send("Head over to http://localhost:9090/populate to populate data"); 
});

const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewsRouter');
const populateRouter = require('./routes/populateRouter');
const pictureRouter = require('./routes/picturesRouter');
const restaurantRouter = require('./routes/restaurantsRouter'); 
// Routes
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/pictures', pictureRouter);
app.use('/restaurants', restaurantRouter); 
// Populates the database tables
app.use('/populate', populateRouter);


// Listening to the port provided
app.listen(port, function() {
  console.log(`http://localhost:${port}`)
});

