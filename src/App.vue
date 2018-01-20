<template>
  <div id="app">
      <router-link to="login">Login</router-link>
      <router-view></router-view>

  </div>
</template>

<script>
import Users from './components/Users.vue'
import Login from './components/Login.vue'
import test from './testfunkcija.js'

export default {
  name: 'app',
  data () {
    return {
      a: 0,
      b: 0,
      x: 0
    }
  },
  components: {
    appUsers: Users,
    appLogin: Login
  },
  methods: {
    foo(a,b){
      this.x=test.mno(a,b);
    }
  }
}
</script>

<style lang="scss">

</style>
