import Vue from 'vue'
import moment from 'moment'
Vue.use(require('vue-moment'));
var dateTime = {
  filteringdate(value){
    console.log('UŠO');
    if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm');
    }

  }
}
export default dateTime;
