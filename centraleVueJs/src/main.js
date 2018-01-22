<<<<<<< HEAD
import Vue from 'vue';
import App from './App';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
=======

import Vue from 'vue'
import App from './App'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)
>>>>>>> 65eea39cab06016b16ac7911d2f508ad2bceeec7
Vue.config.productionTip = false
require('./assets/css/bootstrap.min.css')
require('./assets/css/style.css')
<<<<<<< HEAD
require('./assets/css/album.css')
             

=======
require('./assets/css/album.css')        
>>>>>>> 65eea39cab06016b16ac7911d2f508ad2bceeec7
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
