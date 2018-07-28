/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import TokenService from '../services/TokenService';
import SessionService from '../services/cache/SessionService';
import App from '../App';
export default class AppServiceProvider extends ServiceProvider{
  constructor() {
    super();
  }
  register() {
    this.$vm.register('session', SessionService);
    this.$vm.register('token', TokenService);
  }
  boot() {
    this.app = new Vue({
      render: h => h(App)
    }).$mount('#app');
  }
}
