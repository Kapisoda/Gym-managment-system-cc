<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import EventBus from './EventBus.js';
import NavBar from './components/Navbar.vue'
import Users from './components/Users.vue'
import Login from './components/Login.vue'
import session from './Session.js'
import {fixedActionButton} from "vue-materialize"

export default {
  name: 'app',
  data () {
    return {
      login: false
    }
  },
  components: {
    appNavBar: NavBar,
    appUsers: Users,
    appLogin: Login,
    "fab": fixedActionButton
  },
  mounted() {
    /* EventBus.$on('checkUserLogin', (check) => {
        this.login = check;
      }); */

      this.login = session.getSessionUsername();
  },
  watch: {
    login(){

        return this.login = session.getSessionUsername();
      //return this.$store.getters.userLogin
       //this.login = window.localStorage.getItem("loging");
    }
  }
}

</script>

<style lang="scss">
@import './assets/style.scss'
</style>
