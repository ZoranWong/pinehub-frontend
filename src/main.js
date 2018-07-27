import Vue from 'vue';
import App from './App';
import AppServiceProvider from './providers/AppServiceProvider';
Vue.config.productionTip = false;
let appServiceProvider = new AppServiceProvider();
appServiceProvider.register();

const app = new Vue({
  render: h => h(App)
}).$mount('#app');
console.log(app);
