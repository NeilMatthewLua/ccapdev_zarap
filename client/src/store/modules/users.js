import axios from 'axios'

const state =  {
    //Either store the entire logged user object from the db 
    //Or separate each field into a variable to store

}

const getters =  {
    
}

const actions =  {
    async getUsers({commit}) {
        let res = await axios.get("http://localhost:9090/user/"); 
        
        commit('setUsers', res.data); 
    },

}

const mutations = {
    
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}