/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="10px" ref="selectFileds">
					<el-form-item prop="code">
						<el-input size="small" v-model="filters.code" placeholder="输入店铺编号"></el-input>
					</el-form-item>
					<el-form-item prop="province">
						<el-select size="small" v-model="filters.province" @change="linkageChange($event,'cxCityData','city')">
							<el-option label="请选择省" value="" @click.native="filters.city = '';filters.area = ''"></el-option>
							<el-option v-for="(item,index) in provinceData" :label="item.name" :value="item.id" :key="index" @click.native="filters.city = '';filters.area = ''"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="city">
						<el-select size="small" v-model="filters.city" @change="linkageChange($event,'cxAreaData','area')">
							<el-option label="请选择市" value="" @click.native="filters.area = ''"></el-option>
							<el-option v-for="(item,index) in cxCityData" :label="item.name" :value="item.id" :key="index" @click.native="filters.area = ''"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="area">
						<el-select size="small" v-model="filters.area">
							<el-option label="请选择区" value=""></el-option>
							<el-option v-for="(item,index) in cxAreaData" :label="item.name" :value="item.id" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getList(getInquire(filters))">查询</el-button>
					</el-form-item>
				</el-form>
				<div>
					<el-button size="small" type="primary" icon="el-icon-plus" @click.native="getUpdate(false)">新增</el-button>
					<el-button size="small"  @click="handleExport()">导出</el-button>
				</div>
			</el-col>

			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading">
				<el-table-column prop="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="code" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="manager.user_name" label="车主" min-width="100"></el-table-column>
				<el-table-column prop="" label="地理位置" min-width="180">
					<template slot-scope="scope">
						{{scope.row.province + scope.row.city + scope.row.county}}
					</template>
				</el-table-column>
				<el-table-column prop="num" label="订单数" min-width="60"></el-table-column>
				<el-table-column prop="money" label="销售金额" min-width="100"></el-table-column>
				<el-table-column prop="manager.mobile" label="联系方式" min-width="150"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="getDetail(scope.row)">查看</el-button>
						<el-button type="primary" size="mini" @click="getUpdate(true, scope.row)">编辑</el-button>
						<el-popover placement="top">
							<el-button type="success" size="mini" @click="payCode(false,scope.row)">支付二维码</el-button>
							<el-button type="success" size="mini" @click="payCode(true,scope.row)">微信参数二维码</el-button>
							<el-button slot="reference" title="更多" icon="el-icon-more" size="mini"></el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>
			</div>
			<!--新增编辑界面-->
			<diningCar-add :formVisible = "formVisible"></diningCar-add>
			<!--详情界面-->
			<diningCar-detail :detailVisible = "detailVisible"></diningCar-detail>
			
			<el-dialog :visible.sync="detailVisible" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="店铺信息" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="120px">
						<el-form-item label="店铺编号：">
							<span v-text="detailData.number"></span>
						</el-form-item>
						<el-form-item label="店铺地址：">
							<span v-text="detailData.address"></span>
						</el-form-item>
						<el-form-item label="店铺车主：">
							<span v-text="detailData.manager.user_name"></span>
						</el-form-item>
						<el-form-item label="联系电话：">
							<span v-text="detailData.manager.mobile"></span>
						</el-form-item>
					</el-form>
				</div>
				<el-tabs active-name="first">
					<el-tab-pane label="店铺订单：(78单)" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="120px">
						<el-form-item label="" label-width="10px" >
							<el-table :data="detailData.orderData" highlight-current-row v-loading="tLoading">
								<el-table-column prop="sIndex" label="序号" width="60"></el-table-column>
								<el-table-column prop="name" label="编号" min-width="80"></el-table-column>
								<el-table-column prop="phone" label="车主" min-width="100"></el-table-column>
								<el-table-column prop="integral" label="地理位置" min-width="150"></el-table-column>
								<el-table-column prop="num" label="订单数" min-width="60"></el-table-column>
								<el-table-column prop="money" label="销售金额" min-width="100"></el-table-column>
								<el-table-column prop="time" label="联系方式" min-width="150"></el-table-column>
							</el-table>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="detailVisible = false" size="small">返回</el-button>
				</div>
			</el-dialog>
			<!--二维码图片界面-->
			<el-dialog :visible.sync="imgCodeVisible" @close="dialogClose" @open="dialogOpen" width="50%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="imgInfo" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container" >
					<img :src="imgCodeUrl" alt="" style="width:200px;height:200px;display:block;margin:0 auto"/>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="upload()" size="small" type="primary">下载</el-button>
					<el-button @click.native="imgCodeVisible = false" size="small">返回</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
