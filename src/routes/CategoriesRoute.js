import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/categories/Index';
let route = new Route();
route.group('/category', {
  	'name': 'category',
  	'tag' : '品类',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/index', {
	  		'name': 'category-index',
	  		'component': Index,
	  		'tag': '品类管理'
	  	});
	}
});
export default route;
