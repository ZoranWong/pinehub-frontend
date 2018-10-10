import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/shops/Index';
import Closed from '../views/shops/Closed';
import Open from '../views/shops/Open';
import Create from '../views/shops/Create';
import Edit from '../views/shops/Edit';
import Orders from '@/views/orders/Index';
let route = new Route();
route.group('/project/:projectId/shops',
	{
	  	'tag': '店铺',
	  	'name': 'shops',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('', {
		  		'name': 'shops',
		  		'component': Index,
		  		'tag': '店铺管理'
		  	});
				route.addRoute('closed', {
		  		'name': 'shops-closed',
		  		'component': Closed,
		  		'tag': '关门店铺'
		  	});
				route.addRoute('open', {
		  		'name': 'shops-open',
		  		'component': Open,
		  		'tag': '营业店铺'
		  	});
	  	}
	});

	route.group('/project/:projectId/shop',
		{
		  	'tag': '店铺',
		  	'name': 'shop',
		  	'component': Layout,
		  	'uses': function(route) {
					route.addRoute('create', {
						name: 'shop-create',
						component: Create,
						tag: '项目主页'
					});
					route.addRoute(':shopId/edit', {
						name: 'shop-edit',
						component: Create,
						tag: '项目主页'
					});
					route.addRoute(':shopId/orders', {
						name: 'shop-orders',
						component: Orders,
						tag: '店铺订单'
					});
		  	}
		});
export default route;
