<template>
	<div class="content-scroll">
		<div class="content-box" style="padding:20px 30px">
			<el-col class="menus-list">
				<el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24" v-for="(menu, index) in menus" :key="index">
					<wechat-menu :menuData = "menu"  ></wechat-menu>
				</el-col>
			</el-col>
			<paginator :totalNum = "totalNum" :service="service" :event="event" :totalPage = "totalPage" :currentPage="currentPage" :command="command" style="display: flex;"></paginator>
		</div>
	</div>
</template>

<script>
  import WechatMenu from '../../components/WechatMenuComponent';
	import Paginator from '../../components/Paginator.vue';
	import DataListCommand from '../../commands/DataListCommand';
  /* eslint-disable */
	export default {
		name: 'WechatMenus',
		components: {
			"wechat-menu": WechatMenu,
			paginator: Paginator
		},
		data() {
			return {
				service: 'http.wechatMenus',
				event: 'wechatMenus/setList',
			};
		},
		computed: {
			totalNum() {
				return this.$store.state.wechatMenus.totalNum;
			},
			totalPage() {
				return this.$store.state.wechatMenus.pageCount;
			},
			currentPage() {
				return this.$store.state.wechatMenus.currentPage;
			},
			menus() {
				console.log(this.$store.getters['wechatMenus/currentPage']);
				return this.$store.getters['wechatMenus/currentPage'];
			},
			command() {
				return DataListCommand.commandName();
			}
		}
	}
</script>

<style scoped>

</style>
