import ServiceProvider from './ServiceProvider';
import AccountService from '../services/http/AccountService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(vm) {
    super(vm);
  }
  register() {
      this.$vm.register('account', AccountService);
  }
}
