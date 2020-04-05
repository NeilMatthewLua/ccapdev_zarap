import axios from 'axios'

const state =  {
    reviewPosts : [], //Stores reviews of a Restaurant 
    userReviews : [] //Stores reviews of a User 
}

const getters =  {
    //Gets the review with the most upvotes 
    fetchPopularReview: state => state.reviewPosts.reduce(function(prev, current) {
        return (prev.upvotes > current.upvotes) ? prev : current
    }),
    fetchAllReviews : state => state.reviewPosts,
    fetchUserReviews : state => state.userReviews,
    hasReview : state => id => 
        (state.reviewPosts.filter((reviews) => reviews.reviewerID === id).length > 0 ) ? true : false ,
    ownReview : state => id => 
        state.reviewPosts.filter((reviews) => reviews.reviewerID === id)[0]
}

const actions =  {
    //Gets reviews based on reviewer ID
    async getReviewsByReviewer({commit}, id) {
        let res = await axios.get(`http://localhost:9090/reviews/userID/${id}`); 
        commit('setUserReviews', res.data); 
    },
    //Get Reviews for a Restaurant 
    async getReviewPostUsers({commit}, reviewIDs) {
        //Data for Review in Restaurant Page 
            let users = [];  
            for(let i = 0; i < reviewIDs.length; i++) {
                let review = await axios.get(`http://localhost:9090/reviews/reviewID/${reviewIDs[i]}`);
                let user = await axios.get(`http://localhost:9090/users/${review.data.reviewerID}`);
                let userPic = await axios.get(`http://localhost:9090/pictures/${user.data.user[0].picture}`);
                let reviewPictures = []; 
                for(let j = 0; j < review.data.reviewPictures.length; j++) {
                    let reviewPic = await axios.get(`http://localhost:9090/pictures/${review.data.reviewPictures[j]}`);
                    reviewPictures.push(reviewPic.data.url); 
                }
                users.push({...user.data.user[0], ...review.data, userUrl :  userPic.data.url, reviewPics : reviewPictures});
            }
            commit('setReviewPostUsers', users);
    },
    //Get Reviews for a User 
    async getUserReviews({commit}, reviewIDs) {
        //Data for Review in User Page
            let users = [];  
            for(let i = 0; i < reviewIDs.length; i++) {
                let review = await axios.get(`http://localhost:9090/reviews/reviewID/${reviewIDs[i]}`);
                let resto = await axios.get(`http://localhost:9090/restaurants/${review.data.restaurantID}`); 
                let restoPic = await axios.get(`http://localhost:9090/pictures/${resto.data.defaultPicture}`);
                let reviewPictures = []; 
                for(let j = 0; j < review.data.reviewPictures.length; j++) {
                    let reviewPic = await axios.get(`http://localhost:9090/pictures/${review.data.reviewPictures[j]}`);
                    reviewPictures.push(reviewPic.data.url); 
                }
                users.push({...resto.data, ...review.data, restoUrl : restoPic.data.url, reviewPics : reviewPictures});
            }
            commit('setUserReviews', users); 
    },

    async addReview({commit}, group) {
        let pictureIDs = await axios.post('http://localhost:9090/pictures/save-pictures', group.photos);
        group.reviewPictures = pictureIDs.data; 
        await axios.post(`http://localhost:9090/reviews/addReview/${group.userID}`, group)
        .then(async resp => {
            //Updates the reviews of the resstaurant
            let userPic = await axios.get(`http://localhost:9090/pictures/${group.userID.picture}`);
            let reviewPictures =  group.photos;
            
            let user = [];
            user.push({...group.userID, ...resp.data.review, userUrl : userPic.data.url, reviewPics : reviewPictures});

            commit('appendReview', user)

            //Updates the reviews of the user
            user = [];
            let resto = await axios.get(`http://localhost:9090/restaurants/${group.restaurant.restaurantID}`);  
            let restoPic = await axios.get(`http://localhost:9090/pictures/${resto.data.defaultPicture}`);

            user.push({...resto.data, ...resp.data.review, restoUrl : restoPic.data.url, reviewPics : reviewPictures});
                
            commit('appendUserReview', user)

            await axios.post(`http://localhost:9090/users/addUserReviewed`, {
                restaurantID : group.restaurant.restaurantID,
                userID: group.userID
            })
        })
    },

    async deleteReview({commit}, details) {
        let index, review;

        if(details.route.name == "UserDetail") {
            index = state.userReviews.findIndex(x => x.restaurantID == details.restaurant.restaurantID)
            review = state.userReviews[index]
        }
        else {
            index = state.reviewPosts.findIndex(x => x.reviewerID == details.user.userID)
            review = state.reviewPosts[index]
        }
   
        await axios.post(`http://localhost:9090/users/deleteUserReviewed`, {
                restaurant: details.restaurant,
                user: details.user,
                review: review
        })
        .then(() => {
            if(details.route.name == "UserDetail"){
                commit('removeUserReview', index)
            }
            else {
                commit('removeReview', index)
            }
        })
    },

    async editReview({commit}, group) {

        //Update Review Object 
        await axios.post(`http://localhost:9090/reviews/edit-review/${group.reviewID}`, group); 
        let editedReview = {...group.oldReview};  
        editedReview.rating = group.rating; 
        editedReview.review = group.review;  
        editedReview.reviewPics = group.newUrls;  
        if(!group.inProfile){ 
            commit('updateReviewResto', editedReview); 
        }
        else {
            commit('updateReviewUser', editedReview); 
        }
    }
}

const mutations = {
    setReviewPostUsers : (state, data) => state.reviewPosts = data,
    setUserReviews : (state, data) => state.userReviews = data,
    appendReview : (state, data) => state.reviewPosts =  state.reviewPosts.concat(data),    
    appendUserReview : (state, data) => state.userReviews =  state.userReviews.concat(data),
    removeReview : (state, data) => state.reviewPosts.splice(data, 1),
    removeUserReview : (state, data) => state.userReviews.splice(data, 1),
    updateReviewResto: (state, data) => { 
        let index = state.reviewPosts.findIndex((item) => item.reviewID === data.reviewID); 
        state.reviewPosts.splice(index,1,data);  
    },
    updateReviewUser: (state, data) => { 
        let index = state.userReviews.findIndex((item) => item.reviewID === data.reviewID); 
        state.userReviews.splice(index,1,data);  
    },
    addLikes: (state, post) => {
        let index = state.reviewPosts.findIndex(item => item.reviewID === post.reviewID);
        state.reviewPosts.splice(index,1,post);
    }
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}