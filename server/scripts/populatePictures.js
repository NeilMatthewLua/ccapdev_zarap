const mongoose = require('mongoose')
const Picture = require('../models/pictures.js')

var peopleUrls = [
    "http://localhost:9090/static/profilePictures/carlos.jpg",
    "http://localhost:9090/static/profilePictures/neil.jpg",
    "http://localhost:9090/static/profilePictures/matthew.jpg",
    "http://localhost:9090/static/profilePictures/richard.jpg",
    "http://localhost:9090/static/profilePictures/bryan.jpg",
    "http://localhost:9090/static/profilePictures/jonal.jpg",
    "http://localhost:9090/static/profilePictures/rhei.jpg",
    "http://localhost:9090/static/profilePictures/gabriel.jpg",
    "http://localhost:9090/static/profilePictures/kurt.jpg",
    "http://localhost:9090/static/profilePictures/isser.jpg",
    "http://localhost:9090/static/profilePictures/carlos.jpg",
    "http://localhost:9090/static/profilePictures/neil.jpg",
    "http://localhost:9090/static/profilePictures/matthew.jpg",
    "http://localhost:9090/static/profilePictures/richard.jpg",
    "http://localhost:9090/static/profilePictures/bryan.jpg",
    "http://localhost:9090/static/profilePictures/jonal.jpg",
    "http://localhost:9090/static/profilePictures/rhei.jpg",
    "http://localhost:9090/static/profilePictures/gabriel.jpg",
    "http://localhost:9090/static/profilePictures/kurt.jpg",
    "http://localhost:9090/static/profilePictures/isser.jpg"
]

var restaurantUrls = [ 
    "http://localhost:9090/static/restaurant/BigBowlNoodles/BigBowlNoodlesProfile.jpg",
    "http://localhost:9090/static/restaurant/BigBowlNoodles/BigBowlNoodlesProfile2.jpg",
    "http://localhost:9090/static/restaurant/GoldenFortune/GoldenFortuneProfile.jpg",
    "http://localhost:9090/static/restaurant/GoldenFortune/GoldenFortuneProfile2.jpg",
    "http://localhost:9090/static/restaurant/TimHortons/TimHortonsProfile.jpg",
    "http://localhost:9090/static/restaurant/TimHortons/TimHortonsProfile2.jpg",
    "http://localhost:9090/static/restaurant/TastyDumplings/TastyDumplingsProfile.jpg",
    "http://localhost:9090/static/restaurant/TastyDumplings/TastyDumplingsProfile2.jpg",
    "http://localhost:9090/static/restaurant/Yabu/YabuProfile.jpg",
    "http://localhost:9090/static/restaurant/Yabu/YabuProfile2.jpg",
    "http://localhost:9090/static/restaurant/ChoiGarden/ChoiGardenProfile.jpg",
    "http://localhost:9090/static/restaurant/ChoiGarden/ChoiGardenProfile2.jpg",
    "http://localhost:9090/static/restaurant/Frankies/FrankiesProfile.jpg",
    "http://localhost:9090/static/restaurant/Frankies/FrankiesProfile2.jpg",
    "http://localhost:9090/static/restaurant/Italiannis/ItaliannisProfile.jpg",
    "http://localhost:9090/static/restaurant/Italiannis/ItaliannisProfile2.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCProfile.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCProfile2.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCProfile.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCProfile2.jpg",
    "http://localhost:9090/static/restaurant/MarkMarksCreamery/MarkMarksCreameryProfile.jpg",
    "http://localhost:9090/static/restaurant/MarkMarksCreamery/MarkMarksCreameryProfile2.jpg",
    "http://localhost:9090/static/restaurant/Makchang/MakchangProfile.jpg",
    "http://localhost:9090/static/restaurant/Makchang/MakchangProfile2.jpg",
    "http://localhost:9090/static/restaurant/Mutsarap/MutsarapProfile.jpg",
    "http://localhost:9090/static/restaurant/Mutsarap/MutsarapProfile2.jpg",
    "http://localhost:9090/static/restaurant/Starbucks/StarbucksProfile.jpg",
    "http://localhost:9090/static/restaurant/Starbucks/StarbucksProfile2.jpg",
    "http://localhost:9090/static/restaurant/SushiYum/SushiYumProfile.jpg",
    "http://localhost:9090/static/restaurant/SushiYum/SushiYumProfile2.jpg",
    "http://localhost:9090/static/restaurant/Tajimaya/TajimayaProfile.jpg",
    "http://localhost:9090/static/restaurant/Tajimaya/TajimayaProfile2.jpg",
    "http://localhost:9090/static/restaurant/TendonKohaku/TendonKohakuProfile.jpg",
    "http://localhost:9090/static/restaurant/TendonKohaku/TendonKohakuProfile2.jpg",
    "http://localhost:9090/static/restaurant/TexasRoadhouse/TexasRoadhouseProfile.jpg",
    "http://localhost:9090/static/restaurant/TexasRoadhouse/TexasRoadhouseProfile2.jpg",
    "http://localhost:9090/static/restaurant/Vikings/VikingsProfile.jpg",
    "http://localhost:9090/static/restaurant/Vikings/VikingsProfile2.jpg",
    "http://localhost:9090/static/restaurant/YellowCab/YellowCabProfile1.jpg",
    "http://localhost:9090/static/restaurant/YellowCab/YellowCabProfile2.jpg"
]

