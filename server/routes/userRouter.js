var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const url = process.env.MONGO_URI; 
const User = require('../models/users.js');
const Picture = require('../models/pictures.js');
const Restaurant = require('../models/restaurants.js');
const Review = require('../models/reviews.js');

//adds a user
router.post('/addUser',async (req, res, next) => { 
    let pictureID
    await Picture.find({}, {}, { sort: { '_id' : -1 } },  function(err, post) {
        pictureID = post[0]['pictureID']
    })
    await User.findOne({email:req.body.email})
    .then(res => {
        res.send({
            "status": "failed",
            "error": { "code": 200, "message": "Account with that email already exists!" }
        })
    })
    .catch(async () => {
        const user = new User({
            name: req.body.firstname + " " + req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            address: req.body.homeaddress,
            points: 0,
            beenHere: [],
            reviewed: [],
            liked: [],
            picture: pictureID
        });
    
        await user
            .save()
            .then(result => {
                res.send({
                    "status": "success",
                    auth: true
                })
            })
            .catch(err => {
                res.status(500).send("There was a problem with registering the user")
            });
    })
})

//finds a user by userID
router.get('/:userID', (req, res, next) => { 
    const id = req.params.userID;
    User.find({userID: id})
        .exec()
        .then(doc => {
            res.status(200).send({user : doc});
        })
        .catch(err => {
            res.send(500).send({error: err});
        })
})

//finds a user by userID
router.get('/', (req, res, next) => { 
    User.find({})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
})

router.post('/login', async (req, res) => {
    await User.findOne({email: req.body.user.email})
    .then( async user => {
        if(req.body.user.password == user.password) {
            await Picture.findOne({pictureID: user.picture})
            .then(picture => {
                res.status(200).send({auth: true, user: user, picture: picture})
            })
        }   
        else
            res.status(401).send({ auth: false});
    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
})

router.post('/updateUser', async (req, res) => {  
    let filter = {email: req.body.user.email};
    let update = {
        name: req.body.user.firstname + " " + req.body.user.lastname,
        password: req.body.user.password,
        email: req.body.user.email,
        address: req.body.user.address,
        points: req.body.user.points,
        beenHere: req.body.user.beenHere,
        reviewed: req.body.user.reviewed,
        liked: req.body.user.liked,
    };
    let oldPicture = {pictureID: req.body.user.picture};
    let updatePicture = {
        url: req.body.user.uploadedFile[0].url
    }
    await User.findOneAndUpdate(filter, update, {
        new: true
    })
    .then( async user => {
        update = {pictureID: user.picture};
        await Picture.find({pictureID: req.body.user.picture})
        .then(async (doc) => {
            let relPath = doc[0].url.split('/');
            let removePath = `images/${relPath[4]}/${relPath[5]}`;
            
            fs.unlink(removePath, (err) => {
                if (err) throw err;
                console.log(`${removePath} was deleted`);
            });

            await Picture.findOneAndUpdate(oldPicture, updatePicture, {
                new: true
            })
                .then(picture => {
                    return res.status(200).send({
                        user: user,
                        picture: picture
                    });
                })
            })
        })
        .catch(err=> {
            console.log(err)
        })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
})

//Increments the points of a user by amount 
router.post('/increment/:id', (req, res) => {
    let amount = req.body.value; 
    let id = req.params.id; 
    User.findOneAndUpdate({userID : id}, {$inc : {'points' : amount}}, (err,res) => {
        if (err) throw res.status(500).send('Error on the server.'); 
        res.status(200).send("Updated User Points"); 
    })
})

router.post('/addLiked/:id', (req, res) => {
    let reviewID = req.body.reviewID;
    let id = req.params.id; 
    User.findOneAndUpdate({userID : id}, {$push : {'liked' : reviewID}}, (err,res) => {
        if (err) res.status(500).send('Error on the server.');
        res.status(200).send("Updated User Liked Reviews"); 
    }) 
})

router.post('/deleteLiked/:id', (req, res) => {
    let reviewID = req.body.reviewID;
    let id = req.params.id; 
    User.findOneAndUpdate({userID : id}, {$pullAll : {'liked' : [reviewID]}}, (err,res) => {
        if (err) res.status(500).send('Error on the server.');
        res.status(200).send("Updated User Liked Reviews"); 
    }) 
})

router.post('/addUserVisited', async (req, res) => {
    let restaurantID = req.body.group.resto;
    let id = req.body.group.user.userID;
    await User.findOneAndUpdate({userID : id}, {$push : {'beenHere' : restaurantID}}, { new: true })
    .then(resp => res.status(200).send({user: resp}))
    .catch(() => res.status(500))
})

router.post('/deleteUserVisited', async (req, res) => {
    let restaurantID = req.body.group.resto;
    let id = req.body.group.user.userID; 

    await User.findOneAndUpdate({userID : id}, {$pullAll : {'beenHere' : [restaurantID]}}, { new: true })
    .then(resp => res.status(200).send({user: resp}))
    .catch(() => res.status(500))
})

router.post('/addUserReviewed', async (req, res) => {
    let restaurantID = req.body.restaurantID;
    let id = req.body.userID.userID; 
    
    await User.findOneAndUpdate({userID : id}, {$push : {'reviewed' : restaurantID}}, { new: true })
    .then(resp =>{res.status(200).send({user: resp})})
    .catch(() => res.status(500))
})

router.post('/deleteUserReviewed', async (req, res) => {
    let restaurantID = req.body.restaurant.restaurantID;
    let id = req.body.user.userID; 
    let review = req.body.review.reviewID;
    let reviewPics = req.body.review.reviewPictures;
    let newRating = Math.round(((req.body.restaurant.overallRating * req.body.restaurant.reviews.length) - req.body.review.rating) / (req.body.restaurant.reviews.length - 1) * 10) / 10;
    let newPoints = req.body.user.points - req.body.review.upvotes;
// console.log("REVIEW IDs that are in the resto")
// console.log(req.body.restaurant.reviews)
// console.log("REVIEW ID I'll delete:")
// console.log(review)
// console.log("RESTO IDs that are in the user")
// console.log(req.body.user.reviewed)
// console.log("RESTO ID I'll delete:")
// console.log(restaurantID)

    //deletes the review from the user's reviewed
    await User.findOneAndUpdate({userID : id}, {$pullAll : {'reviewed' : [restaurantID], 'beenHere' : [restaurantID]}, $set:{'points': newPoints}}, { new: true })
    .then(async set => { //deletes the review from the restaurant
        await Restaurant.findOneAndUpdate({restaurantID : restaurantID}, {$pullAll : {'reviews' : [review]}, $set:{'overallRating': newRating}}, { new: true })
        .then(async doc => { //deletes the review in the Review db
            // console.log("RESTO REVIEWS")
            // console.log(doc.reviews)
            // console.log("USER REVIEWED")
            // console.log(set.reviewed) 
            await Review.findOneAndDelete({'reviewID': review})
            .then(async () => {
                for(let i = 0; i < reviewPics.length; i++) {
                    await Picture.findOneAndDelete({'pictureID': reviewPics[i]})
                    // let removePath = `images/${relPath[4]}/${relPath[5]}`;
            
                    // fs.unlink(removePath, (err) => {
                    //     if (err) throw err;
                    //     console.log(`${removePath} was deleted`);
                    // });
                }
                res.status(200).send()    
            })
        })
    }) 
    .catch(() => res.status(500))
})

module.exports = router;