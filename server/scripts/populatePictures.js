const mongoose = require('mongoose')
const Picture = require('../models/pictures.js')
const WEB_URL = process.env.WEB_URL

var peopleUrls = [
    `${WEB_URL}/static/profilePictures/carlos.jpg`,
    `${WEB_URL}/static/profilePictures/neil.jpg`,
    `${WEB_URL}/static/profilePictures/matthew.jpg`,
    `${WEB_URL}/static/profilePictures/richard.jpg`,
    `${WEB_URL}/static/profilePictures/bryan.jpg`,
    `${WEB_URL}/static/profilePictures/jonal.jpg`,
    `${WEB_URL}/static/profilePictures/rhei.jpg`,
    `${WEB_URL}/static/profilePictures/gabriel.jpg`,
    `${WEB_URL}/static/profilePictures/kurt.jpg`,
    `${WEB_URL}/static/profilePictures/isser.jpg`,
    `${WEB_URL}/static/profilePictures/dog1.jpg`,
    `${WEB_URL}/static/profilePictures/dog2.jpg`,
    `${WEB_URL}/static/profilePictures/dog3.jpg`,
    `${WEB_URL}/static/profilePictures/dog4.jpg`,
    `${WEB_URL}/static/profilePictures/dog5.jpg`,
    `${WEB_URL}/static/profilePictures/dog6.jpg`,
    `${WEB_URL}/static/profilePictures/dog7.jpg`,
    `${WEB_URL}/static/profilePictures/dog8.jpg`,
    `${WEB_URL}/static/profilePictures/dog9.jpg`,
    `${WEB_URL}/static/profilePictures/dog10.jpg`
]

var restaurantUrls = [ 
    `${WEB_URL}/static/restaurant/BigBowlNoodles/BigBowlNoodlesProfile.jpg`,
    `${WEB_URL}/static/restaurant/BigBowlNoodles/BigBowlNoodlesProfile2.jpg`,
    `${WEB_URL}/static/restaurant/GoldenFortune/GoldenFortuneProfile.jpg`,
    `${WEB_URL}/static/restaurant/GoldenFortune/GoldenFortuneProfile2.jpg`,
    `${WEB_URL}/static/restaurant/TimHortons/TimHortonsProfile.jpg`,
    `${WEB_URL}/static/restaurant/TimHortons/TimHortonsProfile2.jpg`,
    `${WEB_URL}/static/restaurant/TastyDumplings/TastyDumplingsProfile.jpg`,
    `${WEB_URL}/static/restaurant/TastyDumplings/TastyDumplingsProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Yabu/YabuProfile1.jpg`,
    `${WEB_URL}/static/restaurant/Yabu/YabuProfile2.jpg`,
    `${WEB_URL}/static/restaurant/ChoiGarden/ChoiGardenProfile.jpg`,
    `${WEB_URL}/static/restaurant/ChoiGarden/ChoiGardenProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Frankies/FrankiesProfile.jpg`,
    `${WEB_URL}/static/restaurant/Frankies/FrankiesProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Italiannis/ItaliannisProfile.jpg`,
    `${WEB_URL}/static/restaurant/Italiannis/ItaliannisProfile2.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCProfile.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCProfile2.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCProfile.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCProfile2.jpg`,
    `${WEB_URL}/static/restaurant/MadMarksCreamery/MadMarksCreameryProfile.jpg`,
    `${WEB_URL}/static/restaurant/MadMarksCreamery/MadMarksCreameryProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Makchang/MakchangProfile.jpg`,
    `${WEB_URL}/static/restaurant/Makchang/MakchangProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Mutsarap/MutsarapProfile.jpg`,
    `${WEB_URL}/static/restaurant/Mutsarap/MutsarapProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Starbucks/StarbucksProfile.jpg`,
    `${WEB_URL}/static/restaurant/Starbucks/StarbucksProfile2.jpg`,
    `${WEB_URL}/static/restaurant/SushiYum/SushiYumProfile.jpg`,
    `${WEB_URL}/static/restaurant/SushiYum/SushiYumProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Tajimaya/TajimayaProfile.jpg`,
    `${WEB_URL}/static/restaurant/Tajimaya/TajimayaProfile2.jpg`,
    `${WEB_URL}/static/restaurant/TendonKohaku/TendonKohakuProfile.jpg`,
    `${WEB_URL}/static/restaurant/TendonKohaku/TendonKohakuProfile2.jpg`,
    `${WEB_URL}/static/restaurant/TexasRoadhouse/TexasRoadhouseProfile.jpg`,
    `${WEB_URL}/static/restaurant/TexasRoadhouse/TexasRoadhouseProfile2.jpg`,
    `${WEB_URL}/static/restaurant/Vikings/VikingsProfile.jpg`,
    `${WEB_URL}/static/restaurant/Vikings/VikingsProfile2.jpg`,
    `${WEB_URL}/static/restaurant/YellowCab/YellowCabProfile1.jpg`,
    `${WEB_URL}/static/restaurant/YellowCab/YellowCabProfile2.jpg`
]

