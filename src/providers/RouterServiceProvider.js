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
      let r = route.getRoute();
      _.each(r, function(route) {
          routerArray.push(route);
      });
    });
    console.log(routerArray);
    let router = this. app.register('vue-router',  new VueRouter({
      routes: routerArray,
      mode: 'history'
    }));
    this.app.register('routeMap', routeMap);
    let self = this;
    router.beforeEach((to, from, next) => {
      self.beforeEach(to, from, next);
    });
  }
  beforeEach(to, from, next) {
    console.log(to);
    if(this.app.instances['vue-store'].getters['account/logined']) {
      let menu = this.app.instances['vue-store'].getters['menus/getMenuByRouteName'](to.name);
      this.app.instances['vue-store'].state.menus.activeMenu = menu ? menu['id'] : null;
      if(to.name !== 'sign-in'){
        next();
      }else{
        next({
          name: from.name,
          query: {
            redirect: from.fullPath
          }
          });
      }
    }else if(to.name !== 'sign-in'){
      next({
        name: 'sign-in',
        query: {
          redirect: to.fullPath
        }
      });
    }
    next();
  }
}
