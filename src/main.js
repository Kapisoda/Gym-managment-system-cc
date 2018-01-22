import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'


Vue.use(VModal)
Vue.use(VueSession)



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
