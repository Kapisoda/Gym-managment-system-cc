import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'
import Tabs from 'vue-tabs-component'

Vue.use(Tabs)

Vue.use(VModal)
Vue.use(VueSession)



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
