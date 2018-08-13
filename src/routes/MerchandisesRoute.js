import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/merchandises/Index';
let route = new Route();
route.group('/merchandise', {
  	'name': 'merchandise',
  	'tag' : '商品管理',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/index', {
	  		'name': 'merchandises-index',
	  		'component': Index,
	  		'tag': '商品管理'
	  	});
	}
});
export default route;
