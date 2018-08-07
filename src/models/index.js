//model模块
import Account from './Account';
import OrderManage from './OrderManage';
import Menus from './Menus';
import Shops from './Shops';
import Common from './Common';
import FullReduce from './FullReduce';
export default class Store {
  constructor(application) {
    this.$application = application;
    this.modules = {};
    this.addModel('OrderManage', OrderManage);
    this.addModel('account', Account);
    this.addModel('menus', Menus);
    this.addModel('shops', Shops);
    this.addModel('common', Common);
    this.addModel('FullReduce', FullReduce);
  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}
