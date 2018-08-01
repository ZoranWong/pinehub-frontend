import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import env from './env';
export default class Application {
  constructor() {
    this.applicationBootStartTime = Date.now();
    Vue.config.productionTip = false;
    this.version = '1.0.1';
    this.instances = {};
    this.commands = {};
    this.serviceProviders = [];
    this.config = {};
    this.exceptionHandlers = {};
    this.env = env;
  }
  json(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }
  use($class) {
    this.$vm.use($class);
  }
  registerCommand(name, command) {
    return (this.commands[name] = this.$vm.prototype[name] = new command(this));
  }
  command(command, params) {
    this.commands[command].handle(params);
  }
  instanceRegister(instance) {
    if(_.isFunction(instance)) {
      instance = new instance(this);
    }
    return instance;
  }
  registerConfig(name, config) {
    this.config[name] = config;
  }
  registerServiceProviders() {
    let app = this;
    _.each(ServiceProviders, function(value, key) {
      let serviceProvider = app.serviceProviders[key] = new value(app);
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
    this.applicationBootEndTime = Date.now();
  }

  registerException(name, exception) {
    this.exceptionHandlers[name] = new exception(this);
  }

  register(name, service = null) {
    if(!service && _.isFunction(name)) {
      return this.instances[name] = this.$vm.prototype[name] = new name(this);
    }else if(name && _.isFunction(service)){
      return  this.instances[name] = this.$vm.prototype[name] = new service(this);
    }else{
      return  this.instances[name] = this.$vm.prototype[name] = service;
    }
  }

  run() {
    this.$vm = Vue;
    Vue.use(VueAxios, axios);
    Vue.use(Vuex);
    Vue.use(ElementUI);

    let self = this;
    this.$vm.prototype['command'] = function(command, params) {
      self.command(command, params);
    }
    _.prototype.json = function(str) {
      return self.json(str);
    }
    self.registerServiceProviders();
    let store = this.instances.store;
    let router = this.instances.router;
    console.log(store);
    self.vueApp = new Vue({
      router: router,
      store: store,
      render: h => h(App),
      beforeCreate: function() {

      },
      created:() => {
        self.beforeBoot();
      },
      beforeMount:() => {
        self.boot();
      },
      mounted: () => {
        self.afterBoot();
        console.log('application boot time', self.applicationBootEndTime - self.applicationBootStartTime, 'ms');
      }
    }).$mount('#app');
  }
}