var restaurantMenuUrls = [ 
    `${WEB_URL}/static/restaurant/BigBowlNoodles/BigBowlNoodlesMenu1.jpg`,
    `${WEB_URL}/static/restaurant/BigBowlNoodles/BigBowlNoodlesMenu2.jpg`,
    `${WEB_URL}/static/restaurant/GoldenFortune/GoldenFortuneMenu1.jpg`,
    `${WEB_URL}/static/restaurant/GoldenFortune/GoldenFortuneMenu2.jpg`,
    `${WEB_URL}/static/restaurant/TimHortons/TimHortonsMenu1.jpg`,
    `${WEB_URL}/static/restaurant/TimHortons/TimHortonsMenu2.jpg`,
    `${WEB_URL}/static/restaurant/TastyDumplings/TastyDumplingsMenu1.jpg`,
    `${WEB_URL}/static/restaurant/TastyDumplings/TastyDumplingsMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Yabu/YabuMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Yabu/YabuMenu2.jpg`,
    `${WEB_URL}/static/restaurant/ChoiGarden/ChoiGardenMenu1.jpg`,
    `${WEB_URL}/static/restaurant/ChoiGarden/ChoiGardenMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Frankies/FrankiesMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Frankies/FrankiesMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Italiannis/ItaliannisMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Italiannis/ItaliannisMenu2.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCMenu1.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCMenu2.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCMenu1.jpg`,
    `${WEB_URL}/static/restaurant/KFC/KFCMenu2.jpg`,
    `${WEB_URL}/static/restaurant/MadMarksCreamery/MadMarksCreameryMenu1.jpg`,
    `${WEB_URL}/static/restaurant/MadMarksCreamery/MadMarksCreameryMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Makchang/MakchangMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Makchang/MakchangMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Mutsarap/MutsarapMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Mutsarap/MutsarapMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Starbucks/StarbucksMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Starbucks/StarbucksMenu2.jpg`,
    `${WEB_URL}/static/restaurant/SushiYum/SushiYumMenu1.jpg`,
    `${WEB_URL}/static/restaurant/SushiYum/SushiYumMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Tajimaya/TajimayaMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Tajimaya/TajimayaMenu2.jpg`,
    `${WEB_URL}/static/restaurant/TendonKohaku/TendonKohakuMenu1.jpg`,
    `${WEB_URL}/static/restaurant/TendonKohaku/TendonKohakuMenu2.jpg`,
    `${WEB_URL}/static/restaurant/TexasRoadhouse/TexasRoadhouseMenu1.jpg`,
    `${WEB_URL}/static/restaurant/TexasRoadhouse/TexasRoadhouseMenu2.jpg`,
    `${WEB_URL}/static/restaurant/Vikings/VikingsMenu1.jpg`,
    `${WEB_URL}/static/restaurant/Vikings/VikingsMenu2.jpg`,
    `${WEB_URL}/static/restaurant/YellowCab/YellowCabMenu1.jpg`,
    `${WEB_URL}/static/restaurant/YellowCab/YellowCabMenu2.jpg`
]


