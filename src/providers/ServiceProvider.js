export default class ServiceProvider {
  constructor(app) {
    this.app = app;
    this.$vm = app.$vm;
    this.$vm.register = function(name, service = null) {
      if(!service) {
        return this.prototype[name] = new name(app);
      }else{
        return this.prototype[name] = new service(app);
      }
    }
  }
  register() {

  }

  boot() {

  }
}
