<template>
  <div>
      <a>Groups</a>
      <ul>
        <li class="list-group-item" style="cursor: pointer;" v-for="group in groups" v-on:click="seeGroup(group.id)" :key="group.id">
           {{group.name}}
         </li>
       </ul>
  </div>
</template>

<script>


export default {
  name: 'groups',
  data () {
    return {
      groups: null
    }
  },
  created(){
      this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/groups/index').then(response => {
      // success callback
      return response.json();
    }, error => {
      // error callback
      console.log('groups nije prošlo');
    }).then(data => {
      //obrada podataka
      console.log(data.groups);
      this.groups = data.groups;

    });
  },
  methods: {
    seeGroup(index){
      this.$router.push({ name: 'group', params: { id: index }});
    }
  }
}
</script>

<style>

</style>
