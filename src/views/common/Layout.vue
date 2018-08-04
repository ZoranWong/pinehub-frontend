<template>
	<el-row class="container">
		<div class="layout-content">
			<layout-nav :toogleMenu="toogleMenu" :show="showLeftSide"></layout-nav>
			<div :class="['right_content',{ 'toogle-content' : toogleMenu }]" :style="showLeftSide?'left: 180px;':'left: 0px;'">
				<c-header @toogle="toogle" :selected = "selectedApp" :toogleMenu = "toogleMenu"></c-header>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="breadcrumb-container">
							<el-breadcrumb separator="/" class="breadcrumb-inner" v-if="selectedApp">
								<el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
									{{ tag(item.name) }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<keep-alive :include="includedComponents">
								<router-view class = "page-content" :style="pageContentStyle"></router-view>
							</keep-alive>
						</el-col>
					</div>
				</section>
			</div>
		</div>
		<reset-password></reset-password>
	</el-row>
</template>
<script>
/* eslint-disable */
    import NavComponent from '../../components/NavComponent';
	import HeaderComponent from '../../components/HeaderComponent';
	import ResetPasswordComponent from '../../components/ResetPasswordComponent';
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				toogleMenu: false,
				pageContentStyle: {
					height: document.documentElement.clientHeight - 15 + 'px',
					width: '100%'
				},
			};
		},
		components: {
			'layout-nav': NavComponent,
			'reset-password': ResetPasswordComponent,
			'c-header': HeaderComponent
		},
		computed: {
			showLeftSide() {
				return true
			},
     	selectedApp(){
				return true;
			},
			contentWight(){
				return "width:"+(document.documentElement.clientWidth - 180) + 'px'
			},
			pageContentHeight() {
				return document.documentElement.clientHeight - 158;
			},
			includedComponents() {
				return 'Index';
			},
			routeMap() {
				return this.$application.instances.routeMap;
			}
		},
		watch: {
		},
		methods: {
			toogle(){
				this.toogleMenu=!this.toogleMenu
			},
			tag(name) {
				console.log(name);
				console.log(this.routeMap[name]);
				return this.routeMap[name]['tag'];
			}
		},
		created() {
			console.log(this.$route.matched)
		},
		mounted() {

		}
	}
</script>
<style scoped>
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		overflow: hidden;
		}

	.container .toogle-content {
	    left: 40px !important;
	}
	.container .toogleNav {
	    width: 40px !important;
	}
	.right_content{
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		overflow: hidden;
	}
	.right_content .contentHeader .userinfo-inner{f
		 float: right;
    	line-height: 47px;
    	margin-right:10px;
	}
	.right_content .contentHeader .menu-top{
		float:left;line-height:60px;padding-left: 5px;cursor: pointer;
	}
	.right_content .contentHeader img{
		width:26px;opacity: 0.65;margin:17px 5px;display: inline-block;margin-top:10px;cursor:pointer
	}
	.container .loayout-content .logo {
		height: 60px;
		width:100%;
		background: #00284d;
		padding-top: 8px;
	}
	.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;}

	.container .loayout-content .logo img{
		display: inline-block; margin:0px 10%;width: 80%;line-height: 60px;
	}
	.right_content .contentHeader{
		padding-right:20px;
		padding-top:5px;
		overflow: hidden;
	}
	.right_content .contentHeader .userinfo-inner{
		 float: right;
    	line-height: 47px;
    	margin-right:10px;
	}
	.el-menu--collapse {
	    width: 40px;
	}
	.right_content .el-breadcrumb {
	    font-size: 14px;
	    line-height: 1;
	    height: 40px;
	    line-height: 40px;
	    background: #fff;
	    padding-left:10px;
	    border-bottom: 1px solid #e9e9e9;
	}
	.el-submenu__title{
		padding:0 !important
	}
	.el-dropdown{
		float:right
	}
	.container .left_nav aside .tipbox {
    width: 40px;
    height: 40px;
    line-height: 38px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
</style>
<style>
	.content-box{
		margin:16px 14px 0;
		background: #fff;
		border-radius: 6px;
	}
</style>
