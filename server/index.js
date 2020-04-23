// All imports needed here
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path'); 
const session = require('express-session');
const cors = require('cors'); 
require('dotenv').config()

// Creates the express application
const app = express();
const port = process.env.PORT;
// import module `connect-mongo`
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname,'/images'))); 

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
})); 

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
.then(() => {
  console.log("Connected to MongoDB"); 
})
.catch(function(err) {
  console.log(err);
})

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(session({
  'secret': 'zarap',
  'cookie': {
    maxAge : 1000 * 60 * 60 * 24,
    secure: false
  },
  'resave': true,
  'saveUninitialized': true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

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


app.use(express.static(__dirname + '/public'));
//Handle single-page application 
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
}); 

// Listening to the port provided
app.listen(port, function() {
  console.log(`http://localhost:${port}`)
});

