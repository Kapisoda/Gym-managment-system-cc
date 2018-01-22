<template>
  <div>
      <a>Users</a>
      <button v-on:click="showUsers='active'">Active users</button><button v-on:click="showUsers='deactive'">Deactive users</button>
      <hr />
      search: <input type="text" v-model="search" />
      <ul>
     <li class="list-group-item" style="cursor: pointer;" v-for="user in filterUsersSerch" v-on:click="seeUser(user.id)" :key="user.id">
          {{user.first_name }} /// {{user.last_name}}
        </li>
        <button v-on:click="show">modal</button>
          <!-- <appUser v-for="user in users" :key="user.id" :user="user"></appUser> -->
          <modal name="email">
            <appEmail></appEmail>
          </modal>
      </ul>
  </div>
</template>

<script>
import EventBus from '../EventBus.js'
import session from '../Session.js'
import Email from './Email.vue'

import User from './User.vue'

export default {
  name: 'users',
  data () {
    return {
      users: [],
      showUsers: 'active',
      search: ''
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
    },
    show () {
    this.$modal.show('email');
    },
    hide () {
    this.$modal.hide('email');
  }
  },
  components: {
      appUser: User
    },
  computed: {
    filterUsersSerch(){
      let self = this;
      return this.users.filter(function(user){
        let fullname = user.first_name+' '+user.last_name
        return fullname.toLowerCase().indexOf(self.search.toLowerCase())>=0 && user.status == self.showUsers;
      });
    }
  },
  components: {
    appEmail: Email
  }
  }
</script>

<style>

</style>
