import Vue from 'vue'
import Router from 'vue-router'

import session from './Session.js'

import Login from './components/Login.vue'
import Users from './components/Users.vue'
import User from './components/User.vue'
import Groups from './components/Groups.vue'
import Group from './components/Group.vue'
import SingleUser from './components/SingleUser.vue'

Vue.use(Router)

let router = new Router({ routes : [
  { path: '/login',
    name: 'login',
    components: {default: Login}
  },
  {
    path: '/users',
    name: 'users',
    components: {default: Users}
  },
  {
    path: '/user',
    name: 'user',
    components: {default: User}
  },
  {
    path: '/user/:id',
    name: 'singleUser',
    components: {default: SingleUser}
  },
  {
    path: '/groups',
    name: 'groups',
    components: {default: Groups}
  },
  {
    path: '/group',
    name: 'group',
    components: {default: Group}
  },
  /*{
    path: '*',
    redirect: {name: 'group'}}*/
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  //console.log('In before each')
  if (to.path == '/login'){
    next()
  }else if (!session.getSessionAuth_token()) {
    console.log('token does not exist')
    next({ path: '/login' })
  } else {
    console.log('token exist')
    next()
  }
})


export default router