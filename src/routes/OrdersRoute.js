import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/orders/Index';
let route = new Route();
route.group('/order', {
  	'name': 'order',
  	'tag' : '订单管理',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/index', {
	  		'name': 'order-index',
	  		'component': Index,
	  		'tag': '订单管理'
	  	});
		}
});
export default route;
