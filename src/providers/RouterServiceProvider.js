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
  	if(to.path == '/signIn') {
			sessionStorage.removeItem('user')
			sessionStorage.removeItem('appId')
		}
		if(to.path == '/Apps') {
			sessionStorage.removeItem('appId')
		}
		console.log(routes)
		let user = sessionStorage.getItem('user');
		let shop = sessionStorage.getItem('appId');
		let hasLogin =''
//		let hasLogin = routes.app.$application.store.state.hasLogin;
		if(!user && to.path != '/signIn') {
			next('/signIn')
		} else if(hasLogin && to.path != '/main' && to.path != '/signIn') {
			next('/main')
		} else {
			next()
		}
  }
}
