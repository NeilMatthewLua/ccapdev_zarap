var express = require('express');
var router = express.Router();
const path = require('path')
const mongoClient = require('mongodb').MongoClient;

//MongoDB setup
const uri = process.env.DB_URI;
const client = new mongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const databaseName = process.env.DB_NAME
var database, collection;



router.get('/', (req,res) => {
    
    res.render('login');
})

module.exports = router;