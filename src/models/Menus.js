import Model from './Model';
import _ from 'underscore';
export default class Menus extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      activeMenu: null,
      list:[{
        id: 1,
	      title: '微信',
	      icon: 'fa fa-weixin',
	      path: 'wechat',
	      children: [{
          id: 2 ,
          title: '公众号管理',
          icon: '',
          path: 'manage',
	      },{
          id: 3,
          title: '菜单管理',
          icon:'',
          path: 'menus'
        },{
          id: 6,
          title: '自动回复',
          icon: '',
          path: 'autoReply'
        },{
          id: 7,
          title: '素材管理',
          icon: '',
          path: 'meterials'
        }]
      },{
        id: 8,
	      title: '店铺',
	      icon: 'fa fa-building',
	      path: 'shop',
	      children: [{
          id: 9,
          title: '店铺管理',
          icon: '',
          path: 'manage',
	      },{
          id: 10,
          title: '关门店铺',
          icon: '',
          path: 'closed'
        },{
          id: 40,
          title: '营业店铺',
          icon: '',
          path: 'open'
        }]
      },{
        id: 11,
	      title: '营销',
	      icon: 'fa fa-th-large',
	      path: 'marketing',
	      children: [
          {
            id: 12,
            title: '营销中心',
            icon: '',
            path: 'manage',
  	      },{
            id: 13,
            title: '满减/送',
            icon: '',
            path: 'fullReduce',
	        },{
            id: 14,
            title: '支付有礼',
            icon: '',
            path: 'payGift',
	        },{
            id: 15,
            title: '优惠券管理',
  	        icon: 'fa fa-ticket',
  	         path: 'tickets',
          }]
      },{
        id: 16,
	      title: '商品',
	      icon: 'fa fa-tag',
	      path: 'merchandise',
	      children: [{
          id: 17,
          title: '商品管理',
          icon: '',
          path: 'manage',
	      },{
          id: 18,
          title: '出售中',
          icon: '',
          path: 'up',
	      },{
          id: 19,
          title: '仓库中',
          icon: '',
          path: 'down',
	      },{
          id: 20,
          title: '已售罄',
          icon: '',
          path: 'manage',
	      },{
          id: 21,
          title: '品类管理',
          icon: '',
          path: 'category/manage',
	      }]
      },{
        id: 22,
	      title: '订单',
	      icon: 'fa fa-file-text',
	      path: 'order',
	      children: [{
          id: 23,
          title: '订单管理',
          icon: '',
          path: 'manage',
	      },{
          id: 24,
          title: '线下订单',
          icon: '',
          path: 'scan',
        },{
          id: 25,
          title: '商家订单',
          icon: '',
          path: 'seller/PUR',
        },{
          id: 16,
          title: '采购订单',
          icon: '',
          path: 'company/PUR',
        },{
          id: 27,
          title: '分销订单',
          icon: '',
          path: 'distribution',
        }
      ]
      },{
        id: 28,
	      title: '用户',
	      icon: 'fa fa-users',
	      path: 'user',
	      children: [{
          id: 29,
          title: '客户管理',
          icon: '',
          path: 'customer/manage',
	      },{
          id: 30,
          title: '会员卡',
          icon: '',
          path: 'memberCard',
	      },{
          id: 31,
          title: '会员管理',
          icon: '',
          path: 'member/manage',
	      },{
          id: 32,
          title: '积分管理',
          icon: '',
          path: 'score/manage',
	      }]
      },{
        id: 33,
        title: '分销',
        icon: 'fa fa-bullhorn',
        path: 'distribution',
        children:[
          {
            id: 34,
            title: '分销员管理',
            icon: '',
            path: 'score/manage',
          },{
            id: 35,
            title: '订单管理',
            icon: '',
            path: 'score/manage',
          },{
            id: 36,
            title: '提现管理',
            icon: '',
            path: 'score/manage',
          }
        ]
      },{
        id: 37,
        title: '财务',
        icon: 'fa fa-bar-chart',
        path: 'finance'
      },{
        id: 38,
        title: '供应商',
        icon: 'fa fa-handshake-o',
        path: ''
      },{
        id: 39,
        title: '物流',
        icon: 'fa fa-truck',
        path: ''
      }]
    };
  }
  computed() {
    return {
      getMenuByPath :(state) => (path) => {
        let menu = null;
        _.map(state.list, function(value) {
          if(value.path === path){
            menu =   value;
          }
          if(value.children){
            _.map(value.children , function(child) {
              if(('/' + value.path + '/' +child.path) === path) {
                menu =   child;
              }
            });
          }
        });
        return menu;
      }
    };
  }
}
