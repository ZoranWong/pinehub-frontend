/* eslint-disable */
import Model from './Model';
import _ from 'underscore';

export default class Menus extends Model {
    constructor(application) {
        super(application);
    }

    data() {
        return {
            activeMenu: null,
            list: [{
                id: '1',
                title: '微信',
                icon: '#icon-weixin',
                routeName: 'wechat-index',
                children: [
                    //   {
                    //   id: '2' ,
                    //   title: '公众号管理',
                    //   icon: '',
                    //   routeName: 'index',
                    // },
                    {
                        id: '3',
                        title: '菜单管理',
                        icon: '',
                        routeName: 'wechat-menus'
                    },
                    // {
                    //   id: '6',
                    //   title: '自动回复',
                    //   icon: '',
                    //   routeName: 'autoReply'
                    // },{
                    //   id: '7',
                    //   title: '素材管理',
                    //   icon: '',
                    //   routeName: 'materials'
                    // }
                    {
                        id: '42',
                        title: '模板消息',
                        icon: '',
                        routeName: 'wechat-template-messages'
                    }, {
                        id: '43',
                        title: '支付管理',
                        icon: '',
                        routeName: 'payment-config'
                    }
                ]
            }, {
                id: '8',
                title: '店铺',
                icon: '#icon-shangcheng',
                routeName: 'shops',
                children: [{
                    id: '9',
                    title: '店铺管理',
                    icon: '',
                    routeName: 'shops'
                }, {
                    id: '10',
                    title: '关门店铺',
                    icon: '',
                    routeName: 'shops-closed',
                    query: {status: 2}
                }, {
                    id: '40',
                    title: '营业店铺',
                    icon: '',
                    routeName: 'shops-open',
                    query: {status: 1}
                }]
            }, {
                id: '11',
                title: '营销',
                icon: '#icon-icon_',
                routeName: 'marketing',
                children: [
                    // {
                    //   id: '12',
                    //   title: '营销中心',
                    //   icon: '',
                    //   routeName: 'marketing',
                    //   },
                    {
                        id: '13',
                        title: '满减/送',
                        icon: '',
                        routeName: 'up-to-cut',
                    },
                    {
                        id: '14',
                        title: '新品活动',
                        icon: '',
                        routeName: 'new-merchandise-activity',
                    },
                    {
                        id: '15',
                        title: '优惠券',
                        icon: 'fa fa-ticket',
                        routeName: 'coupons',
                    },
                    {
                        id: '41',
                        title: '广告投放',
                        icon: 'fa fa-ticket',
                        routeName: 'advertisements'
                    }]
            }, {
                id: '16',
                title: '商品',
                icon: '#icon-category',
                routeName: 'merchandises',
                children: [{
                    id: '17',
                    title: '商品管理',
                    icon: '',
                    routeName: 'merchandises',
                }, {
                    id: '18',
                    title: '出售中',
                    icon: '',
                    routeName: 'merchandises-selling',
                }, {
                    id: '19',
                    title: '仓库中',
                    icon: '',
                    routeName: 'merchandises-down',
                }, {
                    id: '20',
                    title: '已售罄',
                    icon: '',
                    routeName: 'merchandises-sold-out',
                }, {
                    id: '21',
                    title: '品类管理',
                    icon: '',
                    routeName: 'categories',
                }]
            }, {
                id: '22',
                title: '订单',
                icon: '#icon-dingdanguanli',
                routeName: 'orders',
                children: [{
                    id: '23',
                    title: '订单管理',
                    icon: '',
                    routeName: 'orders',
                }, {
                    id: '24',
                    title: '扫码付订单',
                    icon: '',
                    routeName: 'orders-scan-payment',
                }, {
                    id: '25',
                    title: '预定订单',
                    icon: '',
                    routeName: 'orders-booking',
                }, {
                    id: '40',
                    title: '即时订单',
                    icon: '',
                    routeName: 'orders-immediate',
                },
                    // {
                    //   id: '16',
                    //   title: '采购订单',
                    //   icon: '',
                    //   routeName: 'purchase',
                    // },{
                    //   id: '27',
                    //   title: '分销订单',
                    //   icon: '',
                    //   routeName: 'distribution',
                    // }
                ]
            }, {
                id: '28',
                title: '用户',
                icon: '#icon-drxx10',
                routeName: 'users',
                children: [{
                    id: '29',
                    title: '客户管理',
                    icon: '',
                    routeName: 'customers',
                },
                    // {
                    //   id: '30',
                    //   title: '会员卡',
                    //   icon: '',
                    //   routeName: 'memberCard',
                    // },
                    {
                        id: '31',
                        title: '会员管理',
                        icon: '',
                        routeName: 'members',
                    }, {
                        id: '32',
                        title: '积分管理',
                        icon: '',
                        routeName: 'scores',
                    }]
            }, {
                id: '33',
                title: '分销',
                icon: '#icon--',
                routeName: 'distribution',
                children: [
                    {
                        id: '34',
                        title: '分销员管理',
                        icon: '',
                        routeName: 'score/manage',
                    }, {
                        id: '35',
                        title: '订单管理',
                        icon: '',
                        routeName: 'score/manage',
                    }, {
                        id: '36',
                        title: '提现管理',
                        icon: '',
                        routeName: 'score/manage',
                    }
                ]
            }, {
                id: '37',
                title: '财务',
                icon: '#icon-fenxi',
                routeName: 'finance'
            }, {
                id: '38',
                title: '供应商',
                icon: '#icon-supplier',
                routeName: ''
            }, {
                id: '39',
                title: '物流',
                icon: '#icon-icon_wuliuguanli',
                routeName: ''
            }]
        };
    }

    computed() {
        return {
            getMenuByRouteName() {
                return (routeName) => {
                    let menu = null;
                    _.map(this.list, function (value) {
                        if (value.routeName === routeName) {
                            menu = value;
                        }
                        if (value.children) {
                            _.map(value.children, function (child) {
                                if ((child.routeName.charAt(0) === '/' && child.routeName === routeName) || ('/' + value.routeName + '/' + child.routeName) === routeName) {
                                    menu = child;
                                }
                            });
                        }
                    });
                    return menu;
                };
            }
        };
    }
}
