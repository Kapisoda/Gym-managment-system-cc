<template>
<div>
<appUsers></appUsers>
<hr />
<appGroups></appGroups>
</div>
</template>
<script>
import Users from './Users.vue'
import Groups from './Groups.vue'
export default {
  name: 'landing',
  data () {
    return {

    }
  },
  components: {
    appUsers: Users,
    appGroups: Groups
  }
}
</script>
<style>

</style>
