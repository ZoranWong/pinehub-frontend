import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/merchandises/CategoryManage';
let route = new Route();
route.group('/category', {
  	'name': 'category',
  	'tag' : '商品管理',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/index', {
	  		'name': 'category-index',
	  		'component': Index,
	  		'tag': '商品管理'
	  	});
	}
});
export default route;
