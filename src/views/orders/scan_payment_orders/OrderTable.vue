<template>
  <div class="tab-pane">
    <el-table highlight-current-row v-loading="isLoading" class="table-header" :data="orders">
      <el-table-column label="#" prop="idx" min-width="20"></el-table-column>
      <el-table-column label="订单" >
        <template slot-scope="scope">
          订单号: {{scope.row.code}}
          <p>
            支付流水号: <span style="color:gray">{{scope.row.transactionId}}</span>
          </p>
          <p>
            支付方式: <el-tag  size="small" :class="[{'alipay-tag': scope.row.isAliPay}, {'wechatpay-tag': scope.row.isWechatPay}]"> {{ scope.row.payTypeStr}}</el-tag>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="" label="应付金额">
        <template slot-scope="scope">
          <span style="color: red;"> {{scope.row.item.totalAmount}}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="卖家" >
        <template slot-scope="scope">
          <div v-if="scope.row.item.shop">
            <p>{{scope.row.item.shop.name}}</p>
          </div>
          <div v-else-if="scope.row.item.activity">
            <p>活动：{{scope.row.item.activity.name}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="买家" >
        <template slot-scope="scope">
          <div v-if="scope.row.item.customer.nickname">
            <p>{{scope.row.item.customer.nickname}}</p>
            <p>{{scope.row.item.customer.mobile}}</p>
          </div>
          <div v-else>
            <p>匿名支付</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="下单时间"></el-table-column>
      <el-table-column prop="statusStr" label="订单状态" >
      </el-table-column>
      <el-table-column prop="" label="优惠金额" >
        <template slot-scope="scope">
          <span style="color: red;"> {{scope.row.discountAmount}} 元 </span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="合计" >
        <template slot-scope="scope">
          <span style="color: red;"> {{scope.row.paymentAmount}} 元 </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import _ from 'underscore';
import OrderDict from '../OrderDict';
export default {
  name: 'OrderTable',
  props:{
    orders: {
      default: null,
      type: Array
    }
  },
  data() {
    return _.extend({

    }, OrderDict.orderStatusDict);
  },
  computed:{
    isLoading() {
      return false;
    }
  },
  methods: {
  }
}
</script>
