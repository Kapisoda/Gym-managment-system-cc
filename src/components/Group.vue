<template>
  <div>
      <a>Group</a><br>
      <a>{{name}}</a><br>
  </div>
</template>

<script>


export default {
  name: 'group',
  data () {
    return {
      object: {
        group: {
          id: ''
        }
      },
      error: false,
      name: ''
    }
  },
  created(){
    console.log('uso na Single user: = '+this.$route.params.id);
    this.object.group.id=this.$route.params.id;
    this.$http.post('https://gym-management-system-cc.herokuapp.com/api/v1/groups/show', this.object).then(response => {
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
    console.log(data.group.name);
    this.name = data.group.name;

  });
}
}
</script>

<style>

</style>