var reviewPics = [
    `${WEB_URL}/static/reviewPictures/bigbowl1.jpg`,
    `${WEB_URL}/static/reviewPictures/bigbowl2.jpg`,
    `${WEB_URL}/static/reviewPictures/bigbowl3.jpg`,
    `${WEB_URL}/static/reviewPictures/goldenfortune1.jpg`,
    `${WEB_URL}/static/reviewPictures/goldenfortune2.jpg`,
    `${WEB_URL}/static/reviewPictures/goldenfortune3.jpg`,
    `${WEB_URL}/static/reviewPictures/timhorton1.jpg`,
    `${WEB_URL}/static/reviewPictures/timhorton2.jpg`,
    `${WEB_URL}/static/reviewPictures/timhorton3.jpg`,
    `${WEB_URL}/static/reviewPictures/tasty1.jpg`,
    `${WEB_URL}/static/reviewPictures/tasty2.jpg`,
    `${WEB_URL}/static/reviewPictures/tasty3.jpg`,
    `${WEB_URL}/static/reviewPictures/yabu1.jpg`,
    `${WEB_URL}/static/reviewPictures/yabu2.jpg`,
    `${WEB_URL}/static/reviewPictures/yabu3.jpg`,
    `${WEB_URL}/static/reviewPictures/choigarden1.jpg`,
    `${WEB_URL}/static/reviewPictures/choigarden2.jpg`,
    `${WEB_URL}/static/reviewPictures/choigarden3.jpg`,
    `${WEB_URL}/static/reviewPictures/frankies1.jpg`,
    `${WEB_URL}/static/reviewPictures/frankies2.jpg`,
    `${WEB_URL}/static/reviewPictures/frankies3.jpg`,
    `${WEB_URL}/static/reviewPictures/italianis1.jpg`,
    `${WEB_URL}/static/reviewPictures/italianis2.jpg`,
    `${WEB_URL}/static/reviewPictures/italianis3.jpg`,
    `${WEB_URL}/static/reviewPictures/kfc1.jpg`,
    `${WEB_URL}/static/reviewPictures/kfc2.jpg`,
    `${WEB_URL}/static/reviewPictures/kfc3.jpg`,
    `${WEB_URL}/static/reviewPictures/kfc4.jpg`,
    `${WEB_URL}/static/reviewPictures/kfc5.jpg`,
    `${WEB_URL}/static/reviewPictures/kfc6.jpg`,
    `${WEB_URL}/static/reviewPictures/madmarks1.jpg`,
    `${WEB_URL}/static/reviewPictures/madmarks2.jpg`,
    `${WEB_URL}/static/reviewPictures/madmarks3.jpg`,
    `${WEB_URL}/static/reviewPictures/makchang1.jpg`,
    `${WEB_URL}/static/reviewPictures/makchang2.jpg`,
    `${WEB_URL}/static/reviewPictures/makchang3.jpg`,
    `${WEB_URL}/static/reviewPictures/mutsarap1.jpg`,
    `${WEB_URL}/static/reviewPictures/mutsarap2.jpg`,
    `${WEB_URL}/static/reviewPictures/mutsarap3.jpg`,
    `${WEB_URL}/static/reviewPictures/starbucks1.jpg`,
    `${WEB_URL}/static/reviewPictures/starbucks2.jpg`,
    `${WEB_URL}/static/reviewPictures/starbucks3.jpg`,
    `${WEB_URL}/static/reviewPictures/sushiyum1.jpg`,
    `${WEB_URL}/static/reviewPictures/sushiyum2.jpg`,
    `${WEB_URL}/static/reviewPictures/sushiyum3.jpg`,
    `${WEB_URL}/static/reviewPictures/tajimaya1.jpg`,
    `${WEB_URL}/static/reviewPictures/tajimaya2.jpg`,
    `${WEB_URL}/static/reviewPictures/tajimaya3.jpg`,
    `${WEB_URL}/static/reviewPictures/tendonkohaku1.jpg`,
    `${WEB_URL}/static/reviewPictures/tendonkohaku2.jpg`,
    `${WEB_URL}/static/reviewPictures/tendonkohaku3.jpg`,
    `${WEB_URL}/static/reviewPictures/texasroadhouse1.jpg`,
    `${WEB_URL}/static/reviewPictures/texasroadhouse2.jpg`,
    `${WEB_URL}/static/reviewPictures/texasroadhouse3.jpg`,
    `${WEB_URL}/static/reviewPictures/vikings1.jpg`,
    `${WEB_URL}/static/reviewPictures/vikings2.jpg`,
    `${WEB_URL}/static/reviewPictures/vikings3.jpg`,
    `${WEB_URL}/static/reviewPictures/yellowcab1.jpg`,
    `${WEB_URL}/static/reviewPictures/yellowcab2.jpg`,
    `${WEB_URL}/static/reviewPictures/yellowcab3.jpg`    
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