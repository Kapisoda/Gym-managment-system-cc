<template lang="html">
  <div class="row">
    <form class="col s12">
      <h3 class="title">Nova poruka</h3>
      <div class="row">
        <div class="input-field col s12">
          <!--<input :disabled="disabled" id="name" type="text" class="validate">
          <label class="active" for="name">Poruka</label>-->
          <textarea rows="8" cols="40" v-model="test"></textarea>
          {{test}}
        </div>
      </div>
    </form>
    <center>
      <button class="btn waves-effect waves-light teal" v-on:click="createNewNote" >Kreiraj novu poruku</button>
    </center>
  </div>

</template>

<script>
export default {
  data(){
    return{
      test: ''
    }
  },
  methods:{
    createNewNote(){}
  }
}
</script>

<style lang="css">
</style>
