import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
export default class Application {
  constructor() {
    this.$vm = Vue;
    Vue.config.productionTip = false;
    this.serviceProviders = [];
  }
  register(name, instance) {
    this.$vm[name] = this.instanceRegister(instance);
    return this.$vm[name];
  }
  instanceRegister(instance) {
    if(_.isFunction(instance)) {
      instance = new instance(this.$vm);
    }
    return instance;
  }
  registerServiceProviders() {
    let app = this;
    _.each(ServiceProviders, function(value, key) {
      let serviceProvider = app.serviceProviders[key] = app.register(key, value);
      serviceProvider.register();
    });
  }
  beforeBoot() {

  }
  boot() {
    _.each(this.serviceProviders, function(serviceProvider) {
      serviceProvider.boot();
    });
  }

  run() {
    this.beforeBoot();
    this.registerServiceProviders();
    this.boot();
    this.app = new Vue({
      render: h => h(App)
    }).$mount('#app');
  }
}
