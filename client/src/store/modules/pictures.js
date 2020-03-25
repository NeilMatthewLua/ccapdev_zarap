import axios from 'axios'
const state =  {
    menuPictures : [],
    restaurantPictures : [], 
    reviewPictures : [], 
}

const getters =  {
    fetchMenuPics : state => state.menuPictures, 
    fetchRestaurantPics : state => state.restaurantPictures, 
    fetchDefaultPic : state => id => state.restaurantPictures.filter(pics => pics.pictureID === id)[0] 
    // fetchReviewPics : state => id => state.reviewPictures.filter()
}

const actions =  {
    //Gets Resto Pics based on an array of ids
    async getRestaurantPictures({commit}, arr) {
        let listRes = []; 
        for(let i = 0; i < arr.length; i++) {
            let res = await axios.get(`http://localhost:9090/pictures/${arr[i]}`);  
            listRes.push(res.data); 
        }
        commit('setRestaurant', listRes); 
    },
    async getMenuPictures({commit}, arr) {
        let listRes = []; 
        for(let i = 0; i < arr.length; i++) {
            let res = await axios.get(`http://localhost:9090/pictures/${arr[i]}`);  
            listRes.push(res.data); 
        }
        commit('setMenu', listRes); 
    }
    
}

const mutations = {
    setMenu : (state, menu) => (state.menuPictures = menu),
    setRestaurant : (state, restoPics) => (state.restaurantPictures = restoPics), 
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}