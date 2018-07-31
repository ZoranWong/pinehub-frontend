import ServiceProvider from './ServiceProvider';
import VueRouter from 'vue-router';
import routes from '../routes';
import _ from 'underscore';
export default class RouteServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    this.app.use(VueRouter);
    let routerArray = [];
    _.each(routes, function(route) {
      routerArray.push(route.getRoute());
    });
    let router = this. app.register('router',  new VueRouter({
      routes: routerArray
    }));
    let self = this;
    router.beforeEach((to, from, next) => {
      self.beforeEach(to, from, next);
    });
  }
  beforeEach(to, from, next) {
    console.log(to.path, from.path);
    next();
  }
}
