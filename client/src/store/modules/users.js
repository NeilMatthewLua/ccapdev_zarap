import axios from 'axios'

const state =  {
    //Either store the entire logged user object from the db 
    //Or separate each field into a variable to store\
    user : null,

}

const getters =  {
    
}

const actions =  {
    // async login({commit}, details) {
    //     console.log("DEETS: " + details.length)
    //     let res = 
    //      axios.get("http://localhost:9090/user/")
    //     .then((doc) => {
    //         console.log("RESULT: " + doc.length)
    //     })
    //     .catch(() => {
    //         console.log('Bollocks, error mate')
    //     }) 
        
    //     commit('setUsers', res.data); 
    // },
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
}

const mutations = {
    setUsers (state, data) {
        state.user = data
    }
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}