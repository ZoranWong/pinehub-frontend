//model模块
import Account from './Account';
import Order from './Order';
export default class Store {
  constructor(application) {
    this.$application = application;
    this.modules = {};
    this.addModel('order', Order);
    this.addModel('account', Account);
  }
  addModel(name, model) {
    this.modules[name] = new model(this.$application);
    this.modules[name].namespaced = true;
  }
}
