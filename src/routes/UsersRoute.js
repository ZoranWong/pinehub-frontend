import Route from './Route';
import Layout from '../views/common/Layout';
import Members from '../views/users/member/Index';
import MemberCard from '../views/users/MemberCard';
import Scores from '../views/users/score/Index';
import Customers from '../views/users/customer/Index';
let route = new Route();
route.group('/users',
	{
	  	'tag': '用户管理',
	  	'name': 'users',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('/members', {
		  		'name': 'members',
		  		'component': Members,
		  		'tag': '会员管理'
		  	});
		  	route.addRoute('/memberCard', {
		  		'name': 'member-card',
		  		'component': MemberCard,
		  		'tag': '会员卡'
		  	});
		  	route.addRoute('/scores', {
		  		'name': 'scores',
		  		'component': Scores,
		  		'tag': '积分管理'
		  	});
		  	route.addRoute('/customers', {
		  		'name': 'customers',
		  		'component': Customers,
		  		'tag': '客户管理'
		  	});
	  	}
	});
export default route;
