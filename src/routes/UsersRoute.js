import Route from './Route';
import Layout from '@/views/common/Layout';
import Members from '@/views/users/member/Index';
import MemberCards from '@/views/users/member_card/Index';
import MemberCardCreate from '@/views/users/member_card/Create';
import MemberCardEdit from '@/views/users/member_card/Edit';
import Scores from '@/views/users/score/Index';
import Customers from '@/views/users/customer/Index';
import Rule from '@/views/users/score/Rule';
let route = new Route();
route.group('/project/:projectId/members', {
	'tag': '用户管理',
	'component': Layout,
	'uses': function(route) {
		route.addRoute('', {
			'name': 'members',
			'component': Members,
			'tag': '会员管理'
		});
	}
});
route.group('/project/:projectId/scores', {
	'tag': '用户管理',
	'component': Layout,
	'uses': function(route) {
		route.addRoute('', {
			'name': 'scores',
			'component': Scores,
			'tag': '积分管理'
		});
	}
});
route.group('/project/:projectId/customers', {
	'tag': '用户管理',
	'component': Layout,
	'uses': function(route) {
		route.addRoute('', {
			'name': 'customers',
			'component': Customers,
			'tag': '客户管理'
		});
	}
});
route.group('/project/:projectId/rule', {
	'tag': '用户管理',
	'component': Layout,
	'uses': function(route) {
		route.addRoute('create', {
			'name': 'rule-create',
			'component': Rule,
			'tag': '新建特殊积分规则'
		});
	}
});
route.group('/project/:projectId/member', {
	'tag': '用户管理',
	'component': Layout,
	'uses': function(route) {
		route.addRoute('cards', {
			'name': 'member-cards',
			'component': MemberCards,
			'tag': '会员卡管理'
		});

		route.addRoute('card/create', {
			'name': 'member-card-create',
			'component': MemberCardCreate,
			'tag': '新建会员卡'
		});

		route.addRoute('card/:memberCardId', {
			'name': 'member-card-edit',
			'component': MemberCardEdit,
			'tag': '编辑会员卡'
		});
	}
});
export default route;
