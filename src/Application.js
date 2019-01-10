import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import "../static/css/font-awesome.min.css";
import env from './env';
export default class Application {
    constructor($vue, axios) {
        this.$vm = $vue;
        this.$axios = axios;
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
    use(...$class) {
        this.$vm.use.apply(this.$vm, $class);
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
        let extendsData = _.extend(self.instances, {config: self.config, env: self.env, commands: self.commands});
        return {
            data(){
                return extendsData;
            },
            methods: self.mixinMethods
        }
    }
    before(callback) {
        callback.call(this);
    }

    created (callback) {
        callback.call(this.vueApp);
    }
    boot(callback) {
        this.registerServiceProviders();
        let mixin = this.vueMixin();
        callback.call(this, mixin);
        _.each(this.serviceProviders, function(serviceProvider) {
            serviceProvider.boot();
        });
    }
}
