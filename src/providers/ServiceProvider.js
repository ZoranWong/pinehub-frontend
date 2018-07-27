import Vue from 'vue';
export default class ServiceProvider {
  constructor() {
    this.app = Vue;
    if(!this.app) {
      console.log('dddsss');
    }
    this.app.register = function(name, service) {
      this.prototype[name] = new service(this);
    }
    console.log(this.app);
  }
  register() {

  }

  boot() {

  }
}
