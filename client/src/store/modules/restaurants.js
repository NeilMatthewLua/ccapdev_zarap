import axios from 'axios'

const state =  {
    allRestos = [], 
    currResto = null
    //Store the fields associated with the resto / resto object
}

const getters =  {
     getAllRestos : state => state.allRestos
}

const actions =  {
    async getRestos ({commit}) {
        let res = await axios.get("http://localhost:9090/restaurants"); 

        commit('setResto', res.data); 
    },
    async getRestoQuery ({commit}, query) {
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 
        commit('setResto', res.data);
    }
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}