import axios from 'axios'

const state =  {
    reviews: [], 
}

const getters =  {
    allReviews: state => state.reviews
}

const actions =  {
    async getReviews({commit}) {
        let res = await axios.get("http://localhost:9090/review/"); 
        
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