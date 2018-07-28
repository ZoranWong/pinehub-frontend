import ServiceProvider from './ServiceProvider';
import VueRouter from 'vue-router';
import Route from '../routes/Route';
export default class RouteServiceProvider extends ServiceProvider {
  constructor() {
    super();
  }
  register() {
    this.app.use(VueRouter);
    this.route = new Route();
  }
}
