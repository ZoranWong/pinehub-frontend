import Route from './Route';
import Layout from '../views/common/Layout';
import UpToCut from '../views/marketing/up_to_cut/Index';
import PaidGift from '../views/marketing/paid_gift/Index';
import Coupons from '../views/marketing/coupon/Index';
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
		  	route.addRoute('/up_to_cut', {
		  		'name': 'up-to-cut',
		  		'component': UpToCut,
		  		'tag': '满减/送'
		  	});
		  	route.addRoute('/paid_gift', {
		  		'name': 'pay-gift',
		  		'component': PaidGift,
		  		'tag': '支付有礼'
		  	});
		  	route.addRoute('/coupons', {
		  		'name': 'coupon',
		  		'component': Coupons,
		  		'tag': '优惠券'
		  	});
	  	}
	});
export default route;
