import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store= new Vuex.Store({
state: {
    userLogin: null
},
getters: {
  userLogin: state => {
               return state.userLogin;
           }
},
mutations: {
       logIn: (state) => {
            state.userLogin = true;
        },
        logOut: (state) => {
            state.userLogin = false;
        }
      }
});
