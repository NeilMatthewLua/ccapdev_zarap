import axios from 'axios'

const state =  {
    reviews: [], //all reviews 
    userReview: null //Store user review
}

const getters =  {
    currentReviews: state => state.reviews //All reviews associated with the restaurant 
}

const actions =  {
    //Gets Reviews based on restaurant ID
    async getReviewsByRestaurant({commit}, id) {
        let res = await axios.get(`http://localhost:9090/reviews/restaurant/${id}`); 
        
        commit('setReviews', res.data); 
    },
    //Gets reviews based on reviewer ID
    async getReviewsByReviewer({commit}, id) {
        let res = await axios.get(`http://localhost:9090/reviews/user/${id}`); 
        
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