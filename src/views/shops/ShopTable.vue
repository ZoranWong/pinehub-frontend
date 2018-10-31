<template>
  <el-table  highlight-current-row :data="shops">
    <el-table-column prop="index" label="#" width="50"></el-table-column>
    <el-table-column prop="code" label="店铺编号" min-width="100"></el-table-column>
    <el-table-column prop="boss" label="车主" min-width="180"></el-table-column>
    <el-table-column prop="address" label="地址" min-width="180"></el-table-column>
    <el-table-column prop="orderCount" label="订单数" min-width="60"></el-table-column>
    <el-table-column prop="sellAmount" label="销售金额" min-width="100"></el-table-column>
    <el-table-column prop="merchandiseCount" label="商品数" min-width="80"></el-table-column>
    <el-table-column prop="thisMonthAmount" label="本月营业额" min-width="100"></el-table-column>
    <!-- <el-table-column prop="monthSellCost" label="本月销售费用" min-width="100"></el-table-column> -->
    <el-table-column prop="lastMonthAmount" label="上月实际收入" min-width="100"></el-table-column>
    <el-table-column prop="balance" label="店铺余额" min-width="100"></el-table-column>
    <el-table-column label="操作" width="220">
      <template slot-scope="scope">
        <el-button type="success" size="mini" @click="purchaseOrders(scope.row.id)">采购单</el-button>
        <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
        <el-popover placement="top">
          <el-button type="primary" size="mini">充值记录</el-button>
          <el-button type="primary" size="mini" @click="orders(scope.row.id)">销售记录</el-button>
          <el-button slot="reference" title="更多" icon="el-icon-more" size="mini"></el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    props: {
      shops: {
        default: null,
        type: Array
      }
    },
    data() {
      return {
      };
    },
    methods:{
      purchaseOrders(shopId) {

      },
      orders(shopId) {
        let params = {
          shopId: shopId,
          projectId: this.$requestInput('projectId')
        };
        this.$router.push({name: "shop-orders", params: params});
      },
      edit(shopId) {
        let params = {
          shopId: shopId,
          projectId: this.$requestInput('projectId')
        };

        this.$router.push({
          name: "shop-edit",
          params: params
        });
      }
    }
  }
</script>
