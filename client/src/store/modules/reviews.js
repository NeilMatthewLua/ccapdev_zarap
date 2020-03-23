import axios from 'axios'

const state =  {
    reviews: [], //all reviews 
    userReview: null //Store user review
}

const getters =  {
    fetchReviews: state => state.reviews, //All reviews associated with the restaurant 
    fetchPopular: state => state.reviews.reduce(function(prev, current) {
        return (prev.upvotes > current.upvotes) ? prev : current
    })
}

const actions =  {
    //Gets Reviews based on restaurant ID
    async getReviewsByRestaurant({commit}, id) {
        let res = await axios.get(`http://localhost:9090/reviews/restaurantID/${id}`); 
        //ADD FILTER TO SET CUR USER AS WELL
        commit('setReviews', res.data); 
    },
    //Gets reviews based on reviewer ID
    async getReviewsByReviewer({commit}, id) {
        let res = await axios.get(`http://localhost:9090/reviews/userID/${id}`); 
        
        commit('setReviews', res.data); 
    }
}

const mutations = {
    setReviews: (state, reviews) => (state.reviews = reviews),
    removeReview:(state, id) => state.reviews = state.reviews.filter(
        review => review.reviewID !== id)
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}