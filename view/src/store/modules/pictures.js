import axios from 'axios'
const state =  {
    menuPictures : [],
    restaurantPictures : [], 
    uploadedFiles: [],
}

const getters =  {
    fetchMenuPics : state => state.menuPictures, 
    fetchRestaurantPics : state => state.restaurantPictures, 
    fetchDefaultPic : state => id => state.restaurantPictures.filter(pics => pics.pictureID === id)[0], 
    fetchUploadedPics: state => state.uploadedFiles 
}

const actions =  {
    //Gets Restaurant Pictures 
    async getRestaurantPictures({commit}, arr) {
        let listRes = []; 
        for(let i = 0; i < arr.length; i++) {
            let res = await axios.get(`/pictures/${arr[i]}`);  
            listRes.push(res.data); 
        }
        commit('setRestaurant', listRes); 
    },
    //Get Menu Pictures
    async getMenuPictures({commit}, arr) {
        let listRes = []; 
        for(let i = 0; i < arr.length; i++) {
            let res = await axios.get(`/pictures/${arr[i]}`);  
            listRes.push(res.data); 
        }
        commit('setMenu', listRes); 
    }, 
    /*
        Removes pictures that aren't in the db and updates state
        Used for the upload image section 
    */
    async removeUnusedPictures({commit}) {
       let remainingPics = await axios.post("/pictures/delete-unused-pics", { urls : state.uploadedFiles });
       commit('setUploadedPics', remainingPics.data); 
    },
    /*
        Removes a picture from storage when not found in db  
        Used for the remove button in the picture modal  
    */
    async removePicture({commit}, pic) {
        await axios.post("/pictures/delete-unused-pics", { urls : pic });
         
        commit('removePic', pic) 
    },
    async removeUnusedProfilePic({commit}, pic) {
        await axios.post("/pictures/delete-unused-profile-pics", { urls : pic });
         
        commit('removePic', pic)
    }
}

const mutations = {
    setMenu : (state, menu) => (state.menuPictures = menu),
    setRestaurant : (state, restoPics) => (state.restaurantPictures = restoPics),
    setUploadedPics : (state, pics) => state.uploadedFiles = pics,
    addUploadedPics : (state, pics) => state.uploadedFiles = state.uploadedFiles.concat(pics),
    removePic: (state, pic) => state.uploadedFiles = state.uploadedFiles.filter((pics) => pics != pic)
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}