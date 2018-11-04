import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/shops/Index';
import Closed from '../views/shops/Closed';
import Open from '../views/shops/Open';
import Create from '../views/shops/Create';
import Edit from '../views/shops/Edit';
import Orders from '@/views/orders/Index';
let route = new Route();
route.group('/project/:projectId/shops', {
	'tag': '店铺管理',
	'component': Layout,
	'uses': function(route) {
		route.addRoute('', {
			'name': 'shops',
			'component': Index,
			'tag': '店铺列表'
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

route.group('/project/:projectId/shop', {
	'tag': '店铺管理',
	'component': Layout,
	'uses': function(route) {
			route.addRoute('create', {
				name: 'shop-menuForm',
				component: Create,
				tag: '店铺创建'
			});
			route.addRoute(':shopId/edit', {
				name: 'shop-edit',
				component: Edit,
				tag: '店铺修改'
			});
			route.addRoute(':shopId/orders', {
				name: 'shop-orders',
				component: Orders,
				tag: '店铺订单'
			});
	}
});
export default route;
