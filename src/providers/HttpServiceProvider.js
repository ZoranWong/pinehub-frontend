import ServiceProvider from './ServiceProvider';
import AccountService from '../services/http/AccountService';
import UriService from '../services/http/UriService';
import ShopsService from '../services/http/ShopsService';
import ProjectsService from '../services/http/ProjectsService';
import CouponsService from '../services/http/CouponsService';
import UpToCutActivitiesService from '../services/http/UpToCutActivitiesService';
import AppService from '../services/http/AppService';
import ProvincesService from '../services/http/ProvincesService';
import WechatMenusService from '../services/http/WechatMenuService';
import MerchandisesService from '../services/http/MerchandisesService';
import CategoriesService from '../services/http/CategoriesService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
      this.app.axios = this.app.$vm.axios.create({
        headers: this.app.config['http']['headers']
      });
      this.app.register('uri', UriService);

      this.app.register('http.account', AccountService);
      this.app.register('http.shops', ShopsService);
      this.app.register('http.projects', ProjectsService);
      this.app.register('http.couponCards', CouponsService);
      this.app.register('http.upToCutActivities', UpToCutActivitiesService);
      this.app.register('http.app', AppService);
      this.app.register('http.provinces', ProvincesService);
      this.app.register('http.wechatMenus', WechatMenusService);
      this.app.register('http.merchandises', MerchandisesService);
      this.app.register('http.categories', CategoriesService);
  }
}
