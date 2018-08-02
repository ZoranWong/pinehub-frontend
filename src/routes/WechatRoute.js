import Route from './Route';
import Layout from '../views/common/Layout';
import WechatManage from '../views/wechat/WechatManage';
let route = new Route();
route.group('/wechat', {
  	'name': 'wechat',
  	'tag' : '公众号信息',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/wechatManage', {
	  		'name': 'wechat-manage',
	  		'component': WechatManage,
	  		'tag': '公众号列表'
	  	});
	}
});
export default route;
