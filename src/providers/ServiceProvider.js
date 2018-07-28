import Vue from 'vue';
export default class ServiceProvider {
  constructor() {
    this.$vm = Vue;
    this.$vm.register = function(name, service = null) {
      if(!service) {

      }else{
          this.prototype[name] = new service(this);
      }
    }
  }
  register() {

  }

  boot() {

  }
}
