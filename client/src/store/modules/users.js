import axios from 'axios'

const state =  {
    users: [], 
}

const getters =  {
    allUsers: state => state.users
}

const actions =  {
    async getUsers({commit}) {
        let res = await axios.get("http://localhost:9090/review/"); 
        
        commit('setUsers', res.data); 
    }
}

const mutations = {
    setUsers: (state, users) => (state.users = users),
    removeUsers:(state, id) => state.users = state.users.filter(
        user => user.userID !== id)
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}