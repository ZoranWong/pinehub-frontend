<template>
    <div class="content-header">
        <div v-if="selected" :class="['menu-top',{ 'txt-center' : !toogleMenu }]">
            <div class="tipbox" @click="changeToogleMenu">
                <img v-if="toogleMenu" src="../../src/assets/icon_close.png">
                <img v-else src="../../src/assets/icon_open.png">
            </div>
        </div>
        <div v-else class="logos fl">
            <img src="../../src/assets/f-logo.png" style="width:120px;opacity: 1;margin: 0px 20px;display: inline-block;margin-top: 4px;cursor: pointer;">
        </div>
        <img src="../../src/assets/icon_switch.png" class="fr" @click="logout">
        <el-dropdown trigger="click" class="fr">
            <img class="el-dropdown-link" src="../../src/assets/icon_setting.png">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleForm()">修改密码</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <img src="../../src/assets/icon_bell.png" class="fr">
        <span class="userinfo-inner">{{ username }}</span>
    </div>
</template>
<script>
export default {
    name: 'HeaderComponent',
    props: [
        'toogleMenu',
        'selected',
    ],
    data() {
        return {
        }
    },
    computed:{
        username() {
            return '';
        }
    },
    methods: {
        logout(){

        },
        handleForm() {

        },
        changeToogleMenu(){
            this.$emit('toogle');
        }
    }
}
</script>
<style scoped>
    .content-header .menu-top{
        float:left;line-height:60px;padding-left: 5px;cursor: pointer;
    }
    .content-header img{
        width:26px;opacity: 0.65;margin:17px 5px;display: inline-block;margin-top:10px;cursor:pointer
    }
    .content-header{
        padding-right:20px;
        padding-top:5px;
        overflow: hidden;
    }
    .content-header .userinfo-inner{
        float: right;
        line-height: 47px;
        margin-right:10px;
    }
    .content-header{
        height:60px;
        border-bottom: 1px solid #e9e9e9;
        background-color: #fff;
    }
</style>
