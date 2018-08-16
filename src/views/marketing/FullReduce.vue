<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-col :span="24" class="toolbar">
				<el-tabs v-model = "activeTab" type = "card" @tab-click = "changeTab">
					<el-tab-pane label="所有促销" name="all" >
					</el-tab-pane>
					<el-tab-pane label="未开始"  name="wait" >
					</el-tab-pane>
					<el-tab-pane label="进行中"  name="runing">
					</el-tab-pane>
					<el-tab-pane label="已结束"  name="end" >
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	export default {
		name: 'FullReduce',
		data() {
			let self=this;
			return {
				activeTab: 'all',
				search: {
					type: 0
				}
			};
		},
		mounted() {
		},
		updated() {
			this.updatedTab();
		},
		computed: {

		},
		watch: {

		},
		methods: {
			changeTab(tab, event) {
				let currentRoute = this.$router.currentRoute;
				this.$router.push({name: currentRoute.name, query: {projectId: currentRoute.query.projectId,tab: this.activeTab}})
			},
			updatedTab() {
				let tab = this.$router.currentRoute.query['tab'];
				this.activeTab = tab ? tab : 'all';
			}
		},
		created() {
			this.updatedTab();
		},
		beforeRouteEnter (to, from, next) {
	    // 在渲染该组件的对应路由被 confirm 前调用
	    // 不！能！获取组件实例 `this`
	    // 因为当守卫执行前，组件实例还没被创建
			next();
	  },
	  beforeRouteUpdate (to, from, next) {
	    // 在当前路由改变，但是该组件被复用时调用
	    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	    // 可以访问组件实例 `this`
		  this.updatedTab();
			next();
	  },
	  beforeRouteLeave (to, from, next) {
	    // 导航离开该组件的对应路由时调用
	    // 可以访问组件实例 `this`
			next();
	  }
	}
</script>

<style scoped>
	.prompt{color:gray;font-size: 12px;margin-left: 120px;}
	#mapContainer{
	    min-width:500px;
	    min-height:500px;
	}
</style>
<style>
	.el-input-group__prepend{padding:0 5px !important}
</style>
