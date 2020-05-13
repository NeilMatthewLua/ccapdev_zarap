var express = require('express');
var router = express.Router();

const RestaurantsController = require('../controllers/restaurants')

//Gets all restos
router.get('/', RestaurantsController.get_all_restaurants); 

//Get Resto based on Resto ID
router.get('/:id', RestaurantsController.get_restaurant_id);

//Get Resto based on Owner ID
router.get('/owner/:id', RestaurantsController.get_restaurant_ownerid);

//Updates Restaurant rating
router.post('/update-rating/:id', RestaurantsController.update_restaurant_rating);

router.get('/search-resto/:restoName', RestaurantsController.get_search_restaurant_restoName);

module.exports = router; 