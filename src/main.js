import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// Vue.axios.defaults.headers.common["Authorisation"] = '';
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
