import Route from './Route';
import Layout from '../views/common/Layout';
import WechatIndex from '../views/wechat/Index';
import WechatMenus from '../views/wechat/menu/Index';
import CreateMenu from '../views/wechat/menu/create/Index1';
import WechatAutoReply from '../views/wechat/AutoReply';
import WechatMaterials from '../views/wechat/Materials';
let route = new Route();
route.group('/wechat', {
  	'name': 'wechat',
  	'tag' : '微信',
  	'component': Layout,
  	'uses' : function(route) {
	  	route.addRoute('/index', {
	  		'name': 'wechat-index',
	  		'component': WechatIndex,
	  		'tag': '公众号管理'
	  	});
      route.addRoute('/menus', {
	  		'name': 'wechat-menus',
	  		'component': WechatMenus,
	  		'tag': '菜单管理'
	  	});

      route.addRoute('/create/menu', {
        'name': 'create-wx-menu',
        'component': CreateMenu,
        'tag': '创建菜单'
      });

      route.addRoute('/autoReply', {
        'name': 'wechat-autoReply',
        'component': WechatAutoReply,
        'tag': '自动回复'
      });
      route.addRoute('/materials', {
        'name': 'wechat-materials',
        'component': WechatMaterials,
        'tag': '素材管理'
      });
	}
});
export default route;
