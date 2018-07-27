<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-form :inline="true" :model="filters" label-width="100px" ref="selectFileds" style="padding-top:10px">
				<el-form-item prop="orderNum" label="" label-width="0px">
					<el-select size="small" v-model="filters.orderNum">
						<el-option label="订单号" value="0"></el-option>
						<el-option label="外部单号" value="1"></el-option>
						<el-option label="收货人姓名" value="2"></el-option>
						<el-option label="收货人手机号" value="3"></el-option>
						<el-option label="收货人手机号后四位" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="area" label="" label-width="0px">
					<el-input size="small" v-model="filters.area" placeholder=""></el-input>
				</el-form-item>
				<el-form-item prop="begin_at" label="下单时间：">
					<el-date-picker v-model="filters.begin_at" type="date" :editable="false" placeholder=""></el-date-picker>
				</el-form-item>
				<el-form-item label="" label-width="0px">
					至
				</el-form-item>
				<el-form-item prop="end_at" label="" label-width="0px">
					<el-date-picker v-model="filters.end_at" type="date" :editable="false" placeholder=""></el-date-picker>
				</el-form-item>
				<el-form-item prop="name" label="商品名称">
					<el-input size="small" v-model="filters.name" placeholder=""></el-input>
				</el-form-item>
				<el-form-item prop="type" label="订单类型：">
					<el-select size="small" v-model="filters.type">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="status" label="订单状态：">
					<el-select size="small" v-model="filters.status">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item,index) in options[2]" :label="item.label" :value="item.value" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="pay_type" label="付款方式：">
					<el-select size="small" v-model="filters.pay_type">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="(item,index) in options[3]" :label="item.label" :value="item.value" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button size="small" @click="resetForm()">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="getList(getInquire(filters))">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="small"  @click="">导出</el-button>
				</el-form-item>
			</el-form>
			<el-tabs v-model="activeName" type="card">
				<el-tab-pane label="全部" name="first">
					<el-table highlight-current-row v-loading="tLoading" class="showHeader">
						<el-table-column prop="" label="商品" min-width="250"></el-table-column>
						<el-table-column prop="" label="单价/数量" min-width="80"></el-table-column>
						<el-table-column prop="" label="售后" min-width="80"></el-table-column>
						<el-table-column prop="" label="买家" min-width="80"></el-table-column>
						<el-table-column prop="" label="下单时间" min-width="80"></el-table-column>
						<el-table-column prop="" label="订单状态" min-width="80"></el-table-column>
						<el-table-column prop="" label="实付金额" min-width="80"></el-table-column>
					</el-table>
					<div v-for="(item,index) in allOrderData" :key="index">
						<div class="tableContent">
							<div style="float:left">
								<p>订单号: {{item.code}} <span style="color:gray"> {{item.pay_type=='WECHAT_PAY'?'微信安全支付':'支付宝支付'}}</span></p>
								<p> 支付流水号: <span style="color:gray">{{item.transaction_id}}</span></p>
							</div>
							<div style="float:right">备注</div>
						</div>
						<el-table :data="[item]" v-loading="tLoading" :show-header="false" border>
							<el-table-column prop="name" label="商品" min-width="330">
								<template slot-scope="scope">
									<el-row :gutter="20" type="flex" align="middle" v-for="(item,indexs) in scope.row.order_items" :key="indexs" v-if="item.merchandise_id">
									  	<el-col :span="6"><img class="x-img" :src="item.main_image" width="100%" alt=""/></el-col>
									  	<el-col :span="15">
									  		<div>{{ item.name }}</div>
									  	</el-col>
									  	<el-col :span="3">
									  		<p>{{item.sell_price + ' X ' +item.quality}}</p>
									  	</el-col>
									</el-row>
									<el-row v-else>
										<el-col :span="24">
									  		<div>到店付</div>
									  	</el-col>
									</el-row>
							    </template>
							</el-table-column>
							<el-table-column prop="orderMoney" label="售后" min-width="80" align="center">
								<template slot-scope="scope">
									<!--<p>{{item.created_at?item.created_at.date.substr(0,19):''}}</p>-->
									<!--<el-button size="small" @click="">钱款去向</el-button>-->
								</template>
							</el-table-column>
							<el-table-column prop="" label="买家" min-width="80" align="center">
								<template slot-scope="scope">
									<div v-if="item.customer.nickname">
										<p>{{item.customer.nickname}}</p>
										<p>{{item.customer.mobile}}</p>
									</div>
									<div v-else>
										<p>匿名支付</p>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="orderTime" label="下单时间" min-width="80" align="center">
								<template slot-scope="scope">
									<p>{{item.created_at?item.created_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="orderContent" label="订单状态" min-width="80" align="center">
								<template slot-scope="scope">
									<p>{{ formatSelect(item.status=='100'?'200':item.status,options[2]) }}</p>
									<!--<el-button size="small" @click="shipVisible=true,shipData.id=scope.row.id">发货</el-button>-->
								</template>
							</el-table-column>
							<el-table-column prop="payment_amount" label="实付金额" min-width="80" align="center"></el-table-column>
						</el-table>
						<!--<el-table :data="item.order_items" v-loading="tLoading" :show-header="false" border :span-method="spanMethod">
							<el-table-column prop="name" label="商品" min-width="380">
								<template slot-scope="scope">
							        <el-row :gutter="20" type="flex" align="middle">
									  <el-col :span="6"><img class="x-img" :src="scope.row.main_image" width="100%" alt="" /></el-col>
									  <el-col :span="15">
									  	<div>{{ scope.row.name }}</div>
									  </el-col>
									  <el-col :span="3">
									  		<p>{{scope.row.sell_price}}</p>
											<p>{{scope.row.quality}}</p>
									  </el-col>
									</el-row>
							    </template>
							</el-table-column>
							<el-table-column prop="orderMoney" label="售后" min-width="80" align="center">
								<template slot-scope="scope">
								</template>
							</el-table-column>
							<el-table-column prop="" label="买家" min-width="80" align="center">
								<template slot-scope="scope">
									<p>{{item.customer.nickname}}</p>
									<p>{{item.customer.mobile}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="orderTime" label="下单时间" min-width="80" align="center">
								<template slot-scope="scope">
									<p>{{item.created_at?item.created_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="orderContent" label="订单状态" min-width="80" align="center">
								<template slot-scope="scope">
									<p>{{ formatSelect(item.status,options[2]) }}</p>
								</template>
							</el-table-column>
							<el-table-column prop="total_amount" label="实付金额" min-width="80" align="center"></el-table-column>
						</el-table>-->
						<div class="footContent" v-if="item.beizhu">
							<p><span>买家备注： 一定要送货上门，拒绝放任何代收点，否则退货退款！</span></p>
						</div>
					</div>
					<!--工具条-->
					<div class="toolbar" style="text-align: right;">
						<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="待付款"  name="second">
					
				</el-tab-pane>
				<el-tab-pane label="已完成"  name="third">
					
				</el-tab-pane>
				<el-tab-pane label="已关闭"  name="forth">
					
				</el-tab-pane>
			</el-tabs>
			<!--发货界面-->
			<el-dialog :visible.sync="shipVisible" @close="dialogClose" @open="dialogOpen" width="60%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="商品发货" name="first"></el-tab-pane>
				</el-tabs>
				<div>待发货，已选</div>
				<div class="form-container" style="padding:0">
					<el-table :data="shipList" highlight-current-row v-loading="tLoading" stripe @selection-change="shipSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="name" label="商品" min-width="200"></el-table-column>
						<el-table-column prop="num" label="数量" min-width="80"></el-table-column>
						<el-table-column prop="orderNum" label="物流/单号" min-width="180"></el-table-column>
						<el-table-column prop="status" label="状态" min-width="80"></el-table-column>
					</el-table>
					<el-form :model="shipData" v-loading="fLoading" label-width="100px" ref="shipFileds" label-position="left">
						<el-form-item label="收货地址：">
							<span v-text="shipData.address"></span>
						</el-form-item>
						<el-form-item label="发货方式：" prop="post_type">
							<el-radio-group v-model="shipData.post_type">
								<el-radio label="0">物流发货</el-radio>
								<el-radio label="1">无需物流</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="物流公司：" prop="post_name" style="display: inline-block;" v-if="shipData.post_type=='0'">
							<el-select size="small" v-model="shipData.post_name" style="width:60%">
								<el-option label="请选择一个物流公司" value=""></el-option>
								<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="快递单号：" prop="post_no" style="display: inline-block;" v-if="shipData.post_type=='0'">
							<el-input v-model="shipData.post_no" style="width:80%"></el-input>
						</el-form-item>
						<p style="color:gray;font-size: 12px;" v-if="shipData.post_type=='0'">*请仔细填写物流公司及快递单号，发货后24小时内仅支持做一次更正，逾期不可修改</p>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="shipVisible = false" size="small">返回</el-button>
					<el-button @click.native="shipSubmit()" type="primary" size="small">保存</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import AdminApiService from '../../services/AdminApiService';
	export default {
		name: 'ddgl',
		data() {
			return {
				shipList:[{},{}],
				shipData:{
					post_type:'0',
					post_no:'',
					post_name:''
				},
				shipVisible:false,
				activeName:'first',
				options:[
					[{label:"线下扫码",value:"0"},{label:"预定自提",value:"1"},{label:"商城订单",value:"2"}],
					[{label:"0",value:"0"},{label:"1+",value:"1+"},{label:"2+",value:"2+"},{label:"3+",value:"3+"},{label:"4+",value:"4+"},{label:"5+",value:"5+"},{label:"10+",value:"10+"},{label:"15+",value:"15+"},{label:"20+",value:"20+"},{label:"30+",value:"30+"},{label:"50+",value:"50+"}],
					[{label:"待付款",value:"200"},{label:"待发货",value:"300"},{label:"已发货",value:"400"},{label:"已完成",value:"500"},{label:"已关闭",value:"0"},{label:"支付失败",value:"600"}],
					[{label:"微信支付",value:"WECHAT_PAY"},{label:"支付宝支付",value:"ALI_PAY"}]
				],
				//列表查询字段
				filters: {
					orderNum:'0',
					type: '',
					status: '',
					pay_type: '',
					begin_at: '',
					end_at: ''
				},
				allOrderData:[]
			}
		},
		mounted() {
			 
		},
		computed: {
		},
		watch: {

		},
		methods: {
			formatSelect(val,item) {
				for(let i in item){
					if(val==item[i].value){
						return item[i].label
					}
				}
			},
			async getList(fliters){
				let [list, meta] = await this.adminApi(AdminApiService).Orders.getLists(fliters);
				this.meta = meta;
				this.allOrderData= list;
				for(var i in this.allOrderData){
					this.allOrderData[i].index=parseInt(i)+1
				}
				this.totalNum=this.meta.total
			},
			async shipSubmit(){
				let list = await this.adminApi(AdminApiService).Orders.shipOrder(this.shipData.id, this.shipData);
				if(list){
					this.$message({message:"保存成功",type: 'success'})
					this.shipVisible=false
				}
			},
			shipSelectionChange(data){
			
			},
			spanMethod({ row, column, rowIndex, columnIndex }) {
		        if (rowIndex === 0) {
		          	if (columnIndex !== 0) {
			            return {
			              rowspan: 9999,
			              colspan: 1
			            }
		          	}
		        }
		    }
		},
		filters: {
			
		},
		created() {
			this.getList(this.paginator)
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
</style>
<style>
	/*.el-table__row td:first-child{padding:12px 0 !important}*/
	.el-table--enable-row-hover .el-table__body tr:hover>td {background-color: #fff !important; }
	.showHeader .el-table__empty-block{display: none;}
</style>