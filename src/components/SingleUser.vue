<template>
  <div>
    <p>
      <a>{{first_name}}</a><br>
      <a>{{last_name}}</a><br>
      <a>{{email}}</a><br>
      <a>{{status}}</a><br>

    </p>
  </div>
</template>

<script>
import EventBus from '../EventBus.js'

export default {

  data () {
    return {
      object: {
        user: {
          id: ''
        }
      },
      error: false,
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      status: ''
    }
  },
  methods:{

  },
  created(){
    console.log('uso na Single user: = '+this.$route.params.id);
    this.object.user.id=this.$route.params.id;
    this.$http.post('https://gym-management-system-cc.herokuapp.com/api/v1/users/show', this.object).then(response => {
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
    console.log(data.user.first_name);
    this.user_id = data.user.id;
    this.first_name = data.user.first_name;
    this.last_name = data.user.last_name;
    this.email = data.user.email;
    this.status = data.user.status;

  });
  }

}
</script>

<style>

</style>
