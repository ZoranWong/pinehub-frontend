<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="100px" ref="selectFileds">
					<el-form-item prop="label" label="订单类型：">
						<el-select size="small" v-model="filters.label">
							<el-option label="请选择订单类型" value=""></el-option>
							<!--<el-option label="全部" value="5"></el-option>-->
							<el-option label="预约订单" value="0"></el-option>
							<el-option label="配送订单" value="1"></el-option>
							<el-option label="退款订单" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="status" label="订单状态：">
						<el-select size="small" v-model="filters.status">
							<el-option label="请选择订单状态" value=""></el-option>
							<!--<el-option label="全部" value="5"></el-option>-->
							<el-option label="已核销" value="0"></el-option>
							<el-option label="未核销" value="1"></el-option>
						</el-select>
					</el-form-item>
					<!--<el-form-item prop="area">
						<el-input size="small" v-model="filters.area" placeholder="区域"></el-input>
					</el-form-item>-->
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getSelectData()">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small"  @click="handleExport()">导出</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading">
				<el-table-column prop="sIndex" label="序号" width="60"></el-table-column>
				<el-table-column prop="orderNumber" label="订单编号" min-width="100"></el-table-column>
				<el-table-column prop="carNumber" label="餐车编号" min-width="100"></el-table-column>
				<el-table-column prop="orderMoney" label="订单金额" min-width="120"></el-table-column>
				<el-table-column prop="orderTime" label="订单时间" min-width="120"></el-table-column>
				<el-table-column prop="offer" label="优惠" min-width="100"></el-table-column>
				<el-table-column prop="paid" label="实付" min-width="100"></el-table-column>
				<el-table-column prop="orderContent" label="订单内容" min-width="150"></el-table-column>
				<el-table-column prop="status" label="状态" min-width="80"></el-table-column>
				<el-table-column label="操作" width="120">
					<template scope="scope">
						<el-button type="text" size="mini" icon="search" @click="handleDetail(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>
			</div>
			<!--详情界面-->
			<el-dialog :visible.sync="detailVisible" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<!--<el-tabs active-name="first">
					<el-tab-pane label="餐车管理详情" name="first"></el-tab-pane>
				</el-tabs>-->
				<el-tabs active-name="first">
					<el-tab-pane label="订单详情" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="120px">
						<el-form-item label="订单编号：">
							<span v-text="detailData.number"></span>
						</el-form-item>
						<el-form-item label="订单时间：">
							<span v-text="detailData.area"></span>
						</el-form-item>
						<el-form-item label="订单状态：">
							<span v-text="detailData.name"></span>
						</el-form-item>
						<el-form-item label="订单价格：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="优惠券种：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="实付金额：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="订单内容：">
							<el-table :data="detailData.orderData" highlight-current-row v-loading="tLoading">
								<el-table-column prop="name" label="套餐" min-width="120"></el-table-column>
								<el-table-column prop="phone" label="单价" min-width="80"></el-table-column>
								<el-table-column prop="integral" label="数量" min-width="80"></el-table-column>
								<el-table-column prop="num" label="优惠" min-width="80"></el-table-column>
								<el-table-column prop="money" label="实付" min-width="100"></el-table-column>
							</el-table>
						</el-form-item>
						<el-form-item label="餐车编号：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="餐车车主：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="联系号码：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="买家昵称：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="买家号码：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="detailVisible = false" size="small">返回</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	
	import { mapGetters } from 'vuex'
	export default {
		name: 'ddgl',
		data() {
			return {
				selectUrl: '/charge/network/merchant/merchantSelect.do', //列表查询接口
				formUrl: '/charge/network/merchant/merchantInfo.do', //表单查询接口
				saveUrl: ['/charge/network/merchant/saveInfo.do', '/charge/network/merchant/updataInfo.do'], //新增，编辑
				deleteUrl: '/charge/network/merchant/deleteInfo.do', //列表删除接口（单条）
				exportUrl: '/charge/network/merchant/export.do',
				agentUrl: '/charge/network/agent/agentCode.do',
				accountUrl: '/charge/network/agent/agentAccount.do',
				//列表查询字段
				filters: {
					pageNum: 1,
					pagesize: 10,
					label: '',
					status: ''
				},
				totalNum:1,
				selectData:[{
					id:0,
					sIndex:1,
					orderNumber:"800820123",
					carNumber:"800820123",
					orderMoney:"10",
					status:"已核销",
					orderTime:"2016 5.2",
					paid:"8.8",
					offer:"1.2",
					orderContent:"包子、馒头、大馍"
				}]
			}
		},
		mounted() {
			 
		},
		computed: {
		},
		watch: {

		},
		methods: {
			submitLnglat(){
				this.mapVisible = false
			},
			getMap(){
				var that=this;
				TMap('3JFBZ-MHTWG-KSSQJ-IZJEJ-O4F4S-P2BNX').then(qq => {
		            var map = new qq.maps.Map(document.getElementById("mapContainer"), {
		                // 地图的中心地理坐标。
		                center: new qq.maps.LatLng(31.866942, 117.282699),
		                 zoom: 13
		            });
		            qq.maps.event.addListener(map,'click',function(event) {
		            	var latLng = event.latLng ,lat = latLng.getLat().toFixed(6),lng = latLng.getLng().toFixed(6);
		            	console.log(lat)
		            	console.log(lng)
				            that.mapfilters.lng = lng
				            that.mapfilters.lat = lat
				            that.formData.longitude=latLng.getLat().toFixed(6)
				            that.formData.latitude= latLng.getLng().toFixed(6)
				    });
		        });
			}
		},
		filters: {
		},
		created() {
			
//			this.getSelectData()
//			this.getListData()
		}
	}
</script>

<style>
	#mapContainer{
	    min-width:500px;
	    min-height:500px;
	}
	.form-container .el-table td,.form-container .el-table th{
		padding:0 !important
	}
</style>