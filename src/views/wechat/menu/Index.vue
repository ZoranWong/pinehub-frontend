<template>
	<div class="content-scroll">
		<div class="content-box" style="padding:20px 30px">
			<el-button size="small" type="primary" icon="el-icon-plus" @click="create()" >创建菜单</el-button>
			<el-col class="menus-list">
				<el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24" v-for="(menu, index) in menus" :key="index">
					<wx-menu :menuData = "menu"  >
					</wx-menu>
				</el-col>
			</el-col>
			<paginator :totalNum = "totalNum" :service="service"
			:event="event" :totalPage = "totalPage" :search="query"
			:currentPage="currentPage" :command="command"
			:limit= "12" style="display: flex;"></paginator>
		</div>
	</div>
</template>

<script>
  import Menu from './Menu';
	import Paginator from '@/components/Paginator';
	import DataListCommand from '@/commands/DataListCommand';
  /* eslint-disable */
	export default {
		name: 'WechatMenus',
		components: {
			"wx-menu": Menu,
			"paginator": Paginator,
		},
		data() {
			return {
				service: 'http.wechatMenus',
				event: 'wechatMenus/setList',
				query: {
					page: 0,
					projectId: 0
				}
			};
		},
		created() {
			let page = this.$router.currentRoute.query.page;
			this.query.page = parseInt(!page ? 1 : page);
		},
		computed: {
			totalNum() {
				return this.$store.state.wechatMenus.totalNum;
			},
			totalPage() {
				return this.$store.state.wechatMenus.totalPage;
			},
			currentPage() {
				return this.$store.state.wechatMenus.currentPage ? this.$store.state.wechatMenus.currentPage : 15;
			},
			menus() {
				console.log(this.$store.getters['wechatMenus/currentPage']);
				return this.$store.getters['wechatMenus/currentPage'];
			},
			command() {
				return DataListCommand.commandName();
			}
		},
		methods: {
			create() {
				this.$router.push({name: 'create-wx-menu', query: { projectId: this.$router.currentRoute.query.projectId }});
			}
		}
	}
</script>
