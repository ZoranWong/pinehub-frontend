/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<div class="project-name">
				<span>{{project.name}}</span>
				<el-button size="mini" type="primary" @click="openAuthDialog(project, 0)" >{{!project.officalAccountAppId ? '公众号授权' : '公众号重新授权'}}</el-button>
				<el-button size="mini" @click="openMpConfigDialog(project)" >{{!project.miniProgramAppId ? '绑定小程序' : '小程序重新设置'}}</el-button>
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
			<chart :projectId="project.id"></chart>
		</div>
		<open-platform-auth :show="openPlatformAuthDialogShow" @open="openPlatformAuthDialogShow=true;"
		@close="openPlatformAuthDialogShow=false;" :authUrl= "authUrl" :title="title"></open-platform-auth>
		<mp-config :project = "project" :show = "mpConfigShow" @open = "mpConfigShow=true;" @close = "mpConfigShow=false;"></mp-config>
	</div>
</template>
<script>
	import Chart from './SevenDaysCount';
	import OpenPlatformAuth from './OpenPlatformAuth';
	import MpConfig from './MPConfig';
	export default {
		name: 'Project',
		components: {
			"chart": Chart,
			'open-platform-auth': OpenPlatformAuth,
			"mp-config": MpConfig
		},
		data(){
			return {
				openPlatformAuthDialogShow: false,
				authType: 0,
				authUrl: null,
				mpConfigShow: false
			};
		},
		mounted () {
		},
		computed:{
			project() {
				return this.$store.getters['projects/currentProject'];
			},
			title() {
				switch (this.authType) {
					case 0:
						return '微信公众号授权';
						break;
					case 1:
						return '微信公众号重授权';
						break;
					case 2:
						return '微信小程序授权';
						break;
					case 3:
						return '微信小程序重授权';
						break;
					default:
						break;
				}
			}
		},
		methods:{
			openAuthDialog(project, type) {
				this.openPlatformAuthDialogShow = true;
				if(type === 0) {
					if(project.officialAccountAppId) {
						this.authType = 1;
					}else{
						this.authType = 0;
					}
					this.authUrl = project.officialAccountAuthUrl;
				}else if (type === 1) {
					if(project.miniProgramAppId) {
						this.authType = 3;
					}else{
						this.authType = 2;
					}
					this.authUrl = project.miniProgramAuthUrl;
				}
			},
			openMpConfigDialog(project) {
				this.mpConfigShow = true;
			}
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
	.project-features{margin-bottom: 20px;padding: 10px 0}
	.project-features button{width: 16.2%; height: 45px}
	.project-info{margin-top: 15px; margin-bottom: 30px; border: 1px solid gainsboro; padding: 10px 0}
	.project-info div{display: inline-block; width: 20%; text-align: center;}
	.project-info div p{margin: 10px 0;}
	.project-info div:not(:last-child){border-right: 1px solid gainsboro;}
</style>
