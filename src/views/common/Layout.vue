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
									{{ item.tag }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<keep-alive :include="includedComponents">
								<router-view :style="contentBox"></router-view>
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
				contentBox: {
					height: document.documentElement.clientHeight - 158 + 'px',
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
			includedComponents() {
				return '';
			}
		},
		watch: {
		},
		methods: {
			toogle(){
				this.toogleMenu=!this.toogleMenu
			}
		},
		created() {
			
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
	.container .loayout-content .right_content{
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		overflow: hidden;
	}
	
	.container .loayout-content .right_content .contentHeader .userinfo-inner{
		 float: right;
    	line-height: 47px;
    	margin-right:10px;
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
	.container .loayout-content .right_content .contentHeader{
		height:60px;
		border-bottom: 1px solid #e9e9e9;
		background-color: #fff;
	}
	.el-menu--collapse {
	    width: 40px;
	}
	.container .loayout-content .right_content .el-breadcrumb {
	    font-size: 14px;
	    line-height: 1;
	    height: 40px;
	    line-height: 40px;
	    background: #fff;
	    padding-left:10px;
	    border-bottom: 1px solid #e9e9e9;
	}
	.container .content-box{
		margin:16px 14px 0;
		background: #fff;
		border-radius: 6px;
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
