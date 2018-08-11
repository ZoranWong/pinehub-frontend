import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/shops/Index';
import Closed from '../views/shops/Closed';
import Open from '../views/shops/Open';
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
				route.addRoute('/closed', {
		  		'name': 'shop-closed',
		  		'component': Closed,
		  		'tag': '关门店铺'
		  	});
				route.addRoute('/open', {
		  		'name': 'shop-open',
		  		'component': Open,
		  		'tag': '营业店铺'
		  	});
	  	}
	});
export default route;
