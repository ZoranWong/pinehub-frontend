<template>
  <el-col :span="24" class="toolbar">
    <el-tabs  type = "card" v-model="tab">
      <el-tab-pane label="所有优惠券" name="all" >
      </el-tab-pane>
      <el-tab-pane label="未开始"  name="wait" >
      </el-tab-pane>
      <el-tab-pane label="进行中"  name="runing">
      </el-tab-pane>
      <el-tab-pane label="已结束"  name="end" >
      </el-tab-pane>
    </el-tabs>
  </el-col>
</template>
<script>
  export default {
    props: {
      value: {
        default: ()=> {return {};},
        type: Object
      }
    },
    data() {
      return {
        tab: "all"
      };
    },
    watch: {
      tab(tab) {
        let search = this.value;
        search['status'] = tab;
        this.$emit('search', search);
      }
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
