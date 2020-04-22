import axios from 'axios'

const state =  {
    allRestos : [], //Store all the restos from the query
    currResto : null, //Store the resto the user clicked here 
    userReviewRestos : [], //Store the restos reviewed by the user 
    allPics: [], // Stores all the pictures of the restaurant
    allOperatingHours: [], // Stores all the operating hours of the restaurant
    allSearchRestos : [], // Stores all the restos from the search result
    search: null,
    userRestos : [], // Stores all the restos the user has been to
    allSearchRestosFiltered: [], // Stores all the restos from search result and filtered/sorted using filter bar
    filterCategory: null,
    filterKey: null,


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
    fetchSearch : state => state.search,
    fetchUserRestos : state => state.userRestos,
    fetchAllSearchRestosFiltered : state => state.allSearchRestosFiltered,
    fetchFilterCategory : state => state.filterCategory,
    fetchFilterKey : state => state.filterKey,
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
 
        commit('updateRating', newRating, group.inProfile);
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
    },
    async getRestByUser({commit}, userID) {
        let user = await axios.get(`http://localhost:9090/users/${userID}`);
        let allRestos = [];
        let listPics = [];

        for(let i = 0; i < user.data.user[0].beenHere.length; i++) {
            let resto = await axios.get(`http://localhost:9090/restaurants/${user.data.user[0].beenHere[i]}`); 
            allRestos.push(resto.data);

            let res = await axios.get(`http://localhost:9090/pictures/${resto.data.defaultPicture}`);
            listPics.push(res.data);
        }

        commit('setPics', listPics);
        commit('setUserRestos', allRestos);
    },
    async getFilterCategory ({commit}, category) {
        commit('setFilterCategory', category);
    },
    async getFilterKey ({commit}, filterKey) {
        commit('setFilterKey', filterKey);
    },
    async getSearchRestosFiltered ({commit}, searchKey, category, filterKey) {
        if (searchKey == null) {
            if (category == 'Sort by') {
                let res = await axios.get(`http://localhost:9090/restaurants/sortby/${filterKey}`); 
                commit('setSearchRestosFiltered', res.data);
            }
        }
        else if (searchKey == '') {
            if (category == 'Sort by') {
                let res = await axios.get(`http://localhost:9090/restaurants/sortby/${filterKey}`); 
                commit('setSearchRestosFiltered', res.data);
            }
        }
        else {
            if (category == 'Sort by') {
                let res = await axios.get(`http://localhost:9090/restaurants/search-resto/${searchKey}/${filterKey}`);
                commit('setSearchRestosFiltered', res.data);
            }
            
        }
    },
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto,
    setPics : (state, pic) => state.allPics = pic,
    setUserReviewRestos : (state, restos) => state.userReviewRestos = restos,
    setOperatingHours: (state, restos) => state.allOperatingHours = restos,
    updateRating : (state, rating, inProfile) => {
        if(!inProfile)
            state.currResto.overallRating = rating
        else 
            state.userRestos[state.userRestos.findIndex(x => x.restaurantID == state.currResto.restaurantID)].overallRating = rating
    },
    setSearchRestos : (state, restos) => state.allSearchRestos = restos, 
    setSearch : (state, search) => state.search = search,
    setUserRestos : (state, restos) => state.userRestos = restos,
    setSearchRestosFiltered : (state, restos) => state.allSearchRestosFiltered = restos,
    setFilterCategory : (state, category) => state.filterCategory = category,
    setFilterKey : (state, key) => state.filterKey = category,
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}