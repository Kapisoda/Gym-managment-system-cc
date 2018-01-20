<template>
  <li class="list-group-item"
            style="cursor: pointer"
            @click="selectUser" >
    {{user.first_name}} {{user.last_name}} {{user.id}}
  </li>


</template>

<script>
import EventBus from '../EventBus.js'

export default {
  data () {
    name: 'user'
    return {

    }
  },
  methods:{
    selectUser(){
      this.$router.push({ name: 'singleUser', params: { id: this.user.id }});
      //router.push({ name: 'user', params: { id: this.user.id }})
    }
  },
  created(){


  }

}
</script>

<style>

</style>
