import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DisplayRestaurant from '../views/DisplayRestaurant.vue'
import SearchResult from '../views/SearchResult.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDetail from '../views/UserDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/restaurant/:id', 
    name: 'Display Restaurant', 
    component: DisplayRestaurant
  },
  {
    path: '/searchresult',
    name: 'Search Result',
    component: SearchResult
  },
  {
    path: '/login', 
    name: 'Login', 
    component: Login
  },
  {
    path: '/register', 
    name: 'Register', 
    component: Register
  },
  {
    path: '/userdetail/:id/:menu', 
    name: 'UserDetail', 
    component: UserDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
