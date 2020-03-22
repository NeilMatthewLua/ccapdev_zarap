const mongoose = require('mongoose')
const Picture = require('../models/pictures.js')

var peopleUrls = [
    "/images/profilePictures.carlos.jpg",
    "/images/profilePictures.neil.jpg",
    "/images/profilePictures.matthew.jpg",
    "/images/profilePictures.richard.jpg",
    "/images/profilePictures.bryan.jpg",
    "/images/profilePictures.jonal.jpg",
    "/images/profilePictures.rhei.jpg",
    "/images/profilePictures.gabriel.jpg",
    "/images/profilePictures.kurt.jpg",
    "/images/profilePictures.isser.jpg",
    "/images/profilePictures.carlos.jpg",
    "/images/profilePictures.neil.jpg",
    "/images/profilePictures.matthew.jpg",
    "/images/profilePictures.richard.jpg",
    "/images/profilePictures.bryan.jpg",
    "/images/profilePictures.jonal.jpg",
    "/images/profilePictures.rhei.jpg",
    "/images/profilePictures.gabriel.jpg",
    "/images/profilePictures.kurt.jpg",
    "/images/profilePictures.isser.jpg"
]

var restaurantUrls = [ 
    "/images/restaurant/BigBowlNoodles/BigBowlNoodlesProfile.jpg",
    "/images/restaurant/BigBowlNoodles/BigBowlNoodlesProfile2.jpg",
    "/images/restaurant/GoldenFortune/GoldenFortuneProfile.jpg",
    "/images/restaurant/GoldenFortune/GoldenFortuneProfile2.jpg",
    "/images/restaurant/TimHortons/TimHortonsProfile.jpg",
    "/images/restaurant/TimHortons/TimHortonsProfile2.jpg",
    "/images/restaurant/TastyDumplings/TastyDumplingsProfile.jpg",
    "/images/restaurant/TastyDumplings/TastyDumplingsProfile2.jpg",
    "/images/restaurant/Yabu/YabuProfile.jpg",
    "/images/restaurant/Yabu/YabuProfile2.jpg",
    "/images/restaurant/ChoiGarden/ChoiGardenProfile.jpg",
    "/images/restaurant/ChoiGarden/ChoiGardenProfile2.jpg",
    "/images/restaurant/Frankies/FrankiesProfile.jpg",
    "/images/restaurant/Frankies/FrankiesProfile2.jpg",
    "/images/restaurant/Italiannis/ItaliannisProfile.jpg",
    "/images/restaurant/Italiannis/ItaliannisProfile2.jpg",
    "/images/restaurant/KFC/KFCProfile.jpg",
    "/images/restaurant/KFC/KFCProfile2.jpg",
    "/images/restaurant/KFC/KFCProfile.jpg",
    "/images/restaurant/KFC/KFCProfile2.jpg",
    "/images/restaurant/MarkMarksCreamery/MarkMarksCreameryProfile.jpg",
    "/images/restaurant/MarkMarksCreamery/MarkMarksCreameryProfile2.jpg",
    "/images/restaurant/Makchang/MakchangProfile.jpg",
    "/images/restaurant/Makchang/MakchangProfile2.jpg",
    "/images/restaurant/Mutsarap/MutsarapProfile.jpg",
    "/images/restaurant/Mutsarap/MutsarapProfile2.jpg",
    "/images/restaurant/Starbucks/StarbucksProfile.jpg",
    "/images/restaurant/Starbucks/StarbucksProfile2.jpg",
    "/images/restaurant/SushiYum/SushiYumProfile.jpg",
    "/images/restaurant/SushiYum/SushiYumProfile2.jpg",
    "/images/restaurant/Tajimaya/TajimayaProfile.jpg",
    "/images/restaurant/Tajimaya/TajimayaProfile2.jpg",
    "/images/restaurant/TendonKohaku/TendonKohakuProfile.jpg",
    "/images/restaurant/TendonKohaku/TendonKohakuProfile2.jpg",
    "/images/restaurant/TexasRoadhouse/TexasRoadhouseProfile.jpg",
    "/images/restaurant/TexasRoadhouse/TexasRoadhouseProfile2.jpg",
    "/images/restaurant/Vikings/VikingsProfile.jpg",
    "/images/restaurant/Vikings/VikingsProfile2.jpg",
    "/images/restaurant/YellowCab/YellowCabProfile1.jpg",
    "/images/restaurant/YellowCab/YellowCabProfile2.jpg"
]

