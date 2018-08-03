<template>
  <div class="contentHeader">
    <div :class="['menu-top',{ 'txt-center' : !toogleMenu }]" v-if="selected">
      <div @click.active="toogleMenu = !toogleMenu;" class="tipbox">
        <img src="../../src/assets/icon_close.png" v-if="toogleMenu"/>
        <img src="../../src/assets/icon_open.png" v-else/>
      </div>
    </div>
    <div class="logos fl" v-else>
      <img src="../../src/assets/f-logo.png"style="width:120px;opacity: 1;margin: 0px 20px;display: inline-block;margin-top: 4px;cursor: pointer;" />
    </div>
    <img @click="logout" src="../../src/assets/icon_switch.png" class="fr"/>
    <el-dropdown trigger="click" class="fr">
      <img class="el-dropdown-link" src="../../src/assets/icon_setting.png"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleForm()">修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img @click="" src="../../src/assets/icon_bell.png" class="fr"/>
    <span class="userinfo-inner">{{username}}</span>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  props: {
    toogleMenu: Boolean,
    selected: Boolean
  },
  data() {
    return {
    }
  },
  computed:{
    username() {

    }
  },
  methods: {
  	logout(){
  		
  	},
    handleForm() {

    }
  }
}
</script>
<style>
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		overflow: hidden;
		}
	.container .loayout-content .left_nav{
		width: 180px;
		height:100vh;
		float:left;
		background: #001529;
		color: rgba(255,255,255,0.65);
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
	.container .loayout-content .right_content .contentHeader .menu-top{
		float:left;line-height:60px;padding-left: 5px;cursor: pointer;
	}
	.container .loayout-content .right_content .contentHeader img{
		width:26px;opacity: 0.65;margin:17px 5px;display: inline-block;margin-top:10px;cursor:pointer
	}
	.container .loayout-content .right_content .contentHeader{
		padding-right:20px;
		padding-top:5px;
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
	.container .loayout-content .left_nav .el-menu{
		background: #000c17;
		border:none !important
	}
	.container .loayout-content .left_nav .el-menu .el-submenu{
		background:#001529 ;
	}
	.container .loayout-content .left_nav .el-menu .el-submenu .el-menu-item{
		padding:0;
		min-width: 0px;
		padding-left:10px !important;
		color: rgba(255,255,255,0.65);
	}
	.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;}
	.container .loayout-content .left_nav .el-menu .el-submenu .is-active{
		background:#409EFF;
		color:rgba(255,255,255,1);
	}
	.container .loayout-content .left_nav .el-menu .el-submenu .el-submenu__title:hover {
    	background: #002243;
		color: rgba(255,255,255,1);
	}
	.container .loayout-content .left_nav .el-menu .el-submenu .el-menu-item:focus, .el-menu-item:hover{
		background: #002243;
		color: rgba(255,255,255,1);
	}
	.container .loayout-content .left_nav .el-menu .el-submenu div span{
		color: rgba(255,255,255,0.65);
	}
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
	.container .left_nav aside .tipbox {
		width: 40px;
		height: 40px;
		line-height: 38px;
		display: inline-block;
		text-align: center;
		cursor: pointer;
	}
	.el-submenu__title{
		padding:0 !important
	}
	.el-dropdown{
		float:right
	}
</style>