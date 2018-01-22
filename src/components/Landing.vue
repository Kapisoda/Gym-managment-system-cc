<template>
<div>

<hr />

<tabs>
        <tab name="Users tab" >
            <appUsers></appUsers>
        </tab>
        <tab name="Groups tab" >
            <appGroups></appGroups>
        </tab>

    </tabs>
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
