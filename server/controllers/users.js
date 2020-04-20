//Models
const User = require('../models/users.js');
const Picture = require('../models/pictures.js');
const Restaurant = require('../models/restaurants.js');
const Review = require('../models/reviews.js');

//Mongoose Document Manipulation
const mongoose = require('mongoose');
const path = require('path');
const url = process.env.MONGO_URI; 

//File Manipulation
const fs = require('fs');

//Adds a user
exports.add_user = async (req, res, next) => { 
    //Saves the user's profile picture
    let pictureID;
    let pic = new Picture({
        url: req.body.uploadedFiles[0]
    }) 
    await pic.save()
        .then(() => 
            pictureID = pic.pictureID
        )
        .catch((err) => {
            res.status(500).send("Error Saving Profile Picture"); 
        })

    //Checks if the email already exists
    await User.findOne({email:req.body.email})
    .then(async doc => {
        if(doc != null) {
            res.send({
                "status": "failed",
                "error": { "code": 200, "message": "Account with that email already exists!" }
            })
        }
        else { //Adds the user
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
    
            //Saves new user
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
        }
    })
    .catch(err => console.log(err));
}

//Finds a user by userID
exports.get_user_id = (req, res, next) => { 
    const id = req.params.userID;
    User.find({userID: id})
        .exec()
        .then(doc => {
            res.status(200).send({user : doc});
        })
        .catch(err => {
            res.status(500).send({error: err});
        })
}

//Gets all users
exports.get_all_users = (req, res, next) => { 
    User.find({})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
}

//Manages login of a user
exports.login_user = async (req, res) => {
    await User.findOne({email: req.body.user.email})
    .then( async user => { //finds the user via userID
        if(req.body.user.password == user.password) {
            await Picture.findOne({pictureID: user.picture})
            .then(picture => { //loads picture of the user
                res.status(200).send({auth: true, user: user, picture: picture})
            })
            .catch(err => {
                res.send(500).json({error: err});
            })
        }   
        else
            res.status(401).send({ auth: false});
    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
}

//Updates a user's profile
exports.update_user =  async (req, res) => {  
    //set up updated information
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
    //set up updated picture
    let oldPicture = {pictureID: req.body.user.picture};
    let updatePicture = {
        url: req.body.user.uploadedFiles
    }

    //update user in db
    await User.findOneAndUpdate(filter, update, {
        new: true
    })
    .then( async user => { //update user picture in db
        update = {pictureID: user.picture};
        await Picture.find({pictureID: req.body.user.picture})
        .then(async (doc) => {
            let relPath = doc[0].url.split('/');
            let removePath = `images/${relPath[4]}/${relPath[5]}`;
            
            //remove old photo 
            fs.unlink(removePath, (err) => {
                if (err) throw err;
                console.log(`${removePath} was deleted due to update.`);
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
                .catch(err => {
                    res.send(500).json({error: err});
                })
            })
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
}

//Increments the points of a user by amount
exports.increment_points = (req, res) => {
    let amount = req.body.value; 
    let id = req.params.id; 

    User.findOneAndUpdate({userID : id}, {$inc : {'points' : amount}}, (err,resp) => {
        if (err) throw res.status(500).send('Error on the server.'); 
        res.status(200).send("Updated User Points"); 
    })
}

//Adds user's liked review
exports.add_like = (req, res) => {
    let reviewID = req.body.reviewID;
    let id = req.params.id; 

    User.findOneAndUpdate({userID : id}, {$push : {'liked' : reviewID}}, (err,resp) => {
        if (err) res.status(500).send('Error on the server.');
        res.status(200).send("Updated User Liked Reviews"); 
    }) 
}

//Deletes a user's liked review 
exports.delete_like = (req, res) => {
    let reviewID = req.body.reviewID;
    let id = req.params.id; 

    User.findOneAndUpdate({userID : id}, {$pullAll : {'liked' : [reviewID]}}, (err,resp) => {
        if (err) res.status(500).send('Error on the server.');
        res.status(200).send("Updated User Liked Reviews"); 
    }) 
}

//Adds user's visited restaurant
exports.add_visit = async (req, res) => {
    let restaurantID = req.body.group.resto;
    let id = req.body.group.user.userID;

    await User.findOneAndUpdate({userID : id}, {$push : {'beenHere' : restaurantID}}, { new: true })
    .then(resp => res.status(200).send({user: resp}))
    .catch(err => {
        res.send(500).json({error: err});
    })
}

//Deletes user's visited restaurant
exports.delete_visit =  async (req, res) => {
    let restaurantID = req.body.group.resto;
    let id = req.body.group.user.userID; 

    await User.findOneAndUpdate({userID : id}, {$pullAll : {'beenHere' : [restaurantID]}}, { new: true })
    .then(resp => res.status(200).send({user: resp}))
    .catch(err => {
        res.send(500).json({error: err});
    })
}

//Adds a review 
exports.add_review = async (req, res) => {
    let restaurantID = req.body.restaurantID;
    let id = req.body.userID.userID; 
    
    await User.findOneAndUpdate({userID : id}, {$push : {'reviewed' : restaurantID}}, { new: true })
    .then(resp =>{res.status(200).send({user: resp})})
    .catch(err => {
        res.send(500).json({error: err});
    })
}

//Deletes a review 
exports.delete_review = async (req, res) => {
    let restaurantID = req.body.restaurant.restaurantID;
    let thisRestaurant = await Restaurant.find({restaurantID: restaurantID}).exec()
    let id = req.body.user.userID; 
    let review = req.body.review.reviewID;
    let reviewPics = req.body.review.reviewPictures;
    let newRating = Math.round(((thisRestaurant[0].overallRating * thisRestaurant[0].reviews.length) - req.body.review.rating) / (thisRestaurant[0].reviews.length - 1) * 10) / 10;
    let newPoints = req.body.user.points - req.body.review.upvotes;

    //deletes the review from the user's reviewed
    await User.findOneAndUpdate({userID : id}, {$pullAll : {'reviewed' : [restaurantID], 'beenHere' : [restaurantID]}, $set:{'points': newPoints}}, { new: true })
    .then(async set => { //deletes the review from the restaurant
        await Restaurant.findOneAndUpdate({restaurantID : restaurantID}, {$pullAll : {'reviews' : [review]}, $set:{'overallRating': newRating}}, { new: true })
        .then(async doc => { //deletes the review in the Review db 
            await Review.findOneAndDelete({'reviewID': review})
            .then(async () => { //deletes the pictures of that review in the db
                for(let i = 0; i < reviewPics.length; i++) {
                    await Picture.findOneAndDelete({'pictureID': reviewPics[i]})
                    .then( pic => {
                        let relPath = pic.url.split('/'); 
                        let removePath = `images/${relPath[4]}/${relPath[5]}`;
    
                        fs.unlink(removePath, (err) => { //deletes the pictures of the review in the folder
                            if (err) throw err;
                        });
                    })
                    .catch(err => {
                        res.send(500).json({error: err});
                    })
                }
                
                await User.find({liked: review}) //removes the reviewID from the users who liked the review
                .then( async users => {
                    for(let i = 0; i < users.length; i++) {
                        await User.findOneAndUpdate({userID: users[i].userID}, {$pullAll : {'liked' : [review]}}, {new: true})
                    }
                })
                .catch(err => {
                    res.send(500).json({error: err});
                })
                res.status(200).send()    
            })
            .catch(err => {
                res.send(500).json({error: err});
            })
        })
        .catch(err => {
            res.send(500).json({error: err});
        })
    }) 
    .catch(err => {
        res.send(500).json({error: err});
    })
}