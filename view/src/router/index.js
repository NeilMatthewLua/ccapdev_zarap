import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DisplayRestaurant from '../views/DisplayRestaurant.vue'
import SearchResult from '../views/SearchResult.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDetail from '../views/UserDetail.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/restaurant/:id', 
    name: 'Display Restaurant', 
    component: DisplayRestaurant,
    meta: { title: 'Restaurant Page' }
  },
  {
    path: '/searchresult',
    name: 'Search Result',
    component: SearchResult,
    meta: { title: 'Search Result' }
  },
  {
    path: '/login', 
    name: 'Login', 
    component: Login,
    meta: { title: 'Login' }
  },
  {
    path: '/register', 
    name: 'Register', 
    component: Register,
    meta: { title: 'Register' }
  },
  {
    path: '/userdetail/:id/:menu', 
    name: 'UserDetail', 
    component: UserDetail,
    meta: { title: 'User Detail' }
  },
  {
    path: '/about', 
    name: 'About', 
    component: About,
    meta: { title: 'About' } 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
