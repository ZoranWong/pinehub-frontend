import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import Vue from 'vue';
import router from "./routes";
console.log(Vue);
Vue.config.productionTip = false;

//注册通用性组件
Vue.use(VueAxios, axios);
Vue.use(Vuex);

new Vue({
  router
}).$mount('#app');
