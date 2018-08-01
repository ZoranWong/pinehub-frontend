import ServiceProvider from './ServiceProvider';
import AccountService from '../services/http/AccountService';
import UriService from '../services/http/UriService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
      this.app.register('account', AccountService);
      this.app.register('uri', UriService);
  }
}
