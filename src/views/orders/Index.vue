<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-form :inline="true" :model="searchFields" label-width="100px" ref="searchFields" style="padding-top:10px">
				<el-form-item prop="orderNum" label="" label-width="0px">
					<el-select size="small" v-model="searchFields.orderNum">
						<el-option label="订单号" value="0"></el-option>
						<el-option label="外部单号" value="1"></el-option>
						<el-option label="收货人姓名" value="2"></el-option>
						<el-option label="收货人手机号" value="3"></el-option>
						<el-option label="收货人手机号后四位" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="area" label="" label-width="0px">
					<el-input size="small" v-model="searchFields.area" placeholder=""></el-input>
				</el-form-item>
				<el-form-item prop="begin_at" label="下单时间：">
					<el-date-picker v-model="searchFields.begin_at" type="date" :editable="false" placeholder=""></el-date-picker>
				</el-form-item>
				<el-form-item label="" label-width="0px">
					至
				</el-form-item>
				<el-form-item prop="end_at" label="" label-width="0px">
					<el-date-picker v-model="searchFields.end_at" type="date" :editable="false" placeholder=""></el-date-picker>
				</el-form-item>
				<el-form-item prop="name" label="商品名称">
					<el-input size="small" v-model="searchFields.name" placeholder=""></el-input>
				</el-form-item>
				<el-form-item prop="type" label="订单类型：">
					<el-select size="small" v-model="searchFields.type">
					</el-select>
				</el-form-item>
				<el-form-item prop="status" label="订单状态：">
					<el-select size="small" v-model="searchFields.status">
					</el-select>
				</el-form-item>
				<el-form-item prop="pay_type" label="付款方式：">
					<el-select size="small" v-model="searchFields.pay_type">
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button size="small" @click="resetForm()">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="getList(getInquire(searchFields))">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small"  @click="">导出</el-button>
				</el-form-item>
			</el-form>
			<el-tabs v-model="activeName" type="card">
				<el-tab-pane label="全部" name="first">
					<tabtab-pane></tabtab-pane>
				</el-tab-pane>
				<el-tab-pane label="待付款"  name="second">
					<tabtab-pane></tabtab-pane>
				</el-tab-pane>
				<el-tab-pane label="已完成"  name="third">
					<tabtab-pane></tabtab-pane>
				</el-tab-pane>
				<el-tab-pane label="已关闭"  name="forth">
					<tabtab-pane></tabtab-pane>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import OrderTabPane from '../../components/OrderTabPane.vue';
	export default {
		name: 'Orders',
		components:{
			'tab-pane': OrderTabPane
		},
		data() {
			return {
				searchFields: {

				}
			}
		},
		mounted() {

		},
		computed: {
		},
		watch: {

		},
		methods: {

		},
		created() {
//			this.getList(this.paginator)
		}
	}
</script>

<style scoped>
	.is-align-middle:not(:last-child){border-bottom:1px solid #ebeef5;}
	.is-align-middle:not(:first-child){padding-top:10px}
   .tableContent{overflow: hidden;background: #fafafa;border:1px solid #ebeef5;margin-top:10px;border-bottom:none;padding:5px;font-size:12px ;line-height: 20px;}
   .footContent{background: #FDEEEE;color: #ED5050;padding: 0 10px;height:25px;line-height: 25px;border:1px solid #f2f2f2;border-top:none}
	#mapContainer{min-width:500px;min-height:500px;}
	.form-container .el-table td,.form-container .el-table th{padding:0 !important}
	.sell-service{text-align: center;}
</style>
<style>
	/*.el-table__row td:first-child{padding:12px 0 !important}*/
	.el-table--enable-row-hover .el-table__body tr:hover>td {background-color: #fff !important; }
	.showHeader .el-table__empty-block{display: none;}
</style>
