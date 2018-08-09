<template>
<<<<<<< HEAD
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="toogleMenu" :style="scrollStyle">
=======
  <el-menu :default-active="$route.path" class="el-menus" :collapse="toogleMenu">
>>>>>>> 9c7c6c337efddb879e7c9f9c186485c1ecf4cb86
    <template v-for="(menu, index) in menus">
      <el-submenu v-if="menu.title != '首页'" :index="index+''" >
        <template slot="title">
          <el-tooltip effect="dark" :disabled="!toogleMenu" :content="menu.title" placement="right">
            <div class="tipbox">
              <i :class="menu.icon" v-if="menu.icon"></i>
            </div>
          </el-tooltip>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item @click="routeTo( menu.path + '/' +child.path, child.id )" :class="{ 'is-active': checkActive(child.id) }" v-for="(child, index) in menu.children" :index="child.id" :key="index">
          <span style="padding:0 16px;">{{child.title}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
import _ from 'underscore.string';
export default {
  name: 'MenusComponent',
  props: {
    toogleMenu: Boolean
  },
  data() {
    return {
    	scrollStyle:''
    }
  },
  computed:{
    menus() {
      return this.$store.state.menus.list;
    }
  },
  methods: {
    routeTo(path, id) {
      this.$store.state.menus.activeMenu = id;
      path = '/' + _.strip(path, '/');
      this.$command('redirect', {path: path});
    },
    checkActive(id){
      console.log(id, this.$store.state.menus.activeMenu, this.$store.state.menus.activeMenu === id);
      return false;//this.$store.state.menus.activeMenu === id;
    }
  },
  created() {
    this.scrollStyle='height:'+(window.innerHeight-36.66)+'px';
    
    console.log(this.scrollStyle);
  },
  mounted() {
    console.log('menus mounted');
  }
}
</script>
<style scoped>
	.toogle-content {
	    left: 40px !important;
	}
	.toogleNav {
	    width: 40px !important;
	}
	.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
	.el-menu--collapse {
	    width: 40px;
	}
	.el-breadcrumb {
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
	.logo{
		    width: 113px;
    background: #444;
	}
	.el-dropdown{
		float:right
	}
</style>
<style>
	.el-menu .el-submenu .el-menu-item,.el-submenu__title{
		padding:0;
		min-width: 0px;
		padding-left:10px !important;
		color: rgba(255,255,255,0.65);
	}
	.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;}
	.el-menu .el-submenu .is-active{
		background:#409EFF;
		color:rgba(255,255,255,1);
	}
	.el-menu .el-submenu .el-submenu__title:hover {
    	background: #666;
		color: rgba(255,255,255,1);
	}
	.el-menu .el-submenu .el-menu-item:focus, .el-menu-item:hover{
		background: #666 !important;
		color: rgba(255,255,255,1);
	}
	.el-menu .el-submenu div span{
		color: rgba(255,255,255,0.65);
	}
	.el-menu{
		background: #444 !important;
		border:none !important;
		overflow-x: hidden;
    overflow-y: auto;
    height:100%;
    width:132px;
	}
	aside{
		overflow: hidden;
	}
	aside .tipbox {
		width: 40px;
		height: 40px;
		line-height: 38px;
		display: inline-block;
		text-align: center;
		cursor: pointer;
	}
	.el-menu .el-submenu .is-active{
		background: #888 !important;
	}
	.el-submenu__title{
		padding:0 !important
	}
	.el-menu--popup{background: #fff !important;border-radius: 5px !important;}
</style>
