<template>
  <el-col :span="24" class="toolbar">
    <el-tabs  type = "card">
      <el-tab-pane label="所有促销" name="all" >
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
    props: ['search'],
    data() {
      return {
      };
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
