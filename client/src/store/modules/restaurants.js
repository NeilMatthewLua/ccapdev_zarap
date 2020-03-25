import axios from 'axios'

const state =  {
    allRestos : [], 
    currResto : null,
    allPics: [],
    //Store the fields associated with the resto / resto object
}

const getters =  {
    getAllRestos : state => state.allRestos,
    getAllPic : state => state.allPics,
    getCoverPic: state => id => state.allPics.filter(pics => pics.pictureID === id)
}

const actions =  {
    async getRestos ({commit}) {
        let res = await axios.get("http://localhost:9090/restaurants"); 

        commit('setResto', res.data); 
   },
    async getRestoQuery ({commit}, query) {
        let res = await axios.get(`http://localhost:9090/restaurants?${query}`); 
        commit('setResto', res.data);
    },
    async getPics ({commit}, arr) {
        let listPics = [];
        for (let i = 0; i < arr.length; i++) {
            let res = await axios.get(`http://localhost:9090/pictures/${arr[i].defaultPicture}`);
            listPics.push(res.data[0]);
        }
        commit('setPics', listPics);
    }
}

const mutations = {
    setResto : (state, restos) => state.allRestos = restos,
    setCurrResto : (state, resto) => state.currResto = resto,
    setPics: (state, pic) => state.allPics = pic
}

export default {
    state, 
    mutations, 
    getters, 
    actions
}