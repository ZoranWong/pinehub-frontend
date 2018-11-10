import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
import "../static/css/font-awesome.min.css"
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
        this.mixinMethods = {};
    }
    needMock() {
        return this.config.app.mock;
    }
    use($class) {
        this.$vm.use($class);
    }
    mixin(methods) {
        this.mixinMethods = methods;
    }
    registerCommand(name, command) {
        return (this.commands[name]  = new command(this));
    }
    command(...params) {
        try{
            let command = params.shift();
            command = this.commands[command];
            command['$router'] = this.$router;
            command['$route'] = this.$route;
            return command.handle.apply(_.extend(command, this), params);
        }catch(error) {
            console.log(error);
        }
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
        let instance = null;
        if(!service && _.isFunction(name)) {
            instance = this[name] = this.instances[name]  = new name(this);
        }else if(name && _.isFunction(service)){
            instance = this[name] =  this.instances[name] = new service(this);
        }else{
            instance = this[name] =  this.instances[name]  = service;
        }

        let keys =name.split('.');
        let key = keys.length - 1;
        let tmp = [];
        tmp[keys[key]] = instance;
        while(key > 0){
            key --;
            let tmp0 = [];
            tmp0[keys[key]] = tmp;
            tmp = tmp0;
        }
        function extend(dist, src, deep) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    let value = src[key];
                    let end = !deep;
                    if(end){
                        dist[key] = value;
                        continue;
                    }else if(!dist[key]) {
                        dist[key] = [];
                    }
                    extend(dist[key], value, deep - 1);
                }
            }
        }
        extend(this.instances, tmp, keys.length - 1);
        extend(this, tmp, keys.length - 1);
        return instance;
    }

    resetForm(form) {
        form.resetFields();
    }

    $on(event, callback) {
        this.vueApp.$on(event, callback);
    }

    $off(event) {
        this.vueApp.$off(event);
    }

    $emit(event, params = null) {
        this.vueApp.$emit(event, params);
    }

    error(exception) {
        this.vueApp.$message({
            showClose: true,
            message: exception,
            type: 'error'
        });
    }

    vueMixin() {
        _.extend(this, this.mixinMethods);
        let self = this;
        this.$vm.mixin({
            data(){
                return _.extend(self.instances, {config: self.config, application: self, env: self.env, commands: self.commands});
            },
            methods: self.mixinMethods
        });
    }

    run(before = null, created = null) {
        this.$vm = Vue;
        Vue.use(VueAxios, axios);
        Vue.use(Vuex);
        Vue.use(ElementUI);
        let self = this;
        if(before && created && _.isFunction(before) && _.isFunction(created)) {
            before(this);
        }else if(!created) {
            created = before;
        }
        self.registerServiceProviders();
        let store = this.instances['vue-store'];
        let router = this.instances['vue-router'];
        this.vueMixin();
        self.vueApp = new Vue({
            router: router,
            store: store,
            render: h => h(App),
            beforeCreate(){
                self.vueApp = this;
                self.instances['vue-router'] = this.$router;
                self.instances['vue-store'] = this.$store;
                _.each(self.exceptionHandlers, function(exception, key) {
                    self.$on(key, function(message) {
                        let handler = new exception(self, self.vueApp.$message);
                        handler.handle(message);
                    });
                });
            },
            created(){
                self.beforeBoot();
            },
            beforeMount(){
                self.boot();
            },
            mounted: () => {
                self.afterBoot();
                console.log('application boot time', self.applicationBootEndTime - self.applicationBootStartTime, 'ms');
            }
        }).$mount('#app');

        if(created && _.isFunction(created)) {
            created.call(this.vueApp, self);
        }
    }
}
