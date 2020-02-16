const express = require('express');
const path = require('path');

const hbs = require('express-handlebars');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000
const app = express();
require('dotenv').config()

//Setup view engine handle bars
app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views/'));
app.engine('hbs', hbs({
  extname: "hbs",
  defaultLayout: "landing",
  layoutsDir: "views"
}));
app.set('view engine', 'hbs');


// const mongoClient = require('mongodb').MongoClient;
// const objectID = require("mongodb").ObjectID;


const indexRouter = require('./routes/indexRouter.js');
// const tuteeRouter = require('./routes/tuteesRouter');
// const tutorsRouter = require('./routes/tutorsRouter');

// Routes
// app.use('/tutors', tutorsRouter)
// app.use('/tutee', tuteeRouter)
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})