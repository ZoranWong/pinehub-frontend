import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
export default class Application {
  constructor() {
    Vue.config.productionTip = false;
    this.version = '1.0.1';
    this.serviceProviders = [];
    this.config = {
      httpHeaders: {
        'Accept': 'json',
        'Content-type': 'application/json'
      }
    };
  }
  json(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }
  register(name, instance) {
    this.$vm[name] = this.instanceRegister(instance);
    return this.$vm[name];
  }
  instanceRegister(instance) {
    if(_.isFunction(instance)) {
      instance = new instance(this);
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

  afterBoot() {

  }

  run() {
    this.$vm = Vue;
    Vue.use(VueAxios, axios);
    Vue.use(Vuex);
    Vue.use(ElementUI);
    let self = this;
    _.prototype.json = function(str) {
      return self.json(str);
    }
    self.vueApp = new Vue({
      data: {
        a: 0
      },
      render: h => h(App),
      beforeCreate: function() {
        self.registerServiceProviders();
      },
      created:() => {
        self.beforeBoot();
      },
      beforeMount:() => {
        self.boot();
      },
      mounted: () => {
        self.afterBoot();
      }
    }).$mount('#app');
  }
}
