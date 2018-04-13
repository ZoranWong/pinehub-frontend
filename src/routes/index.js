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
			}]
	}
];
const router = new VueRouter({
	routes
})
//router.beforeEach((to, from, next) => {
//	if(to.path == '/login') {
//		sessionStorage.removeItem('user')
//	}
//	let user = JSON.parse(sessionStorage.getItem('user'));
//	let loaded = router.app.$options.store.getters.loaded;
//	if(!user && to.path != '/login') {
//		next('/login')
//	} else if(to.path != '/main' && to.path != '/login') {
//		next('/main')
//	} else {
//		next()
//	}
//})
export default router