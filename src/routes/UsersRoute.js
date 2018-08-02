import Route from './Route';
import Layout from '../views/common/Layout';
import MemberManage from '../views/users/MemberManage';
import MemberCard from '../views/users/MemberCard';
import PointManage from '../views/users/PointManage';
import CustomerManage from '../views/users/CustomerManage';
let route = new Route();
route.group('/users', 
	{
	  	'tag': '用户管理',
	  	'name': 'users',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('/memberManage', {
		  		'name': 'member-manage',
		  		'component': MemberManage,
		  		'tag': '会员管理'
		  	});
		  	route.addRoute('/memberCard', {
		  		'name': 'member-card',
		  		'component': MemberCard,
		  		'tag': '会员卡'
		  	});
		  	route.addRoute('/pointManage', {
		  		'name': 'point-manage',
		  		'component': PointManage,
		  		'tag': '积分管理'
		  	});
		  	route.addRoute('/customerManage', {
		  		'name': 'customer-manage',
		  		'component': CustomerManage,
		  		'tag': '客户管理'
		  	});
	  	}
	});
export default route;