/* eslint-disable */
	import DiningCarAddComponent from '../../components/DiningCarAddComponent';
	import DiningCarDetailComponent from '../../components/DiningCarDetailComponent';
//	import { mapGetters } from 'vuex'
//	import { TMap } from '../../TMap'
	export default {
		name: 'diningCarManage',
		components: {
			'diningCar-add': DiningCarAddComponent,
			'diningCar-detail': DiningCarDetailComponent
		},
		data() {
			return {
				paginator:{
					page:1,
					limit:10
				},
				//列表查询字段
				filters: {
					name: '',
					province: '',
					city: '',
					area: ''
				},
				mapfilter:{
					address:''
				},
				mapfilters:{
					lng:'',
					lat:''
				},
				geocoder:'',
				imgCodeUrl:'',
				imgInfo:'',
				imgCodeVisible:false,
				formVisible:false,
				shops:[],
				meta:{},
				detailData: {
					country:{ name: '' },
					province: { name: '' },
					city: { name: '' },
					county: { name: '' },
					manager: {
						mobile: '',
						user_name: '',
						nickname: '',
						realname: ''
					}
				}
			};
		},
		mounted() {
		},
		computed: {

		},
		watch: {

		},
		methods: {
			upload(){
				window.open(this.imgCodeUrl)
			},
			addressSearch(){
				if(this.mapfilter.address){
					this.geocoder.getLocation(this.mapfilter.address)
				}else{
					this.$message({message:"请先输入有效地址再搜索",type: 'warning'})
				}
			},
			payCode(type,row){
				this.imgCodeVisible=true
				if(type){
					this.imgInfo='微信参数二维码'
					this.imgCodeUrl=this.IMAGE_SERVER_HOST+'/shop/'+row.id+'/official-account-qrcode'
				}else{
					this.imgInfo='支付二维码'
					this.imgCodeUrl=this.IMAGE_SERVER_HOST+'/shop/'+row.id+'/payment-qrcode'
				}
			},
			async getUpdate(type, row, para,fun) {
				this.formVisible = true
//				let result = await this.$nextTick();
//				if( result ) {
//				    this.$refs.formFileds.resetFields();
//			    	if(type) {
//						this.saveType = 1
//						if(this.exData) {
//							this.exData.affairId = row.id
//						}
//						let list = await this.adminApi(AdminApiService).Shops.detailData(row.id);
//						this.formData=Object.assign(this.formData, list)
//					} else {
//						this.saveType = 0
//						if(this.exData) {
//							this.exData.affairId = ''
//						}
//						delete this.formData.id
//						if(fun) {
//							fun()
//						}
//					}
//					this.mapfilters={lng:'',lat:''}
//				}
			},
			async getDetail(row){
				let list = await this.adminApi(AdminApiService).Shops.detailData(row.id);
				this.detailData=list
				this.detailVisible = true
				this.$nextTick(() => {
					this.adapt()
				})
			},
			async createSubmit(beforeSave,afterSave) {
				if(beforeSave) {
					beforeSave()
				}
				let self = this;
				let valid = await this.$refs.formFileds.validate();
				if(valid){
					let result = await this.$confirm('确认提交吗？', '提示', {})
					if(result) {
						if(this.saveType){
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(AdminApiService).updateData(this.formData.id,para);
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
							}
						}else{
							let para = Object.assign({}, this.formData);
							let data=await self.adminApi(AdminApiService).Shops.createShop(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
							}
						}
						this.formVisible = false
						this.getList(this.paginato)
					}
				}
			},
			
			async getList(fliter){
				let [list, meta] = await this.adminApi(AdminApiService).Shops.getLists(fliter);
				this.meta = meta;
				this.selectData= list;
				for(var i in this.selectData){
					this.selectData[i].index=parseInt(i)+1
				}
				this.totalNum=this.meta.total
			}
		},
		filters: {

		},
		created() {
//			this.getList(this.paginator)
//			this.getListData()
		}
	}
</script>

<style scoped>
	#mapContainer{min-width:500px;min-height:500px;}
</style>
