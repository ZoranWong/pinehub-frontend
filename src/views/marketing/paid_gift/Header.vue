<template>
  <el-col :span="24" class="toolbar">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="所有支付礼包" name="first">
      </el-tab-pane>
      <el-tab-pane label="未开始"  name="second">

      </el-tab-pane>
      <el-tab-pane label="进行中"  name="third">

      </el-tab-pane>
      <el-tab-pane label="已结束"  name="forth">

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
