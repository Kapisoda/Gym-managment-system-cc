<template>
  <form enctype="text/plain">
    <div class="row">
      <center>
        <h3 class="title">Email</h3>
      </center>
    </div>
    <div class="row">
      <div class="col s12">
        <label for="subjekt">Subjekt</label>
        <input id="subjekt" type="text" class="validate" v-model="subject">
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <label class="active" for="message">Poruka</label>
        <textarea wrap="off" rows="50" cols="40" v-model="message"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
      <center>
          <button type="button" class="btn waves-effect waves-light teal" name="action" v-on:click="sendMail">Pošalji mail <i class="fa fa-envelope-o"></i></button>
      </center>
    </div>
  </div>
</form>

</template>

<script>
import session from '../Session.js'
export default {
    name: 'email',
    props:['usersForSendingMail'],
    data(){
    return {
      subject: '',
      message: '',
      error: false,
    }
  },
  methods:{
    sendMail(){

    }
  }
}

</script>

<style>
.message_text{
  height:200px;
}
</style>
