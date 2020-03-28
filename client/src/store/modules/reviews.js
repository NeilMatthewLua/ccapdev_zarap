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
                users.push({...user.data.user[0], ...review.data, userUrl :  userPic.data.url,});
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
                users.push({...resto.data, ...review.data, restoUrl : restoPic.data.url});
            }
            console.log(users); 
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
    }
}

const mutations = {
    setReviewPostUsers : (state, data) => state.reviewPosts = data,
    setUserReviews : (state, data) => state.userReviews = data
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}