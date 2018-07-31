export default class Service {
  constructor($application) {
    this.$application = $application;
    this.$vm = this.$application.$vm.prototype;
  }
}
