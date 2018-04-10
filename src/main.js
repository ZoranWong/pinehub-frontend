import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import Vue from 'vue';
import router from "./routes";
import App from './App';
import store from './models';

Vue.config.productionTip = false;

//注册通用性组件
Vue.use(VueAxios, axios);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
