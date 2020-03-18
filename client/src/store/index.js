import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
    async getEvents() {
      let res = await axios.get("http://localhost:3000");
      return res.data;
    }
  },
  actions: {
  },
  modules: {
  }
})
