import axios from 'axios'

const state =  {
    allRestos : [], //Store all the restos from the query
    currResto : null, //Store the resto the user clicked here 
}

const getters =  {
    fetchAllRestos : state => state.allRestos,
    fetchCurrResto : state => state.currResto
}

const actions =  {
    //Gets All Restos from db
    async getRestos ({commit}) {
        let res = await axios.get("http://localhost:9090/restaurants"); 
         
        commit('setResto', res.data); 
    },
    //Gets Resto by restaurantID 
    async getRestoById ({commit}, id) {
        let res = await axios.get(`http://localhost:9090/restaurants/${id}`); 
<<<<<<< HEAD
        
        commit('setCurrResto', res.data); 
=======

        if(res.data)
            commit('setCurrResto', res.data); 
        else 
            commit('setCurrResto', null);
>>>>>>> mp2.5
    },
    //Gets Restos that fit the query 
    async getRestoByQuery ({commit}, query) {
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