import Route from './Route';
import Layout from '../views/common/Layout';
import FullReduce from '../views/marketing/FullReduce';
import PayGift from '../views/marketing/PayGift';
let route = new Route();
route.group('/marketing', 
	{
	  	'tag': '公众号信息',
	  	'name': 'marketing',
	  	'component': Layout,
	  	'uses': function(route) {
		  	route.addRoute('/fullReduce', {
		  		'name': 'full-reduce',
		  		'component': FullReduce,
		  		'tag': '满减/送'
		  	});
		  	route.addRoute('/payGift', {
		  		'name': 'pay-gift',
		  		'component': PayGift,
		  		'tag': '支付有礼'
		  	});
	  	}
	});
export default route;
