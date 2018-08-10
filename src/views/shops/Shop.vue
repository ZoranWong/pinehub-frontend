<template>
	<div class="content-scroll">
		<div class="content-box">
      <el-tabs active-name="first">
        <el-tab-pane label="店铺信息" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <el-form v-loading="isLoading" label-width="120px">
          <el-form-item label="店铺编号：">
            <span v-text="code"></span>
          </el-form-item>
          <el-form-item label="店铺地址：">
            <span v-text="address"></span>
          </el-form-item>
          <el-form-item label="店铺车主：">
            <span v-text="userName"></span>
          </el-form-item>
          <el-form-item label="联系电话：">
            <span v-text="mobile"></span>
          </el-form-item>
        </el-form>
      </div>
      <el-tabs active-name="first">
        <el-tab-pane :label="'店铺订单：(' + {orderNum} + '单')" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <el-form v-loading="ordersLoading" label-width="120px">
          <el-form-item label="" label-width="10px" >
            <el-table :data="orders" highlight-current-row v-loading="ordersLoading">
              <el-table-column prop="code" label="编号" min-width="80"></el-table-column>
              <el-table-column prop="buyer()" label="买家" min-width="100"></el-table-column>
              <el-table-column prop="merchandise()" label="商品" min-width="150"></el-table-column>
              <el-table-column prop="num" label="商品数" min-width="60"></el-table-column>
              <el-table-column prop="money" label="应付" min-width="100"></el-table-column>
              <el-table-column prop="time" label="优惠" min-width="150"></el-table-column>
              <el-table-column prop="time" label="实付" min-width="150"></el-table-column>
              <el-table-column prop="time" label="状态" min-width="150"></el-table-column>
              <el-table-column prop="time" label="支付时间" min-width="150"></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
		</div>
	</div>
</template>
<script>
export default {
		name: 'Shop',
		data() {
		    return {
		    };
		},
		computed:{
      username() {

      },
      isLoading() {
        return true;
      },
      ordersLoading() {
        return true;
      },
      orders() {
        return [];
      },
      code() {
        return '';
      },
      address() {
        return '';
      },
      mobile() {
        return '';
      },
      userName() {
        return '';
      },
      orderNum() {
        return 0;
      }
		},
		methods: {

		},
		created() {
		}
	}
</script>

<style scoped>

</style>
