var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users');

//Adds a user
router.post('/addUser', UsersController.add_user);

//Finds a user by userID
router.get('/:userID', UsersController.get_user_id);

//Gets all users
router.get('/', UsersController.get_all_users);

//Manages login of a user
router.post('/login', UsersController.login_user);

//Updates a user's profile
router.post('/updateUser', UsersController.update_user);

//Increments the points of a user by amount 
router.post('/increment/:id', UsersController.increment_points);

//Adds user's liked review
router.post('/addLiked/:id', UsersController.add_like);

//Deletes a user's liked review 
router.post('/deleteLiked/:id', UsersController.delete_like);

//Adds user's visited restaurant
router.post('/addUserVisited', UsersController.add_visit);

//Deletes user's visited restaurant
router.post('/deleteUserVisited', UsersController.delete_visit);

//Adds a review 
router.post('/addUserReviewed', UsersController.add_review);

//Deletes a review 
router.post('/deleteUserReviewed', UsersController.delete_review);

module.exports = router;