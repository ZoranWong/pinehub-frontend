import Route from './Route';
import Layout from '../views/common/Layout';
import OrderManage from '../views/orders/OrderManage';
let route = new Route();
route.group('/orders', {
  	'name': 'orders',
  	'tag' : '订单管理',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/orderManage', {
	  		'name': 'order-manage',
	  		'component': OrderManage,
	  		'tag': '订单管理'
	  	});
		}
});
export default route;
