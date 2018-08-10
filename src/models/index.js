//model模块
import Account from './Account';
import OrderManage from './OrderManage';
import Menus from './Menus';
import Shops from './Shops';
import Common from './Common';
import FullReduce from './FullReduce';
import MerchandisesManage from './MerchandisesManage';

import MemberCard from './MemberCard';
import MemberManage from './MemberManage';
import PointManage from './PointManage';
import CustomerManage from './CustomerManage';
import Coupon from './Coupon';
export default class Store {
  constructor(application) {
    this.$application = application;
    this.modules = {};
    this.addModel('orderManage', OrderManage);
    this.addModel('account', Account);
    this.addModel('menus', Menus);
    this.addModel('shops', Shops);
    this.addModel('common', Common);
    this.addModel('fullReduce', FullReduce);
    this.addModel('merchandisesManage', MerchandisesManage);
    this.addModel('memberCard', MemberCard);
    this.addModel('memberManage', MemberManage);
    this.addModel('pointManage', PointManage);
    this.addModel('customerManage', CustomerManage);
    this.addModel('coupon', Coupon);
  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}
