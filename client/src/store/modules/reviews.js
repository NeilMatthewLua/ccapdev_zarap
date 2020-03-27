import axios from 'axios'

const state =  {
    reviewPosts : [],
    userReviews : []
}

const getters =  {
    fetchPopular: state => state.reviewPosts.reduce(function(prev, current) {
        return (prev.upvotes > current.upvotes) ? prev : current
    }),
    fetchReviewPostUser : state => id => state.reviewPost.find((users) => users.userID === id),
    fetchAllReviews : state => state.reviewPosts, 
}

const actions =  {
    //Gets reviews based on reviewer ID
    async getReviewsByReviewer({commit}, id) {
        let res = await axios.get(`http://localhost:9090/reviews/userID/${id}`); 
        
        commit('setReviews', res.data); 
    },
    async getReviewPostUsers({commit}, reviewIDs, inProfile) {
        if(!inProfile) {
            let users = [];  
            for(let i = 0; i < reviewIDs.length; i++) {
                let review = await axios.get(`http://localhost:9090/reviews/reviewID/${reviewIDs[i]}`);
                let user = await axios.get(`http://localhost:9090/users/${review.data.reviewerID}`);
                let userPic = await axios.get(`http://localhost:9090/pictures/${user.data[0].picture}`); 
                users.push({...user.data[0], ...review.data, userUrl :  userPic.data.url,});
            }
            commit('setReviewPostUsers', users); 
        }
        else {
            let users = [];  
            for(let i = 0; i < reviewIDs.length; i++) {
                let review = await axios.get(`http://localhost:9090/reviews/reviewID/${reviewIDs[i]}`);
                let resto = await axios.get(`http://localhost:9090/restaurants/${review.data.restaurantID}`); 
                let restoPic = await axios.get(`http://localhost:9090/pictures/${resto.data.defaultPicture}`);
                users.push({...resto.data, ...review.data, restoUrl : restoPic.data.url});
            }
            commit('setUserReviews', users); 
        }
        
    }, 
    // async getUserReviewPosts ({commit}, user) {
    //     let userReviews = []
    //     for(let i = 0; i < user.reviewed.length; i++) {
    //         let res = await axios.get(`http://localhost:9090/reviews/reviewID/${user.reviewed[i]}`);
    //         userReviews.push(res.data); 
    //     }

    // }
}

const mutations = {
    setReviews: (state, reviews) => (state.reviews = reviews),
    removeReview:(state, id) => state.reviews = state.reviews.filter(
        review => review.reviewID !== id),
    setReviewPostUsers : (state, data) => state.reviewPosts = data,
    setUserReviews : (state, data) => state.userReviews = data
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}