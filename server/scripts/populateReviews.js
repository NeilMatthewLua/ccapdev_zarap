const mongoose = require('mongoose');
const faker = require('faker')
const Review = require('../models/reviews'); 
const User = require('../models/users'); 
const Restaurant = require('../models/restaurants');
const Picture = require('../models/pictures'); 

function adjustRatings() {
    return Restaurant.find({}, "restaurantID reviews").exec();
}

async function populateReviews(userCounter, limit) {
    let i; 
    let users = await User.find({}, "userID points reviewed liked").exec();
    let restaurants = await Restaurant.find({}, "restaurantID reviews").exec(); 
    let pics = await Picture.find({}).exec(); 
    let global = users[(0 + 3) % (users.length - 1)];
    console.log(global.userID)
    for(i = userCounter; i < limit; i++) {
        let chosenUser = users[(i + 3) % (users.length - 1)]
        let chosenRes = restaurants[i]
        let item = new Review({
            reviewerID : chosenUser.userID,
            restaurantID : chosenRes.restaurantID,
            rating : faker.random.number(4) + 1, 
            review: faker.lorem.words(10),
            upvotes: 0,
            reviewPictures: [pics[(limit * 5) + (i*3)]['pictureID'], pics[(limit * 5) + (i*3) + 1]['pictureID']]
        }); 
        //Set reviewed and been here to the restaurant they reviewed 
        let newReviews = chosenUser.reviewed; 
        newReviews.push(chosenRes.restaurantID); 
        //Add the review to the list of reviews for the restaurant 
        let newReviewsResto = chosenRes.reviews; 
        newReviewsResto.push(item.reviewID); 
        //Update the user's account details to match 
        await User.findOneAndUpdate({userID : chosenUser.userID}, 
            {points : chosenUser.points + item.upvotes, 
            beenHere : newReviews, 
            reviewed : newReviews}, {new:true})
            .exec()
            .catch(err => console.log(err)); 
        await Restaurant.updateOne({restaurantID : chosenRes.restaurantID}, 
            {reviews : newReviewsResto})
            .exec()
            .catch(err => console.log(err));     
        await item.save()
            .catch(err => console.log(err));
        
            chosenUser.points = chosenUser.points + item.upvotes;
    }
    for(i = userCounter; i < limit; i++) {
        let chosenUser = users[(i + 1) % (users.length - 1)]
        let chosenRes = restaurants[i]
        let item = new Review({
            reviewerID : chosenUser.userID,
            restaurantID : chosenRes.restaurantID,
            rating : faker.random.number(4) + 1, 
            review: faker.lorem.words(10),
            upvotes: 0,
            reviewPictures: [pics[(limit * 5) + (i*3) + 2]['pictureID']]
        }); 
        //Set reviewed and been here to the restaurant they reviewed 
        let newReviews = chosenUser.reviewed; 
        newReviews.push(chosenRes.restaurantID); 
        //Add the review to the list of reviews for the restaurant 
        let newReviewsResto = chosenRes.reviews; 
        newReviewsResto.push(item.reviewID); 
        //Update the user's account details to match 
        await User.findOneAndUpdate({userID : chosenUser.userID}, 
            {points : chosenUser.points + item.upvotes, 
            beenHere : newReviews, 
            reviewed : newReviews}, {new:true})
            .exec()
            .catch(err => console.log(err)); 
        await Restaurant.updateOne({restaurantID : chosenRes.restaurantID}, 
            {reviews : newReviewsResto})
            .exec()
            .catch(err => console.log(err));     
        await item.save()
            .catch(err => console.log(err)); 

            chosenUser.points = chosenUser.points + item.upvotes;
    }
    for(i = userCounter; i < limit; i++) {
        let chosenUser = users[(i + 2) % (users.length - 1)]
        let chosenRes = restaurants[i]
        let item = new Review({
            reviewerID : chosenUser.userID,
            restaurantID : chosenRes.restaurantID,
            rating : faker.random.number(4) + 1, 
            review: faker.lorem.words(10),
            upvotes: 0
        }); 
        //Set reviewed and been here to the restaurant they reviewed 
        let newReviews = chosenUser.reviewed; 
        newReviews.push(chosenRes.restaurantID); 
        //Add the review to the list of reviews for the restaurant 
        let newReviewsResto = chosenRes.reviews; 
        newReviewsResto.push(item.reviewID); 
        //Update the user's account details to match 
        await User.findOneAndUpdate({userID : chosenUser.userID}, 
            {points : chosenUser.points + item.upvotes, 
            beenHere : newReviews, 
            reviewed : newReviews}, {new:true})
            .exec()
            .catch(err => console.log(err)); 
        await Restaurant.updateOne({restaurantID : chosenRes.restaurantID}, 
            {reviews : newReviewsResto})
            .exec()
            .catch(err => console.log(err));     
        await item.save()
            .catch(err => console.log(err)); 
        
        chosenUser.points = chosenUser.points + item.upvotes;
    }
    let allReviews = await Review.find({}).exec(); 
    // Randomize the reviews people liked 
    for(let i = 0; i < users.length; i++) {
        for(let j = 0; j < allReviews.length; j+= faker.random.number(allReviews.length / 2)) {
            if(users[i].userID != allReviews[j].reviewerID) {
                let newLiked = users[i].liked; 
                newLiked.push(allReviews[j].reviewID); 
                let newUpvotes = allReviews[j].upvotes + 1; 
                allReviews[j].upvotes = newUpvotes;
                //Update Users and Review to match 
                await User.findOneAndUpdate({userID : users[i].userID}, {liked : newLiked}, {new: true})
                // await User.findOneAndUpdate({userID :allReviews[j].reviewerID}, {points : newUpvotes}, {new: true})

                await Review.updateOne({reviewID : allReviews[j].reviewID}, {upvotes : newUpvotes});
            }
        }
    }
    //award points to the users
    for(let i = 0; i < users.length; i++) {
        await Review.find({reviewerID: users[i].userID})
        .then(async doc => {
            let points = 0;
            for(let j = 0; j < doc.length; j++) {
                points += doc[j].upvotes;
            }
            await User.findOneAndUpdate({userID: users[i].userID}, {points: points})
        })
    }
    let updatedRestaurants = await adjustRatings();
    updatedRestaurants.forEach(async (resto) => {
        let newRating = 0; 
        let reviewsForResto = await Review.find({restaurantID : resto.restaurantID}).exec(); 
        reviewsForResto.forEach((review) => {
            newRating += review.rating; 
        })
        newRating = (newRating / reviewsForResto.length).toFixed(1); 
        await Restaurant.updateOne({restaurantID : resto.restaurantID}, {overallRating : newRating}).exec(); 
    })     
}; 

module.exports = populateReviews; 
