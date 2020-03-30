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

        if(res.data)
            commit('setCurrResto', res.data); 
        else 
            commit('setCurrResto', null);
    },
    //Gets Restos that fit the query 
    async getRestoByQuery ({commit}, query) {
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 

        commit('setResto', res.data);
    },
    async updateRestoRating({commit}, group, inProfile) { 
        //Update Restaurant Rating 
        let oldReview = group.oldRating;  
        let increase = group.rating - oldReview; 
        let resto = await axios.get(`http://localhost:9090/restaurants/${group.restaurantID}`); 
        let totalReviews =  resto.data.reviews.length; 
        let oldRating = resto.data.overallRating; 
        let newRating = ((totalReviews * oldRating + increase) / totalReviews).toFixed(1); 
        await axios.post(`http://localhost:9090/restaurants/update-rating/${group.restaurantID}`, {rating : newRating}); 

        //TODO Add another update in profile depending on Been here implementation in userdetail 
        if(!inProfile)
            commit('updateRating', newRating);
    }
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto,
    updateRating : (state, rating) => state.currResto.overallRating = rating
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}