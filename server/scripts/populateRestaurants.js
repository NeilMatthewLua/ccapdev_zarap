const mongoose = require('mongoose')
const faker = require('faker')
const Restaurant = require('../models/restaurants')
const User = require('../models/users')
const Picture = require('../models/pictures')


var restaurantNames = [ 
    "Big Bowl Noodles",
    "Golden Fortune",
    "Tim Hortons",
    "Tasty Dumplings",
    "Yabu",
    "Choi Garden",
    "Frankies",
    "Italiannis",
    "KFC",
    "KFC",
    "Mad Marks Creamery",
    "Makchang",
    "Mutsarap",
    "Starbucks",
    "Sushi Yum",
    "Tajimaya",
    "Tendon Kohaku",
    "Texas Roadhouse",
    "Vikings",
    "Yellow Cab"
]

var restaurantEst = [ 
    "Quick Bites",
    "Casual Dining",
    "Cafés",
    "Quick Bites",
    "Casual Dining",
    "Casual Dining",
    "Casual Dining",
    "Casual Dining",
    "Quick Bites",
    "Quick Bites",
    "Casual Dining",
    "Casual Dining",
    "Quick Bites",
    "Cafés",
    "Quick Bites",
    "Casual Dining",
    "Casual Dining",
    "Casual Dining",
    "Casual Dining",
    "Casual Dining"
]

var restaurantCity = [ 
    "Manila",
    "Manila",
    "Manila",
    "Manila",
    "Makati",
    "San Juan",
    "Taguig",
    "Manila",
    "Manila",
    "Manila",
    "Makati",
    "Manila",
    "Manila",
    "Taguig",
    "Manila",
    "Pasay",
    "Manila",
    "Manila",
    "Pasay",
    "Manila"
]

var restaurantAddress = [ 
    "517 E.T. Yuchengco Street, Binondo, Manila",
    "678 T.M. Kalaw Avenue, Ermita, Manila",
    "R Square Mall, Taft Avenue Corner Pablo Ocampo Street, Malate, Manila",
    "960 Masangkay Street, Binondo, Manila",
    "Ground Floor, Glorietta 2, Ayala Center, Glorietta Complex, Makati City",
    "12 Annapolis Corner Purdue Street, Greenhills, San Juan City",
    "Second Floor, Crossroads Building, 32nd Street, Bonifacio Global City, Taguig City",
    "Ground Floor, Midtown Wing, Robinsons Place Manila, Ermita, Manila",
    "696 FR Carriedo Street, Quiapo, Manila",
    "Ground Floor, Elisa Diamante Miranda Inc. Building, 844 Nicanor Reyes Street, Sampaloc, Manila",
    "Ground Floor, Glorietta 3, Ayala Center, Glorietta Complex, Makati City",
    "1782 Adriatico Street, Malate, Manila",
    "1229 Benavidez Street, Tondo, Manila",
    "B3, Bonifacio High Street, 7th Avenue, Bonifacio Global City, Taguig City",
    "829 Benavidez Street, Binondo, Manila",
    "Second Floor, Entertainment Mall, SM Mall of Asia, Mall of Asia Complex (MOA), Pasay City",
    "Japan Town @Vertis Ginza, Forth Floor, Ayala Malls Vertis Morth,",
    "Second Floor, Midtown Wing, Robinsons Place Manila, Ermita, Manila",
    "Building B, SM by the Bay, SM Mall of Asia, Mall of Asia Complex (MOA), Pasay City",
    "JPD Building, Near Far Eastern University, Nicanor Reyes Corner C. M. Recto Avenue, Sampaloc, Manila"
]

var restaurantCost = [ 
    500,
    800,
    500,
    500,
    1300,
    2000,
    900,
    1400,
    300,
    300,
    800,
    1100,
    300,
    500,
    400,
    1200,
    1200,
    1700,
    2000,
    900
]

var restaurantCuisines = [ 
    "Chinese",
    "Seafood, Chinese",
    "Coffee, Desserts",
    "Taiwanese, Chinese",
    "Japanese",
    "Chinese",
    "American",
    "Italian",
    "Fast Food",
    "Fast Food",
    "American",
    "Korean, Korean BBQ",
    "Filipino",
    "Coffee, Desserts",
    "Japanese, Sushi",
    "Japanese, Grill",
    "Japanese",
    "American",
    "Seafood, Filipino, Asian, European",
    "Pizza"
]

var restaurantTemplate = [ 
    "Big",
    "Golden",
    "Tim",
    "Tasty",
    "Yabu",
    "Choi",
    "Frankies",
    "Italiannis",
    "KFC",
    "KFC",
    "Mark",
    "Makchang",
    "Mutsarap",
    "Starbucks",
    "Sushi",
    "Tajimaya",
    "Tendon",
    "Texas",
    "Vikings",
    "Yellow"
]

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

function save(resto) {
    return new Promise((resolve) => {
        resto
        .save()
        .then(() => {
            resolve();
        })
        .catch(err => {
            console.log(err);
        })
    })
}

//Loads pictures from database
function loadPictures() {
    return new Promise((resolve) => {
        Picture.find({})
        .exec()
        .then(doc => {
            return resolve(doc)
        })
    })
}

//Leads users from database
function loadUsers() {
    return new Promise((resolve) => {
        User.find({})
        .exec()
        .then(doc_2 => {
            return resolve(doc_2)
        })
    })
}

async function populateRestaurants(userCount, limit) {
    var i;
    let doc = await loadUsers();
    let doc_2 = await loadPictures();
    
    for(i = userCount; i < limit; i++) {
        let resto = new Restaurant ({
            restaurantID: mongoose.Types.ObjectId(),
            ownerID: doc[i]['userID'],
            name: restaurantNames[i],
            establishmentType: restaurantEst[i],
            city: restaurantCity[i],
            fullAddress: restaurantAddress[i],
            cuisines: restaurantCuisines[i],
            costForTwo: restaurantCost[i],
            operatingHours: populateOperating(),
            contactDetails: faker.phone.phoneNumber('+8###-####'),
            overallRating: 0,
            pictures: [doc_2[limit + (i*2)]['pictureID'], doc_2[limit + (i*2) + 1]['pictureID']],
            menu: [doc_2[(limit * 3) + (i*2)]['pictureID'], doc_2[(limit * 3) +  (i*2) + 1]['pictureID']], 
            defaultPicture: [doc_2[limit + (i*2)]['pictureID']]
        });
        await save(resto);
    }

    return;
}

module.exports = populateRestaurants; 