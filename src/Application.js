import Vue from 'vue';
export default class Application {
  constructor() {
    this.$vm = Vue;
  }
  register(name, instance) {

  }
  registerServiceProviders() {

  }
  registerRoute() {
    
  }

  bootServiceProviders() {

  }
  beforeBoot() {

  }
  boot() {
    this.bootServiceProviders();
  }

  run() {

  }
}