var restaurantMenuUrls = [ 
    "http://localhost:9090/static/restaurant/BigBowlNoodles/BigBowlNoodlesMenu1.jpg",
    "http://localhost:9090/static/restaurant/BigBowlNoodles/BigBowlNoodlesMenu2.jpg",
    "http://localhost:9090/static/restaurant/GoldenFortune/GoldenFortuneMenu1.jpg",
    "http://localhost:9090/static/restaurant/GoldenFortune/GoldenFortuneMenu2.jpg",
    "http://localhost:9090/static/restaurant/TimHortons/TimHortonsMenu1.jpg",
    "http://localhost:9090/static/restaurant/TimHortons/TimHortonsMenu2.jpg",
    "http://localhost:9090/static/restaurant/TastyDumplings/TastyDumplingsMenu1.jpg",
    "http://localhost:9090/static/restaurant/TastyDumplings/TastyDumplingsMenu2.jpg",
    "http://localhost:9090/static/restaurant/Yabu/YabuMenu1.jpg",
    "http://localhost:9090/static/restaurant/Yabu/YabuMenu2.jpg",
    "http://localhost:9090/static/restaurant/ChoiGarden/ChoiGardenMenu1.jpg",
    "http://localhost:9090/static/restaurant/ChoiGarden/ChoiGardenMenu2.jpg",
    "http://localhost:9090/static/restaurant/Frankies/FrankiesMenu1.jpg",
    "http://localhost:9090/static/restaurant/Frankies/FrankiesMenu2.jpg",
    "http://localhost:9090/static/restaurant/Italiannis/ItaliannisMenu1.jpg",
    "http://localhost:9090/static/restaurant/Italiannis/ItaliannisMenu2.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCMenu1.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCMenu2.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCMenu1.jpg",
    "http://localhost:9090/static/restaurant/KFC/KFCMenu2.jpg",
    "http://localhost:9090/static/restaurant/MarkMarksCreamery/MarkMarksCreameryMenu1.jpg",
    "http://localhost:9090/static/restaurant/MarkMarksCreamery/MarkMarksCreameryMenu2.jpg",
    "http://localhost:9090/static/restaurant/Makchang/MakchangMenu1.jpg",
    "http://localhost:9090/static/restaurant/Makchang/MakchangMenu2.jpg",
    "http://localhost:9090/static/restaurant/Mutsarap/MutsarapMenu1.jpg",
    "http://localhost:9090/static/restaurant/Mutsarap/MutsarapMenu2.jpg",
    "http://localhost:9090/static/restaurant/Starbucks/StarbucksMenu1.jpg",
    "http://localhost:9090/static/restaurant/Starbucks/StarbucksMenu2.jpg",
    "http://localhost:9090/static/restaurant/SushiYum/SushiYumMenu1.jpg",
    "http://localhost:9090/static/restaurant/SushiYum/SushiYumMenu2.jpg",
    "http://localhost:9090/static/restaurant/Tajimaya/TajimayaMenu1.jpg",
    "http://localhost:9090/static/restaurant/Tajimaya/TajimayaMenu2.jpg",
    "http://localhost:9090/static/restaurant/TendonKohaku/TendonKohakuMenu1.jpg",
    "http://localhost:9090/static/restaurant/TendonKohaku/TendonKohakuMenu2.jpg",
    "http://localhost:9090/static/restaurant/TexasRoadhouse/TexasRoadhouseMenu1.jpg",
    "http://localhost:9090/static/restaurant/TexasRoadhouse/TexasRoadhouseMenu2.jpg",
    "http://localhost:9090/static/restaurant/Vikings/VikingsMenu1.jpg",
    "http://localhost:9090/static/restaurant/Vikings/VikingsMenu2.jpg",
    "http://localhost:9090/static/restaurant/YellowCab/YellowCabMenu1.jpg",
    "http://localhost:9090/static/restaurant/YellowCab/YellowCabMenu2.jpg"
]

function randomizeURL(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
}

function save(pic) {
    return new Promise((resolve) => {
        pic
        .save()
        .then(() => {
            resolve();
        })
        .catch(err => {
            console.log(err);
        })
    })
}

async function populatePictures(userCount, limit) {
    // let promise = new Promise (resolve => {
        var i; 
        var j; 
        // Populate user pictures
        randomizeURL(peopleUrls)
        for(i = userCount; i < limit; i++) {
            let pic = new Picture ({
                url: peopleUrls[i] 
            })
            await save(pic);
        }

        // Populate restaurant pictures
        for(j = 0; j < limit * 2; j++) {
            let pic = new Picture ({
                url: restaurantUrls[j] 
            })
    
            await save(pic);
        }
    
        // Populate restaurant menu
        for(j = 0; j < limit * 2; j++) {
            let pic = new Picture ({
                url: restaurantMenuUrls[j] 
            })

            await save(pic);
        }
}

module.exports = populatePictures;