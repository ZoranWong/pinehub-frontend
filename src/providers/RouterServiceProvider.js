import ServiceProvider from './ServiceProvider';
import VueRouter from 'vue-router';
import {routes, routeMap} from '../routes';
import _ from 'underscore';
export default class RouteServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    this.app.use(VueRouter);
    let routerArray = [];
    _.each(routes, function(route) {
      route = route.getRoute();
      routerArray.push(route);
    });
    let router = this. app.register('router',  new VueRouter({
      routes: routerArray
    }));
    this.app.register('routeMap', routeMap);
    let self = this;
    router.beforeEach((to, from, next) => {
      self.beforeEach(to, from, next);
    });
  }
  beforeEach(to, from, next) {
    if(this.app.instances.storeInstance.getters['account/logined']) {
      if(to.name !== 'sign-in'){
        next();
      }else{
        next(from.path);
      }
    }else if(to.name !== 'sign-in'){
      next('/signIn');
    }
    next();
  }
}
