const mongoose = require('mongoose');
const faker = require('faker')
const Review = require('../models/reviews'); 
const User = require('../models/users'); 
const Restaurant = require('../models/restaurants');
const Picture = require('../models/pictures'); 

function adjustRatings() {
    return Restaurant.find({}, "restaurantID reviews").exec();
}

let restoRatings = [
    [4, 3, 4],
    [4, 4, 5],
    [3, 3, 4],
    [4, 4, 4],
    [5, 2, 3],
    [5, 5, 5],
    [4, 2, 3],
    [5, 3, 5],
    [1, 2, 4],
    [3, 5, 4],
    [4, 3, 5],
    [3, 4, 5],
    [3, 5, 5],
    [5, 5, 5],
    [5, 5, 5],
    [5, 1, 4],
    [4, 4, 3],
    [4, 4, 5],
    [4, 4, 4],
    [4, 4, 5]
];

let restoReviews = [
    [
        "Their Beef Brisket Hotpot is the favorite thing our family orders!! Definitely a must try!",
        "Affordable and you get what you pay for.",
        "Tried their Beef Wanton Noodle Soup. Generous serving for one person, literally living up to its name. Not that pricey tho, but the taste is good huhu. One of my fave place in Binondo!"
    ],
    [
        "Good place to get some hotpot! I love their dimsum so much.",
        "Went here for dinner with the family. The place was neat. The food was of average quality when compared to other Chinese restaurants.",
        "The staff was highly commendable. Assisted us from our reservation call, told us that our order was already enough for us, and served us all throughout with smiles. Definitely recommend this for family or big groups!"
    ],
    [
        "My favorite coffee place to stay at and do work. I always get the Iced Coffee Jelly, a sandwhich and a doughnut.",
        "Love their service here and the staff seems really friendly, not to mention they put out orders quickly.",
        "I always get their vanilla iced coffee and the blend is consistent every time. What i suggest is that that they provide power outlets or charging stations for their customers since some people take time on their stay here.",
    ],
    [
        "Serving size was really big when I ate there! Price is also just right and I would really go back to try the other dishes next time.",
        "The porkchop is really big especially for one person which is pleasant and enough.",
        "The serving is good and the flavor of the porkchop is good even without sauce. I'll definitely come back again soon."
    ],
    [
        "Went here to celebrate a colleague’s bday. I never really know that much about this resto but we had fun with our time here. We ordered the pork cutlet woth cheese, all sides are unlimited. The pork cutlet is good and I also liked the sesame sauce and the unli fruit sides. This is recommended and will go back here if I could.",
        "I found the cutlet disappointing. It's quiet expensive as well :((",
        "It was alright... might come back tho"
    ],
    [
        "An authentic Chinese restaurant that serves good food! I was really satisfied with their dishes and of its big servings. A great place to eat with your family and friends.",
        "I brought my family here for my birthday, will definitely come back!",
        "Get their crabs super worth it!!!"
    ],
    [
        "WINGS ARE LOVE. I love that they have a good selection of flavors to choose from!! Definietly my favorite place to get some wings!",
        "Overhyped imo.... will not go back",
        "Quite expensive, but it was good"
    ],
    [
        "One of the best pizza and pasta I have ever ate is here! Good price for good serving of food.",
        "I LOVE THEIR FREE BREAD! Great food and great ambience of the pace!",
        "Authentic Italian food!!"
    ],
    [
        "This particular branch had slow service and I even went there during a peak hour!! I like KFC but this was one of my bad experiences with them. I do not recommend to go to this branch if you are looking for a place to get fast service.",
        "I ordered a Zinger combo meal and the sandwich to more than 20 minutes to serve to me.",
        "Their manager is nice and I love their chicken"
    ],
    [
        "My go-to fast food chain! I'm a fan of their chicken compared to the other fast food brands! The gravy is soooooo good too you can also use it as dip foryour fries!! Will always go back to eat at KFC!",
        "KFC GRAVY!!!!!",
        "Good good food"
    ],
    [
        "Love their ice cream here! The strawberry is my fvorite!",
        "We dined here when there was a credit card promo since it is quite pricey. The food was surprisingly great and the serving was also good enough for 1-2 people per plate. The steak was good and we opted to have it medium well. A good side dish to try is their mashed potato too!",
        "Bring your friends here great place to hang!"
    ],
    [
        "We dined here when there was a credit card promo since it is quite pricey. The food was surprisingly great and the serving was also good enough for 1-2 people per plate. The steak was good and we opted to have it medium well. A good side dish to try is their mashed potato too!",
        "Their food was excellent!!",
        "The staff were great!"
    ],
    [
        "Their chicken is great! Sadly, it was a bit too dry when I ate there. Service was also a bit slow and they lacked the staff to take orders and serve the food.",
        "Excellent service!",
        "I loveeeee this place"
    ],
    [
        "I love their Caramel Macchiato so much that I get it almost everyday!",
        "I love this branch and how attentive their baristas are to their customers!",
        "The place is very well maintained and the restromm is also cleaned up very well! 5/5 for this branch!!",
    ],
    [
        "A good small-scale Japanaese food business located in Binondo. A go-to place for me if I want to eat or craving for something Japanese.",
        "My favorites would include spicy chicken, beef misono and katsudon. They also offer 2 pieces of maki for every meal ordered for the price of 25php! One of the hidden gems where I like to eat at in Binondo!",
        "They are authentic without being too expensive!!"
    ],
    [
        "Good place to recommend if you want to get some authentic Japanese BBQ in Manila! THe place looks great and staff are very attentive as well!",
        "Place is dirty!!!!",
        "Not bad not bad"
    ],
    [
        "A good Japanese restaurant that serves authentic Japanese meals! They have the best tempura and sushi in my opinion.",
        "I love the cozy Japanese vibes of the interiors of the place. Service is also fast and staff are attentive.",
        "Food as okay, but for me it was too salty"
    ],
    [
        "They have good steaks but price range is a bit expensive. However, they do offer some promos and discounts from time to time which makes their meals more affordable.", 
        "This is a good place to eat with a big group of family or frends since they offer meals for sharing.",
        "Great food!"
    ],
    [
        "One of the go-to buffets of  most families. The prices are just right for the wide selction of food and drinks that they have.",
        "Service is good.",
        "You get the value for your money whenever you dine here.",
    ],
    [
        "Best pizza place ever! Would always go back to order here for any occasion.",
        "My favorite pizza place ever since way back !! You really get what you pay for in Yellow Cab! A personal favorite of mine is the Manhattan Meatlovers pizza. I specifically request the crust to be toasted so I get more of the crunchy taste! Definitely a must go pizza place.",
        "Great for a party!"
    ]
]

async function populateReviews(userCounter, limit) {
    let i; 
    let users = await User.find({}, "userID points reviewed liked").exec();
    let restaurants = await Restaurant.find({}, "restaurantID reviews").exec(); 
    let pics = await Picture.find({}).exec(); 
    let global = users[(0 + 3) % (users.length - 1)];

    for(i = userCounter; i < limit; i++) {
        let chosenUser = users[(i + 3) % (users.length - 1)]
        let chosenRes = restaurants[i]
        let item = new Review({
            reviewerID : chosenUser.userID,
            restaurantID : chosenRes.restaurantID,
            rating : restoRatings[i][0], 
            review: restoReviews[i][0],
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
            rating : restoRatings[i][1], 
            review: restoReviews[i][1],
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
            rating : restoRatings[i][2], 
            review: restoReviews[i][2],
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