import Vue from 'vue';
import App from './App';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
require('./assets/css/bootstrap.min.css')

require('./assets/css/style.css')
require('./assets/css/album.css')
             

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
