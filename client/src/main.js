import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from '../vue.config'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false
Vue.prototype.appConfig = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
