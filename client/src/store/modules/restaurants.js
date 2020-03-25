import axios from 'axios'

const state =  {
    allRestos : [], //Store all the restos from the query
    currResto : null, //Store the resto the user clicked here 
    userReviewRestos : [] //Store the restos reviewed by the user 
}

const getters =  {
    fetchAllRestos : state => state.allRestos,
    fetchCurrResto : state => state.currResto, 
    fetchUserReviewRestos : state => state.userReviewRestos
}

const actions =  {
    async getRestos ({commit}) {
        let res = await axios.get("http://localhost:9090/restaurants"); 

        commit('setResto', res.data); 
    },
    async getRestoById ({commit}, id) {
        let res = await axios.get(`http://localhost:9090/restaurants/${id}`); 

        commit('setCurrResto', res.data); 
    },
    async getRestoByQuery ({commit}, query) {
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 

        commit('setResto', res.data);
    }, 
    async getRestoByUser ({commit}, query) {
        //Access global state by using context root state 
        // let diningHis = context.rootState.beenHere; 
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 
         
        commit('setResto', res.data);
    }
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto,
    setUserReviewRestos : (state, restos) => state.userReviewRestos = restos
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}