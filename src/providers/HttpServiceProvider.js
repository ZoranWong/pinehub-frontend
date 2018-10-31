import ServiceProvider from './ServiceProvider';
import AccountService from '@/services/http/AccountService';
import UriService from '@/services/http/UriService';
import ShopsService from '@/services/http/ShopsService';
import ProjectsService from '@/services/http/ProjectsService';
import CouponsService from '@/services/http/CouponsService';
import UpToCutActivitiesService from '@/services/http/UpToCutActivitiesService';
import AppService from '@/services/http/AppService';
import WechatMenusService from '@/services/http/WechatMenuService';
import MerchandisesService from '@/services/http/MerchandisesService';
import CategoriesService from '@/services/http/CategoriesService';
import OrdersService from '@/services/http/OrdersService';
import CustomersService from '@/services/http/CustomersService';
import MembersService from '@/services/http/MemberService';
import MemberCardService from '@/services/http/MemberCardService';
import ScoreRulesService from '@/services/http/ScoreRulesService';
import MaterialsService from '@/services/http/MaterialsService';
import FilesService from '@/services/http/FilesService';
import RegionsService from '@/services/http/RegionsService';
import TicketsService from '@/services/http/TicketsService';
import PaidGiftActivitiesService from '@/services/http/PaidGiftActivitiesService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
      Object.defineProperty(this.app, 'axios', {
        get: () => {
          return this.app.$vm.axios.create({
            headers: this.app.config['http']['headers'],
            baseURL: this.app.config['http']['apiGateway']
          });
        }
      });

      this.app.register('uri', UriService);

      this.app.register('http.account', AccountService);
      this.app.register('http.shops', ShopsService);
      this.app.register('http.projects', ProjectsService);
      this.app.register('http.couponCards', CouponsService);
      this.app.register('http.upToCutActivities', UpToCutActivitiesService);
      this.app.register('http.app', AppService);
      this.app.register('http.wechatMenus', WechatMenusService);
      this.app.register('http.merchandises', MerchandisesService);
      this.app.register('http.categories', CategoriesService);
      this.app.register('http.orders', OrdersService);
      this.app.register('http.customers', CustomersService);
      this.app.register('http.members', MembersService);
      this.app.register('http.memberCards', MemberCardService);
      this.app.register('http.scoreRules', ScoreRulesService);
      this.app.register('http.materials', MaterialsService);
      this.app.register('http.files', FilesService);
      this.app.register('http.regions', RegionsService);
      this.app.register('http.tickets', TicketsService);
      this.app.register('http.paidGiftActivities', PaidGiftActivitiesService);
  }
}
