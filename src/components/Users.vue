<template>
  <div>
      <a>Users</a>
      <ul>
     <li class="list-group-item" style="cursor: pointer;" v-for="user in users" v-on:click="seeUser(user.id)" :key="user.id">
          {{user.first_name}} /// {{user.last_name}}
        </li>

          <!-- <appUser v-for="user in users" :key="user.id" :user="user"></appUser> -->

      </ul>
  </div>
</template>

<script>
import EventBus from '../EventBus.js'
import session from '../Session.js'

import User from './User.vue'

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
  },
  methods:{
    seeUser(index){
      //EventBus.$emit('userSpec', index);
      //this.$router.push({ path: '/user'});
      this.$router.push({ name: 'singleUser', params: { id: index }});
    }
  },
  components: {
      appUser: User
    }
  }
</script>

<style>

</style>
