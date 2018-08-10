import Route from './Route';
import Layout from '../views/common/Layout';
import WechatIndex from '../views/wechat/Index';
let route = new Route();
route.group('/wechat', {
  	'name': 'wechat',
  	'tag' : '公众号信息',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/index', {
	  		'name': 'wechat-index',
	  		'component': WechatIndex,
	  		'tag': '公众号列表'
	  	});
	}
});
export default route;
