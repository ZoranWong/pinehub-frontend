import Route from './Route';
import Layout from '../views/common/Layout';
import MerchandisesManage from '../views/merchandises/MerchandisesManage';
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
	}
});
export default route;
