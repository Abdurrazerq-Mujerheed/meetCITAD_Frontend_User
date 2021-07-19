import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '../src/API/axios.config'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import filterDate from './filters/filter'

Vue.use(VueTelInput)
Vue.use(Vuelidate)
Vue.filter('formatDate', filterDate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    let token = localStorage.getItem('UserToken')
    let expire = localStorage.getItem('tokenExpire')
    let username = store.getters.getUser.username

    if(token && username) {
      store.dispatch('fetchEvents')
      store.dispatch('fetchUserDetails', username)
    }else {
      return 
    }

    let date = new Date()
    if(token && expire < (date.getTime()/1000)) {
      store.dispatch('userSignOut')
    }
  }
}).$mount('#app')
