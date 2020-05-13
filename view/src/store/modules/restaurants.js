import axios from 'axios'

const state =  {
    isLoading : false, //Flag if query is still loading (used in navbar)
    allRestos : [], //Store all the restos from the query
    currResto : null, //Store the resto the user clicked here 
    userReviewRestos : [], //Store the restos reviewed by the user 
    allPics: [], // Stores all the pictures of the restaurant
    allOperatingHours: [], // Stores all the operating hours of the restaurant
    allSearchRestos : [], // Stores all the restos from the search result
    unmodifiedSearchRestos: [],
    search: null,
    userRestos : [], // Stores all the restos the user has been to
    //Following Arrays store the values if any of the filters is active 
    sortList: [ 
        false, false, false
    ],
    cityList: [
        false, false, false, false, false, false, false, false, false, 
        false, false, false, false, false, false, false, false
    ],
    cuisineList: [
        false, false, false, false, false, false, false, false, false, 
        false, false, false, false, false, false, false, false, false, 
        false, false, false, false, false, false, false, false
    ],
    estList: [
        false, false, false, false, false, false, false, false, false
    ],
    costList:[
        false, false, false, false
    ],
    filters: { //Stores filter options selected
        cities : [],
        cuisines : [],
        estTypes: [],
        costFilter: false, 
        costLower: 0, //lower bound for cost
        costUpper: -1, //upper bound for cost (no limit)
        sortByRating: false, 
        sortByCost: false,
        sortCostOrder: 1, //default sort cost by ascending
    }
    //Store the fields associated with the resto / resto object
}

const getters =  {
    fetchIsLoading : state => state.isLoading, 
    fetchAllRestos : state => state.allRestos,
    fetchUnmodifiedRestos: state => state.unmodifiedSearchRestos, 
    fetchCurrResto : state => state.currResto, 
    fetchUserReviewRestos : state => state.userReviewRestos,
    fetchAllPic : state => state.allPics,
    fetchCoverPic : state => id => state.allPics.filter(pics => pics.pictureID === id),
    fetchAllOperatingHours : state => state.allOperatingHours,
    fetchOperatingHour : state => id => state.allOperatingHours.filter(resto => resto.restaurantID === id),
    fetchAllSearchRestos : state => state.allSearchRestos,
    fetchSearch : state => state.search,
    fetchUserRestos : state => state.userRestos,
    fetchSortToggles: state => state.sortList,
    fetchCityToggles: state => state.cityList,
    fetchCuisineToggles: state => state.cuisineList, 
    fetchEstToggles: state => state.estList, 
    fetchCostToggles: state => state.costList,
    fetchFilters: state => state.filters
}

const actions =  {
    //Gets All Restos from db
    async getRestos ({commit}) {
        let res = await axios.get("/restaurants"); 
         
        commit('setResto', res.data); 
    },
    //Gets Resto by restaurantID 
    async getRestoById ({commit}, id) {
        let res = await axios.get(`/restaurants/`+ id); 
        
        if(res.data)
            commit('setCurrResto', res.data); 
        else 
            commit('setCurrResto', null);
    },
    async getRestoByUser ({commit}, query) {
        //Access global state by using context root state 
        // let diningHis = context.rootState.beenHere; 
        let res = await axios.get(`/restaurants?${query}`); 
         
        commit('setResto', res.data);
    },
    async getPics ({commit}, arr) {
        let listPics = [];
        for (let i = 0; i < arr.length; i++) {
            let res = await axios.get(`/pictures/${arr[i].defaultPicture}`);
            listPics.push(res.data);
        }
        commit('setPics', listPics);
    },
    async getOperatingHours ({commit}) {
        let res = await axios.get("/restaurants"); 

        commit('setOperatingHours', res.data); 
    },
    async updateRestoRating({commit}, group) {  
        //Update Restaurant Rating 
        let oldReview = group.oldRating;  
        let increase = group.rating - oldReview; 
        let resto = await axios.get(`/restaurants/${group.restaurantID}`); 
        let totalReviews =  resto.data.reviews.length; 
        let oldRating = resto.data.overallRating; 
        let newRating = ((totalReviews * oldRating + increase) / totalReviews).toFixed(1); 
        await axios.post(`/restaurants/update-rating/${group.restaurantID}`, {rating : newRating}); 
 
        commit('updateRating', newRating, group.inProfile);
    },
    async getSearchRestos({commit}, searchKey) {
        let res; 
        if (searchKey == null){
            res = await axios.get("/restaurants"); 
        }
        else if (searchKey == ''){
            res = await axios.get("/restaurants"); 
        }
        else {
            res = await axios.get(`/restaurants/search-resto/${searchKey}`);
        }
        commit('setSearchRestos', res.data);
        commit('setUnmodifiedSearchRestos', res.data);
    },
    async getSearch ({commit}, searchKey) {
        commit('setSearch', searchKey);
    },
    async getRestByUser({commit}, userID) {
        let user = await axios.get(`/users/${userID}`);
        let allRestos = [];
        let listPics = [];

        for(let i = 0; i < user.data.user[0].beenHere.length; i++) {
            let resto = await axios.get(`/restaurants/${user.data.user[0].beenHere[i]}`); 
            allRestos.push(resto.data);

            let res = await axios.get(`/pictures/${resto.data.defaultPicture}`);
            listPics.push(res.data);
        }

        commit('setPics', listPics);
        commit('setUserRestos', allRestos);
    }
}

