// import axios from 'axios'

import axios from "axios"

const state =  {
    reviewPostUsers : []
    //Either store the entire logged user object from the db 
    //Or separate each field into a variable to store\
    user : null,
    status : ''

}

const getters =  {
    isLoggedIn: state => {
      if(state.user != null)
        return true
      else
        return false 
    },

    getUser: state => {return state.user},
    fetchReviewPostUser : state => id => state.reviewPostUsers.find((users) => users.userID === id),
    fetchReviewPostUsers : state => state.reviewPostUsers
}

const actions =  {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios.post('http://localhost:9090/user/login', {
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
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
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
    state.status = ''
  },
  setReviewPostUsers : (state, data) => state.reviewPostUsers = data 
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}