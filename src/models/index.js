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
import Orders from './Orders';
import Customers from './Customers';
import Members from './Members';
import MemberCards from './MemberCards';
import ScoreRules from './ScoreRules';
import Materials from './Materials';
import _ from 'underscore';
export default class Store {
  constructor(application) {
    this.$application = application;
    let common = new Common(application);
    _.extend(this, common);
    this.modules = {};
    this.addModel('projects', Projects);
    this.addModel('account', Account);
    this.addModel('menus', Menus);
    this.addModel('shops', Shops);
    this.addModel('upToCutActivities', UpToCutActivities);
    this.addModel('merchandises', Merchandises);
    this.addModel('couponCards', CouponCards);
		this.addModel('categories', Categories);
    this.addModel('wechatMenus', WechatMenu);
    this.addModel('orders', Orders);
    this.addModel('bookingOrders', Orders);
    this.addModel('immediateOrders', Orders);
    this.addModel('scanPaymentOrders', Orders);
    this.addModel('customers', Customers);
    this.addModel('members', Members);
    this.addModel('memberCards', MemberCards);
    this.addModel('scoreRules', ScoreRules);
    this.addModel('material.image', Materials);
  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}
