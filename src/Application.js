import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
import '../static/css/font-awesome.min.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
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
    return (this.commands[name]  = new command(this));
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
    this.exceptionHandlers[name] = exception;
  }

  register(name, service = null) {
    if(!service && _.isFunction(name)) {
      return this.instances[name]  = new name(this);
    }else if(name && _.isFunction(service)){
      return  this.instances[name] = new service(this);
    }else{
      return  this.instances[name]  = service;
    }
  }
  resetForm(form) {
    form.resetFields();
  }
  $on(event, callback) {
    this.vueApp.$on(event, callback);
  }
  $off(event) {

  }
  $emit(event, params = null) {
    this.vueApp.$emit(event, params);
  }
  $error(exception, params = null) {
    this.$emit(exception, params);
  }

  scroll(context) {
    context.box = document.querySelector('.content-scroll');
    if(context.box) {
      context.scrollTop = this.box.scrollTop + 20 + 'px';
    }
  }
  adapt() {
    let container = document.querySelectorAll('.form-container');
    if(container.length) {
      for(var i = 0; i < container.length; i++) {
        container[i].style.maxHeight = this.box.offsetHeight - 200 + 'px';
        container[i].scrollTop = 0;
      }
    }
  }
  dialogClose(context) {
    if(!context.box) return;
    context.box.style.overflowY = 'auto';
    context.$emit('dialogClose');
  }
  dialogOpen(context) {
    if(!context.box) {
      return;
    }
    context.box.style.overflowY = 'hidden';
    context.$emit('dialogOpen');
  }
  vueMixin() {
    let self = this;
    this.$vm.mixin({
      data(){
        return _.extend(self.instances, {config: self.config, application: self});
      },
      methods: {
        resetForm(name) {
          self.resetForm(this.$refs[name]);
        },
        command(command, params) {
          self.command(command, params);
        },
        $error(exception, params = null) {
          self.$error(exception, params);
        },
        adapt(){
          self.adapt();
        },
        scroll(){
          self.scroll(this);
        },
        dialogClose(){
          self.dialogClose(this);
        },
        dialogOpen() {
          self.dialogOpen(this);
        }
      }
    });
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
    self.registerServiceProviders();
    let store = this.instances.storeInstance;
    let router = this.instances.router;
    this.vueMixin();
    self.vueApp = new Vue({
      router: router,
      store: store,
      render: h => h(App),
      beforeCreate: function() {
        self.vueApp = this;
        _.each(self.exceptionHandlers, function(exception, key) {
          self.$on(key, function(message) {
            let handler = new exception(self, self.vueApp.$message);
            handler.handle(message);
            console.log('error');
          });
        });
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
