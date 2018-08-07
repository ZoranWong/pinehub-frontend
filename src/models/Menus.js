import Model from './Model';
export default class Menus extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      list:[{
	      title: '微信',
	      icon: 'fa fa-weixin',
	      path: 'wechat',
	      children: [{
          title: '公众号管理',
          icon: '',
          path: 'manage',
	      },{
          title: '菜单管理',
          icon:'',
          path: 'menus'
        },{
          title: '自动回复',
          icon: '',
          path: 'autoReply'
        },{
          title: '素材管理',
          icon: '',
          path: 'meterials'
        }]
      },{
	      title: '店铺',
	      icon: 'fa fa-building',
	      path: 'shop',
	      children: [{
          title: '店铺管理',
          icon: '',
          path: 'manage',
	      },{
          title: '关门店铺',
          icon: '',
          path: 'closed'
        },{
          title: '营业店铺',
          icon: '',
          path: 'open'
        }]
      },{
	      title: '营销',
	      icon: 'fa fa-th-large',
	      path: 'marketing',
	      children: [
          {
            title: '营销中心',
            icon: '',
            path: 'manage',
  	      },{
          title: '满减/送',
          icon: '',
          path: 'fullReduce',
	      },{
          title: '支付有礼',
          icon: '',
          path: 'payGift',
	      },{
          title: '优惠券管理',
  	      icon: 'fa fa-ticket',
  	      path: 'tickets',
        }]
      },{
	      title: '商品',
	      icon: 'fa fa-tag',
	      path: 'merchandise',
	      children: [{
          title: '商品管理',
          icon: '',
          path: 'manage',
	      },{
          title: '出售中',
          icon: '',
          path: 'up',
	      },{
          title: '仓库中',
          icon: '',
          path: 'down',
	      },{
          title: '已售罄',
          icon: '',
          path: 'manage',
	      },{
          title: '品类管理',
          icon: '',
          path: 'category/manage',
	      }]
      },{
	      title: '订单',
	      icon: 'fa fa-file-text',
	      path: 'order',
	      children: [{
          title: '订单管理',
          icon: '',
          path: 'manage',
	      },{
          title: '线下订单',
          icon: '',
          path: 'scan',
        },{
          title: '商家订单',
          icon: '',
          path: 'seller/PUR',
        },{
          title: '采购订单',
          icon: '',
          path: 'company/PUR',
        },{
          title: '分销订单',
          icon: '',
          path: 'distribution',
        }
      ]
      },{
	      title: '用户',
	      icon: 'fa fa-users',
	      path: 'user',
	      children: [{
          title: '客户管理',
          icon: '',
          path: 'customer/manage',
	      },{
          title: '会员卡',
          icon: '',
          path: 'memberCard',
	      },{
          title: '会员管理',
          icon: '',
          path: 'member/manage',
	      },{
          title: '积分管理',
          icon: '',
          path: 'score/manage',
	      }]
      },{
        title: '分销',
        icon: 'fa fa-bullhorn',
        path: 'distribution',
        children:[
          {
            title: '分销员管理',
            icon: '',
            path: 'score/manage',
          },{
            title: '订单管理',
            icon: '',
            path: 'score/manage',
          },{
            title: '提现管理',
            icon: '',
            path: 'score/manage',
          }
        ]
      },{
        title: '财务',
        icon: 'fa fa-bar-chart',
        path: 'finance'
      },{
        title: '供应商',
        icon: 'fa fa-handshake-o',
        path: ''
      },{
        title: '物流',
        icon: 'fa fa-truck',
        path: ''
      }]
    };
  }
  computed() {
    return {
    };
  }
}
