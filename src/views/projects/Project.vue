/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<div class="project-name">
				<span>{{project.name}}</span>
				<el-button size="mini" type="primary" @click="">公众号</el-button>
				<el-button size="mini" @click="">小程序</el-button>
			</div>
	  		<div class="project-info">
	  			<div>
						<p>店铺</p>
	  				<p>{{project.shopCount}}</p>
	  			</div>
	  			<div>
	  				<p>昨日订单</p>
	  				<p>{{project.orderCount}}</p>
	  			</div>
	  			<div>
	  				<p>昨日新增用户</p>
	  				<p>{{project.newUserCount}}</p>
	  			</div>
	  			<div>
	  				<p>活跃用户数</p>
	  				<p>{{project.activeUserCount}}</p>
	  			</div>
	  			<div>
	  				<p>未处理退款订单</p>
	  				<p>{{project.refundingOrderCount}}</p>
	  			</div>
			</div>
			<div class="project-features">
				<p class="project-title">常用功能</p>
		  		<div class="">
		  			<el-button size="mini" @click="">微信</el-button>
		  			<el-button size="mini" @click="">优惠券</el-button>
		  			<el-button size="mini" @click="">会员卡</el-button>
		  			<el-button size="mini" @click="">分销</el-button>
		  			<el-button size="mini" @click="">发布商品</el-button>
		  			<el-button size="mini" @click="">会员</el-button>
				</div>
			</div>
			<chart :projectId="project.id"></chart>
		</div>
	</div>
</template>
<script>
	import Chart from './SevenDaysCount'
	export default {
		name: 'Project',
		components: {
			"chart": Chart
		},
		data(){
			return {
			};
		},
		mounted () {

		},
		computed:{
			project() {
				return this.$store.state.projects.currentProject;
			}
		},
		methods:{

		},
		created(){
			let projectId = this.$requestInput('projectId');
			this.$command('GET_PROJECT_DETIAL', projectId);
		}
	}
</script>
<style scoped>
	.content-box {padding: 10px 40px;}
	.project-title{padding: 15px 0 20px 0;border-top: 1px solid gainsboro;}
	.project-features{margin-bottom: 20px;padding:10px 0}
	.project-features button{width:16.2%;height:45px}
	.project-info{margin-top: 15px;margin-bottom: 30px;border:1px solid gainsboro;padding:10px 0}
	.project-info div{display:inline-block;width:20%;text-align: center;}
	.project-info div p{margin: 10px 0;}
	.project-info div:not(:last-child){border-right:1px solid gainsboro;}
</style>
