import Vue from 'vue'
import Vuex from 'vuex'
import reviews from './modules/reviews'
import restaurants from './modules/restaurants'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    reviews,
    restaurants
  }
})
