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
    "http://localhost:9090/static/profilePictures/dog1.jpg",
    "http://localhost:9090/static/profilePictures/dog2.jpg",
    "http://localhost:9090/static/profilePictures/dog3.jpg",
    "http://localhost:9090/static/profilePictures/dog4.jpg",
    "http://localhost:9090/static/profilePictures/dog5.jpg",
    "http://localhost:9090/static/profilePictures/dog6.jpg",
    "http://localhost:9090/static/profilePictures/dog7.jpg",
    "http://localhost:9090/static/profilePictures/dog8.jpg",
    "http://localhost:9090/static/profilePictures/dog9.jpg",
    "http://localhost:9090/static/profilePictures/dog10.jpg"
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
    "http://localhost:9090/static/restaurant/Yabu/YabuProfile1.jpg",
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
    "http://localhost:9090/static/restaurant/MadMarksCreamery/MadMarksCreameryProfile.jpg",
    "http://localhost:9090/static/restaurant/MadMarksCreamery/MadMarksCreameryProfile2.jpg",
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
    "http://localhost:9090/static/restaurant/MadMarksCreamery/MadMarksCreameryMenu1.jpg",
    "http://localhost:9090/static/restaurant/MadMarksCreamery/MadMarksCreameryMenu2.jpg",
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


var reviewPics = [
    "http://localhost:9090/static/reviewPictures/bigbowl1.jpg",
    "http://localhost:9090/static/reviewPictures/bigbowl2.jpg",
    "http://localhost:9090/static/reviewPictures/bigbowl3.jpg",
    "http://localhost:9090/static/reviewPictures/goldenfortune1.jpg",
    "http://localhost:9090/static/reviewPictures/goldenfortune2.jpg",
    "http://localhost:9090/static/reviewPictures/goldenfortune3.jpg",
    "http://localhost:9090/static/reviewPictures/timhorton1.jpg",
    "http://localhost:9090/static/reviewPictures/timhorton2.jpg",
    "http://localhost:9090/static/reviewPictures/timhorton3.jpg",
    "http://localhost:9090/static/reviewPictures/tasty1.jpg",
    "http://localhost:9090/static/reviewPictures/tasty2.jpg",
    "http://localhost:9090/static/reviewPictures/tasty3.jpg",
    "http://localhost:9090/static/reviewPictures/yabu1.jpg",
    "http://localhost:9090/static/reviewPictures/yabu2.jpg",
    "http://localhost:9090/static/reviewPictures/yabu3.jpg",
    "http://localhost:9090/static/reviewPictures/choigarden1.jpg",
    "http://localhost:9090/static/reviewPictures/choigarden2.jpg",
    "http://localhost:9090/static/reviewPictures/choigarden3.jpg",
    "http://localhost:9090/static/reviewPictures/frankies1.jpg",
    "http://localhost:9090/static/reviewPictures/frankies2.jpg",
    "http://localhost:9090/static/reviewPictures/frankies3.jpg",
    "http://localhost:9090/static/reviewPictures/italianis1.jpg",
    "http://localhost:9090/static/reviewPictures/italianis2.jpg",
    "http://localhost:9090/static/reviewPictures/italianis3.jpg",
    "http://localhost:9090/static/reviewPictures/kfc1.jpg",
    "http://localhost:9090/static/reviewPictures/kfc2.jpg",
    "http://localhost:9090/static/reviewPictures/kfc3.jpg",
    "http://localhost:9090/static/reviewPictures/kfc4.jpg",
    "http://localhost:9090/static/reviewPictures/kfc5.jpg",
    "http://localhost:9090/static/reviewPictures/kfc6.jpg",
    "http://localhost:9090/static/reviewPictures/madmarks1.jpg",
    "http://localhost:9090/static/reviewPictures/madmarks2.jpg",
    "http://localhost:9090/static/reviewPictures/madmarks3.jpg",
    "http://localhost:9090/static/reviewPictures/makchang1.jpg",
    "http://localhost:9090/static/reviewPictures/makchang2.jpg",
    "http://localhost:9090/static/reviewPictures/makchang3.jpg",
    "http://localhost:9090/static/reviewPictures/mutsarap1.jpg",
    "http://localhost:9090/static/reviewPictures/mutsarap2.jpg",
    "http://localhost:9090/static/reviewPictures/mutsarap3.jpg",
    "http://localhost:9090/static/reviewPictures/starbucks1.jpg",
    "http://localhost:9090/static/reviewPictures/starbucks2.jpg",
    "http://localhost:9090/static/reviewPictures/starbucks3.jpg",
    "http://localhost:9090/static/reviewPictures/sushiyum1.jpg",
    "http://localhost:9090/static/reviewPictures/sushiyum2.jpg",
    "http://localhost:9090/static/reviewPictures/sushiyum3.jpg",
    "http://localhost:9090/static/reviewPictures/tajimaya1.jpg",
    "http://localhost:9090/static/reviewPictures/tajimaya2.jpg",
    "http://localhost:9090/static/reviewPictures/tajimaya3.jpg",
    "http://localhost:9090/static/reviewPictures/tendonkohaku1.jpg",
    "http://localhost:9090/static/reviewPictures/tendonkohaku2.jpg",
    "http://localhost:9090/static/reviewPictures/tendonkohaku3.jpg",
    "http://localhost:9090/static/reviewPictures/texasroadhouse1.jpg",
    "http://localhost:9090/static/reviewPictures/texasroadhouse2.jpg",
    "http://localhost:9090/static/reviewPictures/texasroadhouse3.jpg",
    "http://localhost:9090/static/reviewPictures/vikings1.jpg",
    "http://localhost:9090/static/reviewPictures/vikings2.jpg",
    "http://localhost:9090/static/reviewPictures/vikings3.jpg",
    "http://localhost:9090/static/reviewPictures/yellowcab1.jpg",
    "http://localhost:9090/static/reviewPictures/yellowcab2.jpg",
    "http://localhost:9090/static/reviewPictures/yellowcab3.jpg"    
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

        for(j = 0; j < limit * 3; j++) {
            let pic = new Picture ({
                url: reviewPics[j]
            })
            await save(pic); 
        }
}

module.exports = populatePictures;