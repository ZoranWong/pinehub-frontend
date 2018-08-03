import Model from './Model';
export default class Menus extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      list:[
        {
<<<<<<< HEAD
        	toogleMenu: false,
					menuList: [
						{childMenus:[
							{href:"wechatManage",id:"0",menu_name:"公众号信息",parent_id:"0"}
						],href:"wechat",id:"1",menu_name:"微信管理",parent_id:"1"},
						{childMenus:[
							{href:"ccgl",id:"0",menu_name:"店铺管理",parent_id:"0"},
							{href:"ddgl",id:"0",menu_name:"订单管理",parent_id:"0"}
						],href:"zcc",id:"1",menu_name:"店铺管理",parent_id:"1"},
						{childMenus:[
							{href:"spgl",id:"0",menu_name:"商品管理",parent_id:"0"},
							{href:"plgl",id:"0",menu_name:"品类管理",parent_id:"0"}
						],href:"sc",id:"2",menu_name:"商品管理",parent_id:"2"},
						{childMenus:[
							{href:"yhq",id:"0",menu_name:"优惠券",parent_id:"0"}
						],href:"kqxt",id:"3",menu_name:"卡券管理",parent_id:"3"},
						{childMenus:[
							{href:"hygl",id:"0",menu_name:"会员管理",parent_id:"0"},
							{href:"khgl",id:"0",menu_name:"客户管理",parent_id:"0"},
							{href:"jfgl",id:"0",menu_name:"积分管理",parent_id:"0"},
							{href:"hyk",id:"0",menu_name:"会员卡",parent_id:"0"}
						],href:"yhtj",id:"4",menu_name:"用户统计",parent_id:"4"},
						{childMenus:[
							{href:"zfyl",id:"0",menu_name:"支付有礼",parent_id:"0"},
							{href:"mjs",id:"0",menu_name:"满减/送",parent_id:"0"}
						],href:"yhtj",id:"4",menu_name:"营销",parent_id:"5"}
					]
=======
          title: '',
          icon: '',
          path: '',
          children: [
            {
              title: '',
              icon: '',
              path: '',
            }
          ]
>>>>>>> ad95c99e6db9fe9030466a96436c0018e1bdd038
        }
      ]
    };
  }
  computed() {
    return {
    };
  }
}
