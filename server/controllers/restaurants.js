//Models
const Restaurant = require('../models/restaurants');

//Mongoose Document Manipulation
const mongoose = require('mongoose');
const path = require('path');
const url = process.env.MONGO_URI; 

//Gets all Restaurants
exports.get_all_restaurants = (req, res) => { 
    Restaurant.find({}, (err, doc) => {
        if(err) res.status(500).send('Error on the server.');
        res.status(200).send(doc) 
    });
}

//Get Restaurant based on Resto ID
exports.get_restaurant_id = (req, res) => {  
    let id = req.params.id
    Restaurant.findOne({ restaurantID : id }, (err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc)  
    });
}

//Get Restaurant based on Owner ID
exports.get_restaurant_ownerid = (req, res) => { 
    let id = req.params.id
    Restaurant.find({ ownerID : id }, (err, doc) => {
        if(err) res.status(500)
        res.status(200).send(doc) 
    });
}

//Updates Restaurant rating
exports.update_restaurant_rating = (req, res) => { 
    let id = req.params.id
    let body = req.body 
    Restaurant.findOneAndUpdate({restaurantID : id}, {'overallRating' : body.rating}, (err,result) => {
        if (err) throw err
        res.status(200).send("Updated"); 
    });
}

// Removes % / and \ from the string
function removeSpecialChar (string) {
    string.replace(/[/\%]/g, ""); 
}

// Escapes a string and returns the value
function escapeStringForRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

async function find (restoName) {
    //Loop through each word of the search query, checking if it matches any words in the database
    const final = await new Promise(async (resolve, reject) => {
        let results = [];
        for(let i = 0; i < restoName.length; i++) {
            let query = { name: { $regex: restoName[i].trim(), $options: "i" } };
            try {
               let doc = await Restaurant.find(query) 
               results.push(...doc);
            } catch(err) {
                console.log(err)
            } 
        }
        resolve(results);
    })
  
    return final;
}

//Get Restaurant based on search key
exports.get_search_restaurant_restoName = async (req, res) => {
    let restoName = escapeStringForRegex(req.params.restoName);
    let search = escapeStringForRegex(req.params.restoName); //Store the unmodified search query 
    restoName = restoName.split(" ") //Split the search query 
    let results = await find(restoName); 
    // console.log(results);
    //Create a set containing all the results
    let unique = new Set(results.map(resto => JSON.stringify(resto))) 
    //Turn the set back into an array 
    unique = Array.from(unique).map(resto => JSON.parse(resto))
    //Loop through each item in the array
    unique = unique.map((restaurant) => {
        //Counts the number of chars that were same
        let matchedChars = 0; 
        restoName.forEach((keyword) => {
            //If the item contains the name as a substring, add its length 
            if(restaurant.name.toLowerCase().includes(keyword.toLowerCase())) 
                matchedChars += keyword.length
        }); 
        return Object.assign({}, restaurant, {matchedChars : matchedChars})
    }); 
    //Remove restaurants that didn't match enough chars 
    unique = unique.filter((restaurant) => {
        let trimmedName = restaurant.name.replace(/\s+/g, '')
        return (restaurant.matchedChars >= 2) ? true : false
    })
    //Sort the items based on matchedChars (descending) (i.e. more matched chars are at the front)
    unique.sort((a,b) => (a.matchedChars >= b.matchedChars) ? -1 : 1) 
    res.status(200).send(unique);    
}
