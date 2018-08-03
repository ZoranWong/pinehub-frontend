import Model from './Model';
export default class Menus extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      list:[{
	      title: '微信管理',
	      icon: '',
	      path: 'wechat',
	      children: [{
          title: '公众号信息',
          icon: '',
          path: 'wechatManage',
	      }]
      },{
	      title: '店铺管理',
	      icon: '',
	      path: 'shops',
	      children: [{
          title: '早餐车管理',
          icon: '',
          path: 'diningCarManage',
	      }]
      },{
	      title: '营销管理',
	      icon: '',
	      path: 'marketing',
	      children: [{
          title: '满减/送',
          icon: '',
          path: 'fullReduce',
	      },{
          title: '支付有礼',
          icon: '',
          path: 'payGift',
	      }]
      },{
	      title: '商品管理',
	      icon: '',
	      path: 'merchandises',
	      children: [{
          title: '商品管理',
          icon: '',
          path: 'merchandisesManage',
	      }]
      },{
	      title: '订单管理',
	      icon: '',
	      path: 'orders',
	      children: [{
          title: '订单管理',
          icon: '',
          path: 'orderManage',
	      }]
      },{
	      title: '优惠券管理',
	      icon: '',
	      path: 'tickets',
	      children: [{
          title: '优惠券',
          icon: '',
          path: 'coupon',
	      }]
      },{
	      title: '用户管理',
	      icon: '',
	      path: 'users',
	      children: [{
          title: '客户管理',
          icon: '',
          path: 'customerManage',
	      },{
          title: '会员卡',
          icon: '',
          path: 'memberCard',
	      },{
          title: '会员管理',
          icon: '',
          path: 'memberManage',
	      },{
          title: '积分管理',
          icon: '',
          path: 'pointManage',
	      }]
      }]
    };
  }
  computed() {
    return {
    };
  }
}






