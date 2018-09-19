<template>
  <el-col :span="24" class="toolbar">
    <el-row :gutter="0" type="flex" align="middle" class="score-header">
      <el-col :span="8">
        <p>可用积分</p>
        <p class="can-use-score">8888</p>
      </el-col>
      <el-col :span="8">
        <p>已消耗积分</p>
        <p class="used-score">8888</p>
      </el-col>
      <el-col :span="8">
        <p>保护内积分</p>
        <p class="protected-score">8888</p>
      </el-col>
    </el-row>
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
