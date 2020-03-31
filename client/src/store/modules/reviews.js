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
    fetchUserReviews : state => state.userReviews
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
    //Update Review upvotes and User points 
    async updatePostLikes(userID, reviewID, ownerID, value) {
        if(value > 0)
            await axios.post(`http://localhost:9090/users/addLiked/${userID}`, {reviewID}); 
        else    
            await axios.post(`http://localhost:9090/users/deleteLiked/${userID}`, {reviewID});
        await axios.post(`http://localhost:9090/reviews/increment/${reviewID}`, {value});
        await axios.post(`http://localhost:9090/users/increment/${ownerID}`, {value});
    },

    async addReview({commit}, group) {
        await axios.post(`http://localhost:9090/reviews/addReview/${group.userID}`, group)
        .then(async resp => {
            //Updates the reviews of the resstaurant
            let userPic = await axios.get(`http://localhost:9090/pictures/${group.userID.picture}`);
            let reviewPictures =  group.photos.map((item) => item.url);

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
        let index = state.reviewPosts.findIndex(x => x.reviewerID == details.user.userID)
        await axios.post(`http://localhost:9090/users/deleteUserReviewed`, {
                restaurant : details.restaurant,
                user: details.user,
                review: state.reviewPosts[state.reviewPosts.findIndex(x => x.reviewerID == details.user.userID)]
        })
        .then(() => 
            commit('removeUserReview', state.userReviews[state.userReviews.findIndex(y => y.reviewID == state.reviewPosts[index].reviewID)]),
            commit('removeReview', index),
        )
    }
}

const mutations = {
    setReviewPostUsers : (state, data) => state.reviewPosts = data,
    setUserReviews : (state, data) => state.userReviews = data,
    appendReview : (state, data) => state.reviewPosts =  state.reviewPosts.concat(data),    
    appendUserReview : (state, data) => state.userReviews =  state.userReviews.concat(data),
    removeReview : (state, data) => state.reviewPosts.splice(data, 1),
    removeUserReview : (state, data) => state.userReviews.splice(data, 1)
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}