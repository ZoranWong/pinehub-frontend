import Route from './Route';
import Layout from '@/views/common/Layout';
import UpToCut from '@/views/marketing/up_to_cut/Index';
import PaidGift from '@/views/marketing/paid_gift/Index';
import Coupons from '@/views/marketing/coupon/Index';
import Index from '@/views/marketing/Index';
import UpToCutCreate from '@/views/marketing/up_to_cut/UpToCutCreate';
import UpToCutUpdate from '@/views/marketing/up_to_cut/Edit';
import PaidGiftCreate from '@/views/marketing/paid_gift/PaidGiftCreate';
import CouponCreate from '@/views/marketing/coupon/CouponCreate';
import ActivityMerchandises from '@/views/marketing/new_events/ActivityMerchandises';
import Advertisements from '@/views/marketing/advertisement/Index';
import AdvertisementCreate from '@/views/marketing/advertisement/AdvertisementCreate';

let route = new Route();
route.group('/project/:projectId/marketing', {
    'tag': '营销',
    'component': Layout,
    'uses': function (route) {
        route.addRoute('', {
            'name': 'marketing',
            'component': Index,
            'tag': '营销中心'
        });
        route.addRoute('up_to_cut', {
            'name': 'up-to-cut',
            'component': UpToCut,
            'tag': '满减/送'
        });
        route.addRoute('up_to_cut/create', {
            'name': 'up-to-cut-create',
            'component': UpToCutCreate,
            'tag': '新建满减/送活动'
        });

        route.addRoute('up_to_cut/:activityId', {
            'name': 'up-to-cut-edit',
            'component': UpToCutUpdate,
            'tag': '更新满减/送活动'
        });

        route.addRoute('paid_gift', {
            'name': 'pay-gift',
            'component': PaidGift,
            'tag': '支付有礼'
        });

        route.addRoute('paid_gift/create', {
            'name': 'pay-gift-create',
            'component': PaidGiftCreate,
            'tag': '创建支付礼包'
        });

        route.addRoute('coupons', {
            'name': 'coupons',
            'component': Coupons,
            'tag': '优惠券'
        });

        route.addRoute('coupon/create', {
            'name': 'coupon-create',
            'component': CouponCreate,
            'tag': '新建优惠券'
        });

        route.addRoute('new/merchandise/activity', {
            'name': 'new-merchandise-activity',
            'component': ActivityMerchandises,
            'tag': '新品活动'
        });

        route.addRoute('advertisements', {
            'name': 'advertisements',
            'component': Advertisements,
            'tag': '广告'
        });

        route.addRoute('advertisement/create', {
            'name': 'advertisement-create',
            'component': AdvertisementCreate,
            'tag': '新建投放广告'
        });

        route.addRoute('advertisement/edit', {
            'name': 'advertisement-edit',
            'component': AdvertisementCreate,
            'tag': '更新投放广告'
        });
    }
});
export default route;
