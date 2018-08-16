<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-tabs  type="card">
					<el-tab-pane label="所有优惠券" name="first">
					</el-tab-pane>
					<el-tab-pane label="未开始"  name="second">
					</el-tab-pane>
					<el-tab-pane label="进行中"  name="third">
					</el-tab-pane>
					<el-tab-pane label="已结束" name="forth">
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-table :data="currentPageCoupon" highlight-current-row v-loading="isLoading">
				<el-table-column prop="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="code" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="title" label="优惠券名称" min-width="100"></el-table-column>
				<el-table-column prop="type" label="类型" min-width="180"></el-table-column>
				<el-table-column prop="isTrue" label="是否同步微信" min-width="60"></el-table-column>
				<el-table-column prop="cratedAt" label="有效时间" min-width="100"></el-table-column>
				<el-table-column prop="hangs" label="总发行数" min-width="80"></el-table-column>
				<el-table-column prop="total" label="库存" min-width="100"></el-table-column>
				<el-table-column prop="nums" label="已领取是数量" min-width="100"></el-table-column>
				<el-table-column prop="useNum" label="使用数" min-width="100"></el-table-column>
				<el-table-column prop="useF" label="使用率" min-width="100"></el-table-column>
				 <el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="success" size="mini">查看</el-button>
						<el-button type="primary" size="mini">修改</el-button>
					</template> 
				</el-table-column>
			</el-table>
			<!--工具条-->
			<paginator :totalNum = "totalNum" :totalPage = "totalPage" :currentPage="currentPage" :command="command"></paginator>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import Paginator from '../../components/Paginator.vue';
	import GetCouponCommand from '../../commands/GetCouponCommand';
	export default {
		name: 'coupon',
		components: {
			paginator: Paginator
		},
		data() {
			let self = this;
			return {
				isLoading:false,
				currentPageShops:[]
			}
		},
		computed: {
			totalNum() {
				return this.$store.state.coupon.totalNum;
			},
			totalPage() {
				return this.$store.state.coupon.pageCount;
			},
			currentPage() {
				return this.$store.state.coupon.currentPage;
			},
			currentPageCoupon(){
				console.log(this.$store.getters['coupon/currentPage'])
				return this.$store.getters['coupon/currentPage'];
			},
			command() {
				return GetCouponCommand.commandName();
			}
		},
		watch: {

		},
		methods: {
			clearSill(val){
				if(!val){
					this.$store.state.coupon.formData.advanced_info.use_condition.least_cost=''
				}
			},
			clearOffer(val){
				if(val== "cash"){
					this.$store.state.coupon.formData.discount=''
				}else if(val== "discount"){
					this.$store.state.coupon.formData.reduce_cost=''
				}
			},
			clearDataInfo(val){
				if(val=='DATE_TYPE_PERMANENT'){
					this.$store.state.coupon.formData.base_info.date_info.fixed_term=''
					this.$store.state.coupon.formData.base_info.date_info.begin_timestamp=''
					this.$store.state.coupon.formData.base_info.date_info.end_timestamp=''
				}else if(val=='DATE_TYPE_FIX_TERM'){
					this.$store.state.coupon.formData.base_info.date_info.begin_timestamp=''
					this.$store.state.coupon.formData.base_info.date_info.end_timestamp=''
				}else{
					this.$store.state.coupon.formData.base_info.date_info.fixed_term=''
				}
			},
			formatSelect(value) {
				for(var i in this.$store.state.coupon.colorOptions){
					if(this.$store.state.coupon.colorOptions[i].baseColor==value){
						return this.$store.state.coupon.colorOptions[i].color
					}
				}
			},
			eidtColor(color){
				this.$store.state.coupon.chooseColor="background-color:"+color.color
				this.$store.state.coupon.formData.base_info.color=color.baseColor
			},
			async delData(row){
		    	let result = await this.$confirm('确认删除该条数据吗？', '提示', {})
				if(result) {
		    		let list = await this.adminApi(CardsService).Coupons.deleteData(row.id);
		    		if(list) {
						this.$message({message:"删除成功",type: 'success'})
					}
		    		this.getList(this.filters)
		    	}
		    },
			async getUpdate(type, row, para,fun) {
				this.$store.state.coupon.formVisible = true
				let result = await this.$nextTick();
				if( result ) {
//					if (this.$refs.formFileds!==undefined) {
				    	this.$refs.formFileds.resetFields();
//				   	}
			    	if(type) {
						this.$store.state.common.saveType = 1
						if(this.exData) {
							this.exData.affairId = row.id
						}
						let list = await this.adminApi(CardsService).Coupons.detailData(row.id);
						this.$store.state.coupon.formData=Object.assign(this.$store.state.coupon.formData,list.ticket_info)
						this.$store.state.coupon.formData.least_cost=list.ticket_info.advanced_info.use_condition.least_cost?'least_cost':''
						this.$store.state.coupon.formData.card_type=list.ticket_type
						this.$store.state.coupon.formData.sync=list.sync=='0'?false:true
						this.$store.state.coupon.formData.base_info.date_info.begin_timestamp=this.$store.state.coupon.formData.base_info.date_info.begin_timestamp?new Date(this.$store.state.coupon.formData.base_info.date_info.begin_timestamp*1000):''
						this.$store.state.coupon.formData.base_info.date_info.end_timestamp=this.$store.state.coupon.formData.base_info.date_info.end_timestamp?new Date(this.$store.state.coupon.formData.base_info.date_info.end_timestamp*1000):''
						this.$store.state.coupon.formData.id=list.id
						this.$store.state.coupon.formData.begin_at=list.begin_at?list.begin_at.date.substr(0,19):''
						this.$store.state.coupon.formData.end_at=list.begin_at?list.end_at.date.substr(0,19):''
						console.log(this.$store.state.coupon.formData)
					} else {
						this.$store.state.common.saveType = 0
						this.$store.state.coupon.formData.base_info.date_info={
		                    type: "",
		                    begin_timestamp: "",
		                   	end_timestamp: "",
		                   	fixed_term: ""
		                }
						if(this.exData) {
							this.exData.affairId = ''
						}
						delete this.$store.state.coupon.formData.id
						if(fun) {
							fun()
						}
					}
				}
			},
			async createSubmit(beforeSave,afterSave) {
				if(beforeSave) {
					beforeSave()
				}
				let self = this;
				this.$store.state.coupon.copyFormData=JSON.parse(JSON.stringify(this.$store.state.coupon.formData))
				let valid = await this.$refs.formFileds.validate();
				if(valid){
					let result = await this.$confirm('确认提交吗？', '提示', {})
					if(result) {
						if(this.$store.state.coupon.formData.card_type=='discount'){
							delete this.$store.state.coupon.copyFormData.least_cost
							delete this.$store.state.coupon.copyFormData.reduce_cost
						}else if(this.$store.state.coupon.formData.card_type=='cash'){
							delete this.$store.state.coupon.copyFormData.discount
							this.$store.state.coupon.copyFormData.least_cost=this.$store.state.coupon.formData.advanced_info.use_condition.least_cost
						}
						delete this.$store.state.coupon.copyFormData.garden
						delete this.$store.state.coupon.copyFormData.sync
						delete this.$store.state.coupon.copyFormData.card_type
						let para = {
								sync:this.$store.state.coupon.formData.sync,
								ticket_info:'',
								ticket_type:this.$store.state.coupon.formData.card_type,
								end_at:this.$store.state.coupon.formData.end_at?this.$store.state.coupon.formData.end_at:this.$store.state.coupon.formData.base_info.date_info.end_timestamp?this.$store.state.coupon.formData.base_info.date_info.end_timestamp:'',
								begin_at:this.$store.state.coupon.formData.begin_at?this.$store.state.coupon.formData.begin_at:this.$store.state.coupon.formData.base_info.date_info.begin_timestamp?this.$store.state.coupon.formData.base_info.date_info.begin_timestamp:''
							}
						this.$store.state.coupon.copyFormData.base_info.date_info.begin_timestamp=this.$store.state.coupon.formData.base_info.date_info.begin_timestamp?Date.parse(this.$store.state.coupon.formData.base_info.date_info.begin_timestamp)/1000:''
						this.$store.state.coupon.copyFormData.base_info.date_info.end_timestamp=this.$store.state.coupon.formData.base_info.date_info.end_timestamp?Date.parse(this.$store.state.coupon.formData.base_info.date_info.end_timestamp)/1000:''
						if(this.$store.state.common.saveType){
							delete this.$store.state.coupon.copyFormData.id
							para.ticket_info=this.$store.state.coupon.copyFormData
							let data = await self.adminApi(CardsService).Coupons.updateData(this.$store.state.coupon.formData.id,para);
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
								this.getList(this.filters)
							}
						}else{
							para.ticket_info=this.$store.state.coupon.copyFormData
							let data = await self.adminApi(CardsService).Coupons.createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
								this.getList(this.filters)
							}
						}
						this.$store.state.coupon.formVisible = false
					}
				}
			},
			async getList(fliters, search){
				let [list, meta] = await this.adminApi(CardsService).Coupons.getLists(fliters, search);
				this.meta = meta;
				this.$store.state.coupon.couponsData= list;
//				for(var i in this.$store.state.coupon.couponsData){
//					this.$store.state.coupon.couponsData[i].index=parseInt(i)+1
//				}
				this.totalNum=this.meta.total
			}
		},
		filters: {
		},
		created() {
//			this.getList(this.$store.state.coupon.couponsFilters)
//			let shopInfo=JSON.parse(sessionStorage.getItem('shopInfo'))
//			if(shopInfo){
//				this.$store.state.coupon.formData.base_info.logo_url=shopInfo.logo
//			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.el-collapse{border:none}
	.cardMenu{clear: both;}
	.cardMenu .showCard{background-color: #63b359;width:300px;height:150px;display: inline-block;margin-right:20px;
		border-radius: 10px 10px 0 0;
	    color: #fff;
	    background-size: cover;
	    background-position: 50%;
	}
	.cardMenu .showCard .header{padding: 14px;overflow: hidden;height: 82px;}
	.cardMenu .showCard .header h3{line-height: 24px;text-shadow: 0 1px 4px rgba(0,0,0,.2);font-size: 16px;float: left;}
	.cardMenu .showCard .header h4{line-height: 24px;text-shadow: 0 1px 4px rgba(0,0,0,.2);font-size: 12px;float: right;}
	.cardMenu .showCard .detail{height: 30px;background-color: rgba(0,0,0,.3);line-height: 30px;overflow: hidden;padding: 0 14px;}
	.cardMenu .showCard .bottom-area {overflow: hidden;height: 40px;line-height: 40px;padding: 0 14px;background-color: #f8f8f8;font-size: 12px;color:#666}
	.cardMenu .addCard{width:300px;height:150px;text-align: center;display: inline-block;background-color: #f0f0f0;overflow: hidden;}
	.cardMenu .addCard h2{line-height: 100px;font-weight: 100;font-size: 85px;color: #fff;}
	.addCardLayout h4{border-bottom:1px solid #d1d1d1;padding-bottom: 5px;margin-bottom: 15px;}
	.colorLayout span{width: 20px;height: 20px;display: inline-block;margin-left: 10px;cursor: pointer;}
	.showColor{width:94px;height:32px;border:1px solid #d1d1d1;display:inline-block;padding:4px 12px;margin-left:10px;}
	.showColor p{width:65px;height:22px;}

	.discountAfter:after{content:"   开卡赠送";margin-left:15px}
	.discountsAfter:after{content:"   开卡赠送";margin-left:40px}
	.couponsType{text-align: center;}
	.couponsType p:not(:first-child){color:#aaa;}
</style>
