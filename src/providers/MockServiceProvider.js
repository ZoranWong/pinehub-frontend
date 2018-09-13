/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import Shops from '../mocks/Shops';
import Projects from '../mocks/Projects';
import Coupon from '../mocks/Coupon';
import FullReduce from '../mocks/FullReduce';
import Provinces from '../mocks/Provinces';
import WechatMenus from '../mocks/WechatMenus';
import Merchandises from '../mocks/Merchandises';
import Categories from '../mocks/Categories';
/* eslint-disable */
export default class AppServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
    if(this.app.mock()) {
      this.app.register('mock', require('mockjs'));
      this.app.register('mock.shops', Shops);
      this.app.register('mock.projects', Projects);
      this.app.register('mock.coupon', Coupon);
      this.app.register('mock.fullReduce', FullReduce);
      this.app.register('mock.provinces', Provinces);
      this.app.register('mock.wechatMenus', WechatMenus);
      this.app.register('mock.merchandises', Merchandises);
      this.app.register('mock.categories', Categories);
    }
  }
  boot() {

  }
}
