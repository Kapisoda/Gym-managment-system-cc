<template>
  <div>
      <h1>Login</h1>

      <input type="text" v-model="object.admin.username" placeholder="Username"/>
      <input type="password" v-model="object.admin.password" placeholder="Password"/>
      <br />
      <p>
        {{object.admin.username}}  / {{object.admin.password}}
      </p>
        <button v-on:click="login_user()">login</button>
      </hr>
      

      <div v-if="error">
        <p>
            Pogrešno ime ili lozinka, pokušajte ponovo.
        </p>
      </div>
  </div>
</template>

<script>
import Api from '../Api.js'
import res from '../Resources.js'
import session from '../Session.js'

export default {
  name: 'login',
  data () {
    return {

      object: {
      admin : {
        username: "adminko",
        password: "asdfasdf"
      }},
      error: false

    }
  },
  methods: {
    login_user(){
    this.$http.post('https://gym-management-system-cc.herokuapp.com/api/v1/sessions/create', this.object).then(response => {
    // success callback
    this.error = false;
    return response.json();
  }, error => {
    // error callback

    if(error.status){
      console.log('error is: '+error.status);
      this.error = true;
  }

  }).then(data => {
    //obrada podataka
    if (!this.error){
      res.id=data.admin.id;
      res.username=data.admin.username;
      res.email=data.admin.email;
      res.auth_token= data.admin.auth_token;
      res.login=true;

      session.setSession(data.admin.username, data.admin.auth_token);

      this.$router.push({ path: '/users'});
    }
  });

}
  }
}
</script>

<style>

</style>
