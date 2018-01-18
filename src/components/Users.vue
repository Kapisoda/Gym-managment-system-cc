<template>
  <div>
      <a>Users</a>
      <ul>
        <li v-for="user in users">
          {{user.first_name}} {{user.last_name}}
        </li>
      </ul>
  </div>
</template>

<script>
import session from '../Session.js'

export default {
  name: 'users',
  data () {
    return {
      users: []
    }
  },
  created(){
    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/users/index').then(response => {
    // success callback
    return response.json();
  }, error => {
    // error callback
    console.log('users nije prošlo');

  }).then(data => {
    //obrada podataka
    this.users= data.users;
  });
}
}
</script>

<style>

</style>
