<template>
  <div>
      <a>Users</a>
      <button v-on:click="showUsers='active'">Active users</button><button v-on:click="showUsers='deactive'">Deactive users</button>
      <ul>
     <li class="list-group-item" style="cursor: pointer;" v-for="user in filterActiveUsers" v-on:click="seeUser(user.id)" :key="user.id">
          {{user.first_name }} /// {{user.last_name}}
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
      users: [],
      showUsers: 'active'
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
    },
  computed: {
      filterActiveUsers(){
        let active = this.showUsers;
        return this.users.filter( function(user) {
          return user.status == active;
      })
    }
    }
  }
</script>

<style>

</style>
