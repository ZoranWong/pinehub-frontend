import ServiceProvider from './ServiceProvider';
import VueRouter from 'vue-router';
import routes from '../routes';
export default class RouteServiceProvider extends ServiceProvider {
  constructor(vm) {
    super(vm);
  }
  register() {
    this.$vm.use(VueRouter);
    console.log(routes);
  }
}
