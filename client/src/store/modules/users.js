import axios from 'axios'

const state =  {
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

    getUser: state => {return state.user} //gets the user object
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
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}