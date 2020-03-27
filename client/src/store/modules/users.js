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
  setPhoto : (state, picture) => state.picture = picture
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}