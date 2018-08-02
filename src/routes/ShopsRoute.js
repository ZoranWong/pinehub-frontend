import Route from './Route';
import Layout from '../views/common/Layout';
import DiningCarManage from '../views/shops/DiningCarManage';
import CategoryManage from '../views/shops/CategoryManage';
let route = new Route();
route.group('/shops', 
	{
	  	'tag': '店铺管理',
	  	'name': 'shops',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('/diningCarManage', {
		  		'name': 'diningCar-manage',
		  		'component': DiningCarManage,
		  		'tag': '餐车管理'
		  	});
		  	route.addRoute('/categoryManage', {
		  		'name': 'category-manage',
		  		'component': CategoryManage,
		  		'tag': '品类管理'
		  	});
	  	}
	});
export default route;
