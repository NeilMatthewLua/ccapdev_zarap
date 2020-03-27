import axios from 'axios'

const state =  {
    allRestos : [], //Store all the restos from the query
    currResto : null, //Store the resto the user clicked here 
    userReviewRestos : [], //Store the restos reviewed by the user 
    allPics: [], // Stores all the pictures from the query
    //Store the fields associated with the resto / resto object
}

const getters =  {
    fetchAllRestos : state => state.allRestos,
    fetchCurrResto : state => state.currResto, 
    fetchUserReviewRestos : state => state.userReviewRestos,
    fetchsAllPic : state => state.allPics,
    fetchCoverPic: state => id => state.allPics.filter(pics => pics.pictureID === id)
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

        commit('setCurrResto', res.data); 
    },
    //Gets Restos that fit the query 
    async getRestoByQuery ({commit}, query) {
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 

        commit('setResto', res.data);
    }, 
    async getRestoByUser ({commit}, query) {
        //Access global state by using context root state 
        // let diningHis = context.rootState.beenHere; 
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 
         
        commit('setResto', res.data);
    },
    async getPics ({commit}, arr) {
        let listPics = [];
        for (let i = 0; i < arr.length; i++) {
            let res = await axios.get(`http://localhost:9090/pictures/${arr[i].defaultPicture}`);
            listPics.push(res.data);
        }
        commit('setPics', listPics);
    }
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto,
    setPics: (state, pic) => state.allPics = pic,
    setUserReviewRestos : (state, restos) => state.userReviewRestos = restos
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}