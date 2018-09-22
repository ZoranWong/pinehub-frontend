<template>
  <el-col class="sub-item">
    <el-row v-for="(sub, index) in menu.sub_button" :key="index" >
      <el-button  class="sub-menu-button" @click="subMenuClick(sub, index)" >{{sub.name}}</el-button>
    </el-row>
    <el-row  ><el-button icon="el-icon-plus" class="sub-menu-button"  @click="subMenuClick(null, subLength)" ref="subButton">添加子菜单</el-button></el-row>
  </el-col>
</template>
<script>
export default {
  props: {
    menu: {
      default: null,
      type: Object
    },
    mainIndex: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {

    };
  },
  computed: {
    subLength() {
      return this.menu.sub_button.length;
    }
  },
  methods: {
    subMenuClick(menu, index) {
      this.popover = !this.popover;
      if(!menu) {
        menu={
          name: `子菜单${index}`
        };
        this.$emit('addSubMenu', menu, this.mainIndex, index, true);
      }else{
        this.$emit('addSubMenu', menu, this.mainIndex, index, false);
      }

    }
  }
}
</script>
<style scoped>
.el-button.sub-menu-button {
    border: 0 !important;
    border-bottom: 1px solid #dcdfe6 !important;
    border-radius: 0px !important;
    margin-left: 0 !important;
    width:100% !important;
}
</style>
