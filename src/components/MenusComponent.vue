<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="toogleMenu">
    <template v-for="(menu, index) in menus">
      <el-submenu v-if="menu.title != '首页'" :index="index+''">
        <template slot="title">
          <el-tooltip effect="dark" :disabled="!toogleMenu" :content="menu.title" placement="right">
            <div class="tipbox">
              <i class="menu.icon" v-v-if="menu.icon"></i>
            </div>
          </el-tooltip>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item @click="routeTo( child.path )" :class="{ 'is-active': checkActive('/' + child.path) }"   v-for="(child, index) in menu.children" :index="'/' + child.path" :key="index">
          <el-tooltip :disabled="!toogleMenu" effect="dark" :content="child.title" placement="right">
            <div class="tipbox">
              <i class="child.icon" v-if="child.icon"></i>
            </div>
          </el-tooltip>
          <span>{{child.name}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
export default {
  name: 'MenusComponent',
  data() {
    return {
      toogleMenu: false
    }
  },
  computed:{
    menus() {
      return this.$store.state.menus.list;
    }
  },
  methods: {
    routeTo(path) {

    }
  }
}
</script>
