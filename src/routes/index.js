import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/Login'
import Home from '../views/Home'
import Main from '../views/Main'
import notFound from '../views/404'
import Reload from '../views/Reload'
//用户统计
import Hygl from '../views/yhtj/Hygl'
//早餐车
import Ccgl from '../views/zcc/Ccgl'
import Ddgl from '../views/404'
import Plgl from '../views/404'
import Tcgl from '../views/404'
//首页管理
import Fxy from '../views/404'
import Jky from '../views/404'
const routes = [
    {
        path: '/login',
		component: Login,
		name: ''
    },
	{
		path: '/',
		component: Home,
		children: [{
				path: 'main',
				component: Main,
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
			}]
	},
	{
		path: '/',
		component: Home,
		name: '早餐车',
		children: [{
				path: 'ccgl',
				component: Ccgl,
				name: '餐车管理'
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
	}
	let user = JSON.parse(sessionStorage.getItem('user'));
	let hasLogin = router.app.$options.store.state.hasLogin;
	console.log(user)
//	console.log(router.app.$options.store._mutations.LOGIN)
	if(!user && to.path != '/login') {
		next('/login')
	} else if(hasLogin&&to.path != '/main' && to.path != '/login') {
		next('/main')
	} else {
		next()
	}
})
export default router