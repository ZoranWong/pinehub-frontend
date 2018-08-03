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
    handleForm() {

    }
  }
}
</script>
