// import axios from 'axios'

import axios from "axios"

const state =  {
    user : null,
    picture : null,
    status : ''
}

const getters =  {
    isLoggedIn: state => { //gets the status of the login state
      if(state.user != null)
        return true
      else
        return false 
    },

    getUser: state => {return state.user},
    getPicture: state => {return state.picture},
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
            commit('setPhoto', resp.data.picture)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
        })
    },
    updateUser({commit}, user){
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:9090/users/updateUser', {
            user
          })
          .then(resp => {
            commit('auth_success', resp.data.user)
            commit('setPhoto', resp.data.picture)
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
    addRestaurantVisit({commit}, group) {
      axios.post('http://localhost:9090/users/addUserVisited', {
        group
      })
      .then(resp => {
        commit('auth_success', resp.data.user)
      })
    },
    deleteRestaurantVisit({commit}, group) {
      axios.post('http://localhost:9090/users/deleteUserVisited', {
        group
      })
      .then(resp => {
        commit('auth_success', resp.data.user)
      })
    },
    async updateGetUser({commit}) {
      let user = await axios.get(`http://localhost:9090/users/${state.user.userID}`);
      commit('auth_success', user.data.user[0])
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
  setPhoto : (state, picture) => state.picture = picture ,
  setLikedReview : (state, review) => state.user.liked = state.user.liked.concat(review),
  removeLikedReview : (state, review) => state.user.liked = state.user.liked.filter((likes) => likes != review)
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}