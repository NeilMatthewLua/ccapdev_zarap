// import axios from 'axios'

import axios from "axios"

const state =  {
    reviewPostUsers : [],
    user : null,
    status : ''
}

const getters =  {
    isLoggedIn: state => { //gets the status of the login state
      if(state.user != null)
        return true
      else
        return false 
    },

<<<<<<< HEAD
    getUser: state => {return state.user} //gets the user object
=======
    getUser: state => {return state.user},
    fetchReviewPostUser : state => id => state.reviewPostUsers.find((users) => users.userID === id),
    fetchReviewPostUsers : state => state.reviewPostUsers
>>>>>>> mp2.5
}

const actions =  {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios.post('http://localhost:9090/users/login', {
            user
          })
          .then(resp => {
            commit('auth_success', resp.data.user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
        })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        resolve()
      })
    },
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
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, user) {
    state.status = 'success'
    state.user = user
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = '',
    state.user = null
  },
  setReviewPostUsers : (state, data) => state.reviewPostUsers = data 
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}