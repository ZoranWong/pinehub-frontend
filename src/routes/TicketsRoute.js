import Route from './Route';
import Layout from '../views/common/Layout';
import Coupon from '../views/tickets/Coupon';
let route = new Route();
route.group('/tickets', {
  'name': 'tickets',
  'tag' : '优惠券管理',
  'component': Layout,
  'uses' : function(route) {
	  	route.addRoute('/coupon', {
	  		'name': 'coupon',
	  		'component': Coupon,
	  		'tag': '优惠券'
	  	});
	}
});
export default route;