var restaurantMenuUrls = [ 
    "/images/restaurant/BigBowlNoodles/BigBowlNoodlesMenu1.jpg",
    "/images/restaurant/BigBowlNoodles/BigBowlNoodlesMenu2.jpg",
    "/images/restaurant/GoldenFortune/GoldenFortuneMenu1.jpg",
    "/images/restaurant/GoldenFortune/GoldenFortuneMenu2.jpg",
    "/images/restaurant/TimHortons/TimHortonsMenu1.jpg",
    "/images/restaurant/TimHortons/TimHortonsMenu2.jpg",
    "/images/restaurant/TastyDumplings/TastyDumplingsMenu1.jpg",
    "/images/restaurant/TastyDumplings/TastyDumplingsMenu2.jpg",
    "/images/restaurant/Yabu/YabuMenu1.jpg",
    "/images/restaurant/Yabu/YabuMenu2.jpg",
    "/images/restaurant/ChoiGarden/ChoiGardenMenu1.jpg",
    "/images/restaurant/ChoiGarden/ChoiGardenMenu2.jpg",
    "/images/restaurant/Frankies/FrankiesMenu1.jpg",
    "/images/restaurant/Frankies/FrankiesMenu2.jpg",
    "/images/restaurant/Italiannis/ItaliannisMenu1.jpg",
    "/images/restaurant/Italiannis/ItaliannisMenu2.jpg",
    "/images/restaurant/KFC/KFCMenu1.jpg",
    "/images/restaurant/KFC/KFCMenu2.jpg",
    "/images/restaurant/KFC/KFCMenu1.jpg",
    "/images/restaurant/KFC/KFCMenu2.jpg",
    "/images/restaurant/MarkMarksCreamery/MarkMarksCreameryMenu1.jpg",
    "/images/restaurant/MarkMarksCreamery/MarkMarksCreameryMenu2.jpg",
    "/images/restaurant/Makchang/MakchangMenu1.jpg",
    "/images/restaurant/Makchang/MakchangMenu2.jpg",
    "/images/restaurant/Mutsarap/MutsarapMenu1.jpg",
    "/images/restaurant/Mutsarap/MutsarapMenu2.jpg",
    "/images/restaurant/Starbucks/StarbucksMenu1.jpg",
    "/images/restaurant/Starbucks/StarbucksMenu2.jpg",
    "/images/restaurant/SushiYum/SushiYumMenu1.jpg",
    "/images/restaurant/SushiYum/SushiYumMenu2.jpg",
    "/images/restaurant/Tajimaya/TajimayaMenu1.jpg",
    "/images/restaurant/Tajimaya/TajimayaMenu2.jpg",
    "/images/restaurant/TendonKohaku/TendonKohakuMenu1.jpg",
    "/images/restaurant/TendonKohaku/TendonKohakuMenu2.jpg",
    "/images/restaurant/TexasRoadhouse/TexasRoadhouseMenu1.jpg",
    "/images/restaurant/TexasRoadhouse/TexasRoadhouseMenu2.jpg",
    "/images/restaurant/Vikings/VikingsMenu1.jpg",
    "/images/restaurant/Vikings/VikingsMenu2.jpg",
    "/images/restaurant/YellowCab/YellowCabMenu1.jpg",
    "/images/restaurant/YellowCab/YellowCabMenu2.jpg"
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