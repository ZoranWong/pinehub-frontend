<template>
    <div v-if="show" class="nav" :class="{ 'toogle-nav': toogleMenu}">
        <div class="logo">
            <router-link :to="{name: 'project-detial', params: { projectId: projectId }}">
                <img v-if="toogleMenu" src="../../src/assets/logo_scale.png" style="width:70%;margin-top:5px">
                <img v-else src="../../src/assets/logo_white.svg">
            </router-link>
        </div>
        <aside>
            <menus :toogle-menu="toogleMenu" />
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
    },
    computed: {
        projectId() {
            return this.$router.currentRoute.query.projectId;
        }
    },
}
</script>
<style scoped>
    .nav{
        width: 120px;
        height:100vh;
        float:left;
        background: #444;
        color: rgba(255,255,255,0.65);
    }
    .toogle-nav {
        width: 40px !important;
    }
    .nav .el-menu{
        background: #000c17;
        border:none !important
    }
    .nav .el-menu .el-submenu{
        background:#001529 ;
    }
    .nav .el-menu .el-submenu .el-menu-item{
        padding:0;
        min-width: 0px;
        padding-left:10px !important;
        color: rgba(255,255,255,0.65);
    }

    .nav .el-menu .el-submenu .is-active{
        background:#409EFF;
        color:rgba(255,255,255,1);
    }
    .nav .el-menu .el-submenu .el-submenu__title:hover {
        background: #002243;
        color: rgba(255,255,255,1);
    }
    .nav .el-menu .el-submenu .el-menu-item:focus, .el-menu-item:hover{
        background: #002243;
        color: rgba(255,255,255,1);
    }
    .nav .el-menu .el-submenu div span{
        color: rgba(255,255,255,0.65);
    }
</style>
