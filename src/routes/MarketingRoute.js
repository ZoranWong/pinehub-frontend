import Route from './Route';
import Layout from '../views/common/Layout';
import FullReduce from '../views/marketing/FullReduce';
import PayGift from '../views/marketing/PayGift';
import Coupon from '../views/marketing/Coupon';
import Index from '../views/marketing/Index';
let route = new Route();
route.group('/marketing',
	{
	  	'tag': '营销',
	  	'name': 'marketing',
	  	'component': Layout,
	  	'uses': function(route) {
				route.addRoute('/index', {
		  		'name': 'marketing-index',
		  		'component': Index,
		  		'tag': '营销中心'
		  	});
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
		  	route.addRoute('/coupon', {
		  		'name': 'coupon',
		  		'component': Coupon,
		  		'tag': '优惠券'
		  	});
	  	}
	});
export default route;
