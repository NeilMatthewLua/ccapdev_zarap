import Vue from 'vue'
import Vuex from 'vuex'
import reviews from './modules/reviews'
import restaurants from './modules/restaurants'
import users from './modules/users'
import pictures from './modules/pictures'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    reviews,
    restaurants,
    users,
    pictures
  }
})
