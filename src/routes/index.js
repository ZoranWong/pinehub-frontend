import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/Login'
import Home from '../views/Home'
import Index from '../views/Index'
import Apps from '../views/Apps'
import notFound from '../views/404'
import Reload from '../views/Reload'
import Wechat from '../views/Wechat'
//用户统计
import Hygl from '../views/yhtj/Hygl'
import Khgl from '../views/yhtj/Khgl'
import Jfgl from '../views/yhtj/Jfgl'
import Hyk from '../views/yhtj/Hyk'
//早店铺
import Ccgl from '../views/zcc/Ccgl'
import Ddgl from '../views/zcc/Ddgl'
import Plgl from '../views/zcc/Plgl'
import Tcgl from '../views/404'
//首页管理
import Fxy from '../views/404'
import Jky from '../views/404'
//公众号管理
import Gzhlb from '../views/gzhgl/Gzhlb'
//卡券管理
import Yhq from '../views/kqgl/Yhq'
const routes = [
	{
		path:'/',
		component: Apps,
		name: '首页'
	},
    {
        path: '/login',
		component: Login,
		name: ''
    },
	{
		path: '/',
		component: Home,
		children: [{
				path: 'index',
				component: Index,
				name: '首页'
			},
			{
				path: '404',
				component: notFound,
				name: '404'
			},
			{
				path: 'reload',
				component: Reload,
				name: 'reload'
			},
			{
		        path: '/apps',
				component: Apps,
				name: '选择店铺'
		    },
			{
				path: 'wechat',
				component: Wechat,
				name: '微信'
			}
		]
	},
	{
		path: '/',
		component: Home,
		name: '微信管理',
		children: [{
				path: 'gzhlb',
				component: Gzhlb,
				name: '公众号信息'
			}
		]
	},
	{
		path: '/',
		component: Home,
		name: '卡券管理',
		children: [{
				path: 'Yhq',
				component: Yhq,
				name: '优惠券'
			}
		]
	},
	{
		path: '/',
		component: Home,
		name: '用户统计',
		children: [{
				path: 'hygl',
				component: Hygl,
				name: '会员管理'
			},{
				path: 'khgl',
				component: Khgl,
				name: '客户管理'
			},{
				path: 'jfgl',
				component: Jfgl,
				name: '积分管理'
			},{
				path: 'hyk',
				component: Hyk,
				name: '会员卡'
			}]
	},
	{
		path: '/',
		component: Home,
		name: '店铺',
		children: [{
				path: 'ccgl',
				component: Ccgl,
				name: '店铺管理'
			},{
				path: 'ddgl',
				component: Ddgl,
				name: '订单管理'
			},{
				path: 'plgl',
				component: Plgl,
				name: '品类管理'
			},{
				path: 'tcgl',
				component: Tcgl,
				name: '套餐管理'
			}]
	},
	{
		path: '/',
		component: Home,
		name: '首页管理',
		children: [{
				path: 'fxy',
				component: Fxy,
				name: '分析页'
			},{
				path: 'jky',
				component: Jky,
				name: '监控页'
			}]
	}
];
const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	if(to.path == '/login') {
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('shop')
		sessionStorage.removeItem('token')
	}
	let user = sessionStorage.getItem('user');
	let shop = sessionStorage.getItem('shop');
	let hasLogin = router.app.$options.store.state.hasLogin;
		if(!user && to.path != '/login') {
			next('/login')
		} else if(hasLogin && to.path != '/main' && to.path != '/login') {
			next('/main')
		} else {
			next()
		}
})
export default router