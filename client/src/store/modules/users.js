import axios from 'axios'

const state =  {
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

    getUser: state => {return state.user}
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
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
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
    state.status = ''
  },
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}