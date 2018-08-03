<template>
  <div class="left_nav" :class="{ 'toogleNav': toogleMenu}" v-if="show">
    <div class="logo" >
      <router-link to="/apps">
        <img src="../../src/assets/logo_scale.png" v-if="toogleMenu" style="width:70%;margin-top:5px"/>
        <img src="../../src/assets/logo_white.svg" v-else/>
      </router-link>
    </div>
    <aside>
      <menus :toogleMenu="toogleMenu"></menus>
    </aside>
  </div>
</template>

<script>
import MenusComponent from './MenusComponent'
export default {
  name: 'NavComponent',
  components: {
    menus: MenusComponent
  },
  props: {
    show: Boolean,
    toogleMenu: Boolean
  }
}
</script>
<style scoped>
	.left_nav{
		width: 180px;
		height:100vh;
		float:left;
		background: #444;
		color: rgba(255,255,255,0.65);
	}
	.left_nav .el-menu{
		background: #000c17;
		border:none !important
	}
	.left_nav .el-menu .el-submenu{
		background:#001529 ;
	}
	.left_nav .el-menu .el-submenu .el-menu-item{
		padding:0;
		min-width: 0px;
		padding-left:10px !important;
		color: rgba(255,255,255,0.65);
	}
	
	.left_nav .el-menu .el-submenu .is-active{
		background:#409EFF;
		color:rgba(255,255,255,1);
	}
	.left_nav .el-menu .el-submenu .el-submenu__title:hover {
    	background: #002243;
		color: rgba(255,255,255,1);
	}
	.left_nav .el-menu .el-submenu .el-menu-item:focus, .el-menu-item:hover{
		background: #002243;
		color: rgba(255,255,255,1);
	}
	.left_nav .el-menu .el-submenu div span{
		color: rgba(255,255,255,0.65);
	}
</style>

