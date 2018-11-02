<template>
  <el-col class="sub-item">
    <el-row v-for="(sub, index) in menu.sub_button" :key="index" >
      <el-button  :class="subButtonClass(index)" @click="changeSubMenu(sub, index)" >{{sub.name}}</el-button>
    </el-row>
    <el-row  ><el-button icon="el-icon-plus" class="sub-menu-button"  @click="addSubMenu(subLength)" ref="subButton">添加子菜单</el-button></el-row>
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
            currentIndex: 0
        };
    },
    computed: {
        subLength() {
            return this.menu.sub_button ? this.menu.sub_button.length : 0;
        }
    },
    methods: {
        addSubMenu(index) {
            if(index < 5) {
                this.$emit('addSubMenu', this.mainIndex, index);
            }
        },
        changeSubMenu(sub, index) {
            this.currentIndex = index;
            this.$emit('changeSubMenu', sub);
        },
        subButtonClass(index) {
            if(index === this.currentIndex) {
                return 'sub-menu-button current-button';
            }else{
                return 'sub-menu-button';
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
  .el-button.sub-menu-button.current-button {
    color: #409EFF !important;
    border-color: #c6e2ff !important;
    background-color: #ecf5ff !important;
  }
</style>
