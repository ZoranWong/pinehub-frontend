import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/shops/Index';
let route = new Route();
route.group('/shop',
	{
	  	'tag': '店铺',
	  	'name': 'shop',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('/index', {
		  		'name': 'shop-index',
		  		'component': Index,
		  		'tag': '店铺管理'
		  	});
	  	}
	});
export default route;
