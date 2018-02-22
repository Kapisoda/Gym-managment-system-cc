<template >
  <nav>
    <div class="nav-wrapper">

      <ul class="left hide-on-med-and-down">
        <li><router-link to="home">Home</router-link></li>
        <li><router-link to="groups">Grupe</router-link></li>
        <li><router-link to="users">Korisnici</router-link></li>
        <li><router-link to="memberships">Članarine</router-link></li>
        <li><router-link to="confirmCardUser">Čitać kartice</router-link></li>
      </ul>
      <ul class="right hide-on-med-and-down">
          <li><a v-on:click="singOut">Odjavi se</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import session from '../Session.js'
import EventBus from '../EventBus.js'
export default {
name: 'navbar',
  ready() {
    console.log('Dropdown init')
    $(document).ready(function () {
      console.log('Navbar DOM ready')
      $('.dropdown-button').dropdown({ beloworigin: true })
    })
  },
  methods: {
    singOut(){
      let areYouSure = confirm("Jeste li sigurni da se zelite odjaviti?");
      if(areYouSure){
        EventBus.$emit('checkUserLogin', false);
        session.sessionDestroy();
        this.$router.push({ path: '/login'});

      }

    }
  }
}
</script>

<style lang="css" scope>
.nav-change{
  background-color: #006666
}


</style>
