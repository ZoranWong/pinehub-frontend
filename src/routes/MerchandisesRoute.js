import Route from './Route';
import Layout from '../views/common/Layout';
import MerchandisesManage from '../views/merchandises/MerchandisesManage';
import CategoryManage from '../views/merchandises/CategoryManage';
let route = new Route();
route.group('/merchandises', {
  	'name': 'merchandises',
  	'tag' : '商品管理',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/merchandisesManage', {
	  		'name': 'merchandises-manage',
	  		'component': MerchandisesManage,
	  		'tag': '商品管理'
	  	});
	  	route.addRoute('/categoryManage', {
	  		'name': 'category-manage',
	  		'component': CategoryManage,
	  		'tag': '品类管理'
	  	});
	}
});
export default route;
