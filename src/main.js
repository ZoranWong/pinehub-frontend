import Application from './Application';
import Vue from 'vue';
import App from './App';
const app = new Application();
app.run((self) => {
  self.vueApp = new Vue({
    data: {
      a: 0
    },
    render: h => h(App),
    beforeCreate: function() {
      self.registerServiceProviders();
    },
    created:() => {
      self.vueApp = this;
      //let vue = null;
      console.log(this['a']);
      self.beforeBoot();
    },
    beforeMount:() => {
      self.boot();
    },
    mounted: () => {
      self.afterBoot();
    }
  }).$mount('#app');
});
console.log(app);
