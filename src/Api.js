import Vue from 'vue'
import VueResource from 'vue-resource';
import res from './Resources.js'
import session from './Session.js'
Vue.use(VueResource);

Vue.http.interceptors.push((request, next)=>{
  console.log(session.getSessionAuth_token())
  request.headers.set('Authorization', 'Token token='+session.getSessionAuth_token()+', identifier='+session.getSessionUsername())
  request.headers.set('Content-Type', 'application/json')
  console.log(request.headers)
    next()
});