const mutations = {
    setIsLoading: (state, bool) => state.isLoading = bool, 
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
    setUnmodifiedSearchRestos: (state, restos) => state.unmodifiedSearchRestos = restos, 
    setSearch : (state, search) => state.search = search,
    setUserRestos : (state, restos) => state.userRestos = restos,
    toggleFilterCity: (state, payload) => {
        let index = payload[0]; 
        let city = payload[1];   
        state.cityList[index] = !state.cityList[index]
        //Add city to filter if not yet there, otherwise remove it
        if(state.cityList[index])
            state.filters.cities.push(city)
        else 
            state.filters.cities = state.filters.cities.filter(item => item != city)
    },
    toggleFilterSort: (state, payload) => {
        let index = payload[0];
        let label = payload[1]; 
        let order = payload[2]; 
        state.sortList[index] = !state.sortList[index]; 
        if(state.sortList[index]) {
            //Set all other toggles to false 
            for(let i = 0; i < state.sortList.length; i++)
                if(i != index) {
                    state.sortList[i] = false; 
                }
            if(label == "Rating") {
                state.filters.sortByRating = true; 
                state.filters.sortByCost = false;   
            }
            else {
                state.filters.sortByCost = true; 
                state.filters.sortByRating = false; 
                state.filters.sortCostOrder = order; 
            }
        }
        else {
            state.filters.sortByRating = false; 
            state.filters.sortByCost = false; 
            state.allSearchRestos = [].concat(state.unmodifiedSearchRestos);
        }
    },
    toggleFilterCuisine: (state, payload) => {
        let index = payload[0];
        let cuisine = payload[1];
        state.cuisineList[index] = !state.cuisineList[index]
        if(state.cuisineList[index]) {
            state.filters.cuisines.push(cuisine); 
        }
        else {
            state.filters.cuisines = state.filters.cuisines.filter(item => item != cuisine); 
        }
    },
    toggleFilterCost: (state, payload) => {
        let index = payload[0];
        let lower = payload[1];
        let upper = payload[2]; 
        state.costList[index] = !state.costList[index]
        if(state.costList[index]) {
            state.filters.costFilter = true; 
            state.filters.costLower = lower; 
            state.filters.costUpper = upper; 
            for(let i = 0; i < state.costList.length; i++)
                if(i != index) {
                    state.costList[i] = false; 
                }
        }
        else {
            state.filters.costFilter = false; 
            //Set cost back to default 
            state.filters.costLower = 0; 
            state.filters.costUpper = -1; 
        }
    },
    toggleFilterEst: (state, payload) => {
        let index = payload[0];
        let establishment = payload[1]; 
        state.estList[index] = !state.estList[index]
        if(state.estList[index]) {
            state.filters.estTypes = []; 
            state.filters.estTypes.push(establishment); 
            for(let i = 0; i < state.estList.length; i++) {
                if(i == index) 
                    state.estList[i] = true; 
                else 
                    state.estList[i] = false;
            }
        }
        else {
            state.filters.estTypes = []; 
        }
    }, 
    updateFilteredRestaurants: (state) => {
        let filtered = [].concat(state.unmodifiedSearchRestos); 
        //Filter by cities 
        if(state.filters.cities.length != 0)
            filtered = filtered.filter(restaurant => {
                return state.filters.cities.includes(restaurant.city); 
            });  
        //Filter by cuisine 
        if(state.filters.cuisines.length != 0)
            filtered = filtered.filter(restaurant => {
                return state.filters.cuisines.every(cuisine => restaurant.cuisines[0].includes(cuisine))
            })
        //Filter by cost 
        if(state.filters.costFilter) { //If there was a filter set
            filtered = filtered.filter(restaurant => {
                //Upper and lower limit set
                if(state.filters.costUpper != -1) {
                    if(restaurant.costForTwo >= state.filters.costLower && restaurant.costForTwo <= state.filters.costUpper)
                        return restaurant;
                }
                //No upper Limit
                else {
                    if(restaurant.costForTwo >= state.filters.costLower)
                        return restaurant;
                }
            })
        }
        //Filter by establishment type 
        if(state.filters.estTypes.length != 0)
            filtered = filtered.filter(restaurant => {
                return state.filters.estTypes.every(establishment => restaurant.establishmentType.includes(establishment))
            })
        
        //Sort By rating 
        if(state.filters.sortByRating) {
            filtered.sort((a, b) => {
                if (a.overallRating > b.overallRating)
                    return -1;
                if (a.overallRating < b.overallRating)
                    return 1;
                return 0;
            })
        }

        //Sort by cost 
        if(state.filters.sortByCost) {
            if(state.filters.sortCostOrder == -1) {
                filtered.sort((a, b) => {
                    if (a.costForTwo > b.costForTwo)
                        return -1;
                    if (a.costForTwo < b.costForTwo)
                        return 1;
                    return 0;
                })
            }
            else {
                filtered.sort((a, b) => {
                    if (a.costForTwo < b.costForTwo)
                        return -1;
                    if (a.costForTwo > b.costForTwo)
                        return 1;
                    return 0;
                }) 
            }
        }

        state.allSearchRestos = filtered
    }, 
    clearFilter: (state) => {
        state.allSearchRestos = [].concat(state.unmodifiedSearchRestos); 
        state.filters.cities = [];
        state.filters.cuisines = [];
        state.filters.estTypes = [];
        state.filters.costFilter = false; 
        state.filters.costLower = 0;
        state.filters.costUpper = -1;
        state.filters.sortByRating = false;
        state.filters.sortByCost = false;
        state.filters.sortCostOrder = 1;
        state.sortList = [ 
            false, false, false
        ]
        state.cityList = [
            false, false, false, false, false, false, false, false, false, 
            false, false, false, false, false, false, false, false
        ]
        state.cuisineList = [
            false, false, false, false, false, false, false, false, false, 
            false, false, false, false, false, false, false, false, false, 
            false, false, false, false, false, false, false, false
        ]
        state.estList = [
            false, false, false, false, false, false, false, false, false
        ]
        state.costList = [
            false, false, false, false
        ]
    }
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}