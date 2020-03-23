// import axios from 'axios'

import axios from "axios"

const state =  {
    reviewPostUsers : []
    //Either store the entire logged user object from the db 
    //Or separate each field into a variable to store 
}

const getters =  {
    fetchReviewPostUser : state => id => state.reviewPostUsers.find((users) => users.userID === id),
    fetchReviewPostUsers : state => state.reviewPostUsers
}

const actions =  {
    async getReviewPostUsers({commit}, reviewIDs) {
        let result = []
        for(let i = 0; i < reviewIDs.length; i++) {
            let res = await axios.get(`http://localhost:9090/reviews/reviewID/${reviewIDs[i]}`);
            let res2 = await axios.get(`http://localhost:9090/users/${res.data.reviewerID}`);
            result.push(res2.data[0]); 
        }
        commit('setReviewPostUsers', result); 
    } 
}

const mutations = {
    setReviewPostUsers : (state, data) => state.reviewPostUsers = data 
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}