//model模块
import Account from './Account';
import Order from './Order';
import Menus from './Menus';
import Shops from './Shops';
import Common from './Common';
import FullReduce from './FullReduce';
import Merchandise from './Merchandise';

import MemberCard from './MemberCard';
import Member from './Member';
import Score from './Score';
import Customer from './Customer';
import _ from 'underscore';
export default class Store {
  constructor(application) {
    this.$application = application;
    let common = new Common(application);
    _.extend(this, common);
    this.modules = {};
    this.addModel('order', Order);
    this.addModel('account', Account);
    this.addModel('menus', Menus);
    this.addModel('shops', Shops);
    //this.addModel('common', Common);
    this.addModel('fullReduce', FullReduce);
    this.addModel('merchandise', Merchandise);
    this.addModel('memberCard', MemberCard);

    this.addModel('memberManage', Member);
    this.addModel('score', Score);
    this.addModel('customer', Customer);

  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}
