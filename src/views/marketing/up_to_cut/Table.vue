<template>
  <el-table :data="activities" highlight-current-row>
    <el-table-column prop="index" label="#" width="50"></el-table-column>
    <el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
    <el-table-column prop="activeTime" label="有效时间" min-width="120"></el-table-column>
    <el-table-column prop="status" label="活动状态" min-width="100"></el-table-column>
    <el-table-column prop="paymentAmount" label="参与活动支付金额" min-width="100"></el-table-column>
    <el-table-column prop="orderNum" label="参与活动的订单数" min-width="100"></el-table-column>
    <el-table-column prop="userNum" label="参与活动人数" min-width="100"></el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button size="small"  :click="show(scope)" type="text">编辑</el-button> -
        <el-button size="small"  type="text" disabled>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    props: {
      activities: {
        default: null,
        type: Array
      }
    },
    data() {
      return {
      };
    },
    methods: {
      show(scope) {
        console.log(scope);
      }
    }
  }
</script>
