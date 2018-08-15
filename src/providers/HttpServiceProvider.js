import ServiceProvider from './ServiceProvider';
import AccountService from '../services/http/AccountService';
import UriService from '../services/http/UriService';
import ShopsService from '../services/http/ShopsService';
import ProjectsService from '../services/http/ProjectsService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
      this.app.axios = this.app.$vm.axios.create({
        headers: this.app.config['http']['headers']
      });
      this.app.register('account', AccountService);
      this.app.register('uri', UriService);
      this.app.register('shops', ShopsService);
      this.app.register('projects', ProjectsService);
  }
}
