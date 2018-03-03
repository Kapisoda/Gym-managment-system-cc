import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'
import Tabs from 'vue-tabs-component'
import jQuery from 'jquery'
import dropdown from 'vue-my-dropdown'
import {store} from './store/store';
import vSelect from 'vue-select'
import lodash from 'lodash'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'



Vue.use(VueChartkick, { Chartkick })

Vue.prototype._ = lodash

Vue.component('v-select', vSelect)
Vue.use(Tabs)
Vue.use(VModal)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
