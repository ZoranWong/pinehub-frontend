/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<div class="project-name">
				<span>XX项目</span>
				<el-button size="mini" type="primary" @click="">公众号</el-button>
				<el-button size="mini" @click="">小程序</el-button>
			</div>
	  		<div class="project-info">
	  			<div>
	  				<p>店铺</p>
	  				<p>10</p>
	  			</div>
	  			<div>
	  				<p>昨日订单</p>
	  				<p>100</p>
	  			</div>
	  			<div>
	  				<p>昨日新增用户</p>
	  				<p>100</p>
	  			</div>
	  			<div>
	  				<p>活跃用户数</p>
	  				<p>10</p>
	  			</div>
	  			<div>
	  				<p>未处理退款订单</p>
	  				<p>110</p>
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
			<div class="project-count">
				<p class="project-title">七日销量统计</p>
		  		<div class="project-img">
		  			<IEcharts :resizable="true" :option="bar" style="width:100%; height:100%"></IEcharts>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import IEcharts from 'vue-echarts-v3'
	export default {
		name: 'Project',
		components: {
			IEcharts
		},
		data(){
			return {
	      bar: {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: [],
					},
					grid: {
						top: '10%',
						left: '3%',
						right: '3%',
					},
					color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949"],
					xAxis: {
				        type: 'category',
				        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: [820, 932, 901, 934, 1290, 1330, 320],
				        type: 'line',
								name: '上周'
				    },{
				        data: [700, 1032, 601, 534, 1090, 330, 1320],
				        type: 'line',
								name: '本周'
				    }]
					}
			};
		},
		mounted () {

		},
		computed:{

		},
		methods:{

		},
		created(){
		}
	}
</script>
<style scoped>
	.content-box {padding: 10px 40px;}
	.project-name{}
	.project-title{padding: 15px 0 20px 0;border-top: 1px solid gainsboro;}
	.project-features{margin-bottom: 20px;padding:10px 0}
	.project-features button{width:16.2%;height:45px}
	.project-count{}
	.project-info{margin-top: 15px;margin-bottom: 30px;border:1px solid gainsboro;padding:10px 0}
	.project-info div{display:inline-block;width:20%;text-align: center;}
	.project-info div p{margin: 10px 0;}
	.project-info div:not(:last-child){border-right:1px solid gainsboro;}
	.project-img{border:1px solid gainsboro;width:100%;height:400px;}
</style>
