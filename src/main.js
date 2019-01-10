import Vue from 'vue'
import axios from 'axios';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import App from './App.vue'
import Application from './Application';
import VueResize from 'vue-resize';
import './plugins/element.js'

Vue.config.productionTip = false
const app = new Application(Vue, axios);
app.before(function () {
    this.use(VueRouter);
    this.use(Vuex);
    this.use(VueResize);
    this.use(VueAxios, axios);
    this.$vuex = Vuex;
});
app.boot(function (mixins) {
    Vue.mixin(mixins);
    const vue = new Vue({
        store: this['vue-store'],
        router: this['vue-router'],
        render: h => h(App)
    }).$mount('#app');
    app.vueApp = vue;
});

app.created(function () {
    this.$command('GET_PUBLIC_KEY');
});
