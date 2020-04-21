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

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
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
    maxAge : 60000,
    secure: false
  },
  'resave': false,
  'saveUninitialized': false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

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

