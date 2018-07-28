export default class ServiceProvider {
  constructor(vm) {
    this.$vm = vm;
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
