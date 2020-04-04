import axios from 'axios'

const state =  {
    allRestos : [], //Store all the restos from the query
    currResto : null, //Store the resto the user clicked here 
    userReviewRestos : [], //Store the restos reviewed by the user 
    allPics: [], // Stores all the pictures of the restaurant
    allOperatingHours: [], // Stores all the operating hours of the restaurant
    allSearchRestos : [], // Stores all the restos from the search result
    search: null

    //Store the fields associated with the resto / resto object
}

const getters =  {
    fetchAllRestos : state => state.allRestos,
    fetchCurrResto : state => state.currResto, 
    fetchUserReviewRestos : state => state.userReviewRestos,
    fetchAllPic : state => state.allPics,
    fetchCoverPic : state => id => state.allPics.filter(pics => pics.pictureID === id),
    fetchAllOperatingHours : state => state.allOperatingHours,
    fetchOperatingHour : state => id => state.allOperatingHours.filter(resto => resto.restaurantID === id),
    fetchAllSearchRestos : state => state.allSearchRestos,
    fetchSearch : state => state.search
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
    },
    async getOperatingHours ({commit}) {
        let res = await axios.get("http://localhost:9090/restaurants"); 

        commit('setOperatingHours', res.data); 
    },
    async updateRestoRating({commit}, group) {  
        //Update Restaurant Rating 
        let oldReview = group.oldRating;  
        let increase = group.rating - oldReview; 
        let resto = await axios.get(`http://localhost:9090/restaurants/${group.restaurantID}`); 
        let totalReviews =  resto.data.reviews.length; 
        let oldRating = resto.data.overallRating; 
        let newRating = ((totalReviews * oldRating + increase) / totalReviews).toFixed(1); 
        await axios.post(`http://localhost:9090/restaurants/update-rating/${group.restaurantID}`, {rating : newRating}); 

        console.log("Updated Resto Rating"); 
        //TODO Add another update in profile depending on Been here implementation in userdetail 
        if(!group.inProfile)
            commit('updateRating', newRating);
    },
    async getSearchRestos({commit}, searchKey) {
        if (searchKey == null){
            let res = await axios.get("http://localhost:9090/restaurants"); 
            commit('setSearchRestos', res.data);
        }
        else if (searchKey == ''){
            let res = await axios.get("http://localhost:9090/restaurants"); 
            commit('setSearchRestos', res.data);
        }
        else {
            let res = await axios.get(`http://localhost:9090/restaurants/search-resto/${searchKey}`);
            commit('setSearchRestos', res.data);
        }
    },
    async getSearch ({commit}, searchKey) {
        commit('setSearch', searchKey);
    }
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto,
    setPics : (state, pic) => state.allPics = pic,
    setUserReviewRestos : (state, restos) => state.userReviewRestos = restos,
    setOperatingHours: (state, restos) => state.allOperatingHours = restos,
    updateRating : (state, rating) => state.currResto.overallRating = rating,
    setSearchRestos : (state, restos) => state.allSearchRestos = restos, 
    setSearch : (state, search) => state.search = search
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}