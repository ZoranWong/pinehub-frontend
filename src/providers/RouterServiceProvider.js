import ServiceProvider from './ServiceProvider';
import VueRouter from 'vue-router';
import routes from '../routes';
import _ from 'underscore';
export default class RouteServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    this.app.$vm.use(VueRouter);
    let routerArray = [];
    _.each(routes, function(route) {
      routerArray.push(route.getRoute());
    });
    this.router = this. app.register('router',  new VueRouter({
      routes: routerArray
    }));
    let self = this;
    this.router.beforeEach((to, from, next) => {
      self.beforeEach(to, from, next);
    });
  }
  beforeEach(to, from, next) {
    console.log(to.path, from.path, next);
    next();
  }
}
