//model模块
import Projects from './Projects';
import Account from './Account';
import Menus from './Menus';
import Shops from './Shops';
import Common from './Common';
import Merchandises from './Merchandises';
import Categories from './Categories';
import WechatMenu from './WechatMenu';
import CouponCards from './Coupons';
import UpToCutActivities from './UpToCutActivities';
import _ from 'underscore';
export default class Store {
  constructor(application) {
    this.$application = application;
    let common = new Common(application);
    _.extend(this, common);
    this.modules = {};
    this.addModel('projects', Projects);
    // this.addModel('order', Order);
    this.addModel('account', Account);
    this.addModel('menus', Menus);
    this.addModel('shops', Shops);
    //this.addModel('common', Common);
    this.addModel('upToCutActivities', UpToCutActivities);
    this.addModel('merchandises', Merchandises);
    this.addModel('couponCards', CouponCards);
		this.addModel('categories', Categories);
    this.addModel('wechatMenus', WechatMenu);
  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}
