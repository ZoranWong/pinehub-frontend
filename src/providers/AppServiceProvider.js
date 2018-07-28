/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import TokenService from '../services/TokenService';
import SessionService from '../services/cache/SessionService';
import Base64Service from '../services/encrypt/Base64Service';
export default class AppServiceProvider extends ServiceProvider{
  constructor(vm) {
    super(vm);
  }
  register() {
    this.$vm.register('session', SessionService);
    this.$vm.register('token', TokenService);
    this.$vm.register('base64', Base64Service);
  }
  boot() {

  }
}
