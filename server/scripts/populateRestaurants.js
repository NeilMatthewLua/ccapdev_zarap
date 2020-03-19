const mongoose = require('mongoose')
const faker = require('faker')
const Restaurant = require('../models/restaurants')

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

function populateArray(limit) {
    var arr = [];
    var i; 
    for(i = 0; i < limit; i++) {
        arr.push(faker.random.number(20));
    }
    return arr; 
}

function populateCuisines(limit) {
    var i; 
    var res = []
    var cuisines = ["Asian", "Western", "Greek", "Japanese", "Chinese", "Korean", "Vietnamese", "Filipino"]
    for(i = 0; i < limit + 1; i++) {
        var index = faker.random.number(cuisines.length - 1);
        res.push(cuisines[i]); 
        cuisines.splice(index,1); 
    }
    return res; 
}

function populateOperating() {
    var arr =  
    {
        Monday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`, 
        Tuesday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`,
        Wednesday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`,
        Thursday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`,
        Friday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`,  
        Saturday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`, 
        Sunday: `${between(7,10)}:00AM - ${between(6,10)}:00PM`,   
    }
    return arr; 
}


function populateRestaurants(userCount, limit) {
    var i; 
    for(i = userCount; i < limit; i++) {
        var estTypes = ["Quick Bites", "Casual Dining", "Fine Dining"]; 
        var cities = ["Manila City", "Quezon City", "Caloocan City",
        "Las Pinas City", "Makati City", "Malabon City", "Mandaluyong City", 
        "Marikina City", "Muntinlupa City", "Navotas City",
        "Paranaque City", "Pasay City", "Pasig City", 
        "San Juan City", "Taguig City", "Valenzuela City"]; 
        var resto = new Restaurant ({
            restaurantID: i, 
            ownerID: i,
            name: faker.company.bsAdjective() + " " + faker.company.companyName(),
            establishmentType: faker.random.arrayElement(estTypes),
            city: faker.random.arrayElement(cities),
            fullAddress: faker.address.streetAddress(true),
            cuisines: populateCuisines(faker.random.number(3)),
            costForTwo: faker.random.number(2000),
            operatingHours: populateOperating(),
            contactDetails: faker.phone.phoneNumber('+8###-####'),
            overallRating: faker.random.number(5),
            reviews: populateArray(3),
            pictures: populateArray(4),
            menu: populateArray(3), 
            defaultPicture: i //Replace with proper photo
       }); 
       resto.save()
        .catch(err => {
            console.log(err); 
        })
    }
}

module.exports = populateRestaurants; 