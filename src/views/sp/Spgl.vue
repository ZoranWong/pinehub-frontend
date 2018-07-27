<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="125px" ref="selectFileds">
					<el-form-item prop="name" label="商品名称或编号：">
						<el-input size="small" v-model="filters.name" placeholder=""></el-input>
					</el-form-item>
					<el-form-item prop="status" label="商品分组：">
						<el-select size="small" v-model="filters.status">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[2]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="type" label="商品类型：">
						<el-select size="small" v-model="filters.type">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="begin_at" label="总销量：">
						<el-input size="small" v-model.number="filters.name" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="" label-width="0px">
						-
					</el-form-item>
					<el-form-item prop="end_at" label="" label-width="0px">
						<el-input size="small" v-model.number="filters.name" placeholder=""></el-input>
					</el-form-item>
					<el-form-item prop="begin_at" label="价格：">
						<el-input size="small" v-model.number="filters.name" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="" label-width="0px">
						-
					</el-form-item>
					<el-form-item prop="end_at" label="" label-width="0px">
						<el-input size="small" v-model.number="filters.name" placeholder=""></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getList(getInquire(filters))">查询</el-button>
					</el-form-item>
				</el-form>
				<div>
					<el-button size="small" type="primary" icon="el-icon-plus" @click.native="getUpdate(false)">发布商品</el-button>
					<el-button size="small"  @click="handleExport()">导出报表</el-button>
					<el-button size="small"  @click="handleExport()">查看已生成报表</el-button>
				</div>
			</el-col>

			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="code" label="商品  价格" min-width="200">
					<template slot-scope="scope">
						<el-row :gutter="20" type="flex" align="middle">
						  	<el-col :span="6"><img class="x-img" :src="scope.row.main_image" width="100%" alt=""/></el-col>
						  	<el-col :span="15">
						  		<div>{{ scope.row.name }}</div>
						  		<p style="color:#f60">￥{{scope.row.sell_price}}</p>
						  	</el-col>
						</el-row>
				    </template>
				</el-table-column>
				<el-table-column prop="" label="访问量" min-width="100">
					<template slot-scope="scope">
						<p>访客数： {{scope.row.province}}</p>
						<p>浏览量： {{scope.row.province}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="stock_num" label="库存" min-width="80"></el-table-column>
				<el-table-column prop="sell_num" label="总销量" min-width="80"></el-table-column>
				<el-table-column prop="" label="创建时间" min-width="100">
					<template slot-scope="scope">
						<p>{{scope.row.created_at?scope.row.created_at.date.substr(0,19):''}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="序号" min-width="80"></el-table-column>
				<el-table-column label="操作" width="300">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="getUpdate(true, scope.row)">编辑</el-button> |
						<el-button type="text" size="mini" @click="getDetail(scope.row)" disabled>会员价</el-button> |
						<el-button type="text" size="mini" @click="getDetail(scope.row)" disabled>推广商品</el-button> |
						<el-button type="text" size="mini" @click="getDetail(scope.row)" disabled>删除</el-button> |
						<el-popover placement="top">
							<el-button type="text" size="mini" @click="payCode(false,scope.row)" v-if="scope.row.status==1">下架</el-button>
							<!--<el-button type="text" size="mini" @click="payCode(true,scope.row)">微信参数二维码</el-button>-->
							<el-button slot="reference" title="更多" type="text" icon="el-icon-more" size="mini"></el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>
			</div>
			<!--新增编辑界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="80%" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="saveType ? '编辑商品' : '发布商品'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<h4>基本信息</h4>
						<el-form-item label="商品名：" prop="name">
							<el-input v-model="formData.name" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="分享描述：" prop="preview" style="margin-bottom: 0;">
							<el-input v-model="formData.preview" maxlength="36"></el-input>
						</el-form-item>
						<p class="prompt">微信分享给好友时会显示，建议36个字以内</p>
						<el-form-item label="商品图：" prop="images">
							<el-upload class="upload-demo" name="merchantpic" :beforeUpload="beforeUpload" :headers="headers" :action="ADMIN_SERVER_HOST+'/merchandise/image/cloud?selected_appid='+appId+'&token='+tokens" :on-remove="handleRemove" :data="exData" :file-list="fileList" :on-success="handleSuccess" :on-error="handleError" list-type="picture-card">
							  <el-button plain size="small" type="text">+ 点击上传  </el-button>
							  <div slot="tip" class="el-upload__tip">建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传15张 </div>
							</el-upload>
						</el-form-item>
						<el-form-item label="商品分组：" prop="categories">
							<el-select v-model="formData.categories" multiple placeholder="请选择商品分组" size="small">
						    	<el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						  	</el-select>
						  	<el-button type="text" size="small" @click="">刷新</el-button> |
						  	<el-button type="text" size="small" @click="addGroup()">新建分组</el-button>
						  	
						</el-form-item>
						<el-form-item label="主图：" prop="main_image">
							<el-upload class="upload-demo" name="main_image" :beforeUpload="mainBeforeUpload" :headers="headers" :action="ADMIN_SERVER_HOST+'/merchandise/image/cloud?selected_appid='+appId+'&token='+tokens" :on-remove="mainHandleRemove" :file-list="mainFileList" :data="mainExData" :on-success="mainHandleSuccess" :on-error="handleError" list-type="picture-card">
							  	<el-button plain size="small" type="text">+点击上传 </el-button>
							  	<div slot="tip" class="el-upload__tip">建议尺寸：800*800像素，最多上传1张 </div>
							</el-upload>
						</el-form-item>
						<h4>价格库存</h4>
						<el-form-item label="售价：" prop="sell_price">
							<el-input v-model.number="formData.sell_price" style="width:30%"><template slot="prepend">￥</template></el-input>
						</el-form-item>
						<el-form-item label="原价：" prop="origin_price">
							<el-input v-model.number="formData.origin_price" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="成本：" prop="cost_price">
							<el-input v-model.number="formData.cost_price" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="工厂价：" prop="factory_price" style="margin-bottom: 0;">
							<el-input v-model.number="formData.factory_price" style="width:30%"></el-input>
						</el-form-item>
						<p class="prompt">商品没有优惠的情况下，划线价在商品详情会以划线形式显示。</p>
						<el-form-item label="库存：" prop="stock_num">
							<el-input v-model.number="formData.stock_num" style="width:30%"></el-input>
						</el-form-item>
						
						
						<el-form-item label="会员折扣：" prop="sync" style="margin-bottom: 0;">
							<el-checkbox v-model="formData.sync">参加会员折扣</el-checkbox> <el-button @click.native="$router.push({path: '/Hyk'})" type="text" size="small">管理会员卡 </el-button>
						</el-form-item>
						<p class="prompt">是否勾选不影响自定义会员价生效。</p>
						
						<h4>其他信息</h4>
						<el-form-item label="上下架：" prop="status">
							<el-radio-group v-model="formData.status">
							    <el-radio label="1">上架 </el-radio>
							    <el-radio label="0">下架</el-radio>
							 </el-radio-group>
						</el-form-item>
						<!--<el-form-item label="上架时间：" prop="type">
							<el-radio-group v-model="formData.type" @change="">
								<div><el-radio label="DATE_TYPE_PERMANENT">立即上架售卖</el-radio> </div>
							    <div style="margin:10px 0;">
							    	<el-radio label="DATE_TYPE_FIX_TERM">自定义上架时间
								    	<el-form-item label="" prop="end_timestamp" label-width="80px" style="display:inline-block;width:30%">
								    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" :disabled="formData.type!='DATE_TYPE_FIX_TIME_RANGE'" v-model="formData.end_timestamp" type="datetime" :editable="false" placeholder="结束时间"></el-date-picker>
							    		</el-form-item>
							    	</el-radio>
							    </div>
							    <div><el-radio label="DATE_TYPE_FIX_TIME_RANGE">暂不售卖，放入仓库</el-radio></div>
							 </el-radio-group>
						</el-form-item>-->
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--新建分组-->
			<el-dialog :visible.sync="groupingVisible" @close="dialogClose" @open="dialogOpen" width="50%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="新建商品分组" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="groupingData" v-loading="fLoading" label-width="120px" ref="groupingFileds">
						<el-form-item label="分组名称:" prop="name" :rules="[{ required: true, message: '请输入分组名称', trigger: 'blur' }]">
							<el-input v-model="groupingData.name" style="width:50%"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="groupingVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="groupSubmit()" :loading="bLoading" size="small">保存</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import MerchandisesService from '../../services/MerchandisesService';
	import TokenService from '../../services/TokenService';
	import { mapGetters } from 'vuex'
	import { TMap } from '../../TMap'
	export default {
		name: 'spgl',
		data() {
			return {
				groupingVisible:false,
				appId:'',
				tokens:'',
				pickerOptions:{
		          	disabledDate(time) {
		            	return time.getTime() < Date.now() - 8.64e7;
		           	}
		        },		
				headers:{
					Accept: 'application/vnd.pinehub.v0.0.1+json'
				},
				mainExData: {
					file_field: 'main_image',
					affairId: '',
					needStorage: true
				},
				exData: {
					file_field: 'merchantpic',
					affairId: '',
					needStorage: true
				},
				//列表查询字段
				filters: {
					name: '',
					province: '',
					city: '',
					area: ''
				},
				options:[
					[{label:"线下扫码",value:"0"},{label:"预定自提",value:"1"},{label:"商城订单",value:"2"}],
					[{label:"0",value:"0"},{label:"1+",value:"1+"},{label:"2+",value:"2+"},{label:"3+",value:"3+"},{label:"4+",value:"4+"},{label:"5+",value:"5+"},{label:"10+",value:"10+"},{label:"15+",value:"15+"},{label:"20+",value:"20+"},{label:"30+",value:"30+"},{label:"50+",value:"50+"}],
					[{label:"待付款",value:"200"},{label:"待发货",value:"300"},{label:"已发货",value:"400"},{label:"已完成",value:"500"},{label:"已关闭",value:"0"},{label:"支付失败",value:"600"}],
					[{label:"微信支付",value:"WECHAT_PAY"},{label:"支付宝支付",value:"ALI_PAY"}]
				],
				formRules: {
					categories: [{ required: true, message: '请选择分组', trigger: 'blur' }],
					main_image: [{ required: true, message: '请上传主图片', trigger: 'blur' }],
					images: [{ required: true, message: '请上传产品图组', trigger: 'blur' }],
					name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
					preview: [{ required: true, message: '请输入简介', trigger: 'blur' }],
					origin_price: [{ required: true, message: '请输入原价', trigger: 'blur' } ,{ type: 'number', message: '原价必须为数字值'}],
					sell_price: [{ required: true, message: '请输入售价', trigger: 'blur' },{ type: 'number', message: '售价必须为数字值'}],
					stock_num: [{ required: true, message: '请输入库存量', trigger: 'blur' },{ type: 'number', message: '库存必须为数字值'}],
					status:[{ required: true, message: '请选择上下架状态', trigger: 'blur' }]
				},
				//新增编辑界面数据
				formData: {
					categories:[],
					name: '',
					preview: '',
					main_image: '',
					images: [],
					origin_price: '',
					sell_price:'',
					factory_price: '',
					cost_price: '',
					status: '1',
					detail:"暂无",
					stock_num: ''
				},
				groupingData: {
					name: ''
				},
				groupList:[],
				meta:{}
			};
		},
		mounted() {
		},
		computed: {
			fileList() {
				var _array = [];
				if(this.formData.images){
					for(var i = 0; i < this.formData.images.length; i++) {
						_array.push({
							url: this.formData.images[i]
						})
					}
				}
				return _array
			},
			mainFileList() {
				var _array = [];
				if(Boolean(this.formData.main_image)) {
					var fileArray = this.formData.main_image.split(',');
					for(var i = 0; i < fileArray.length; i++) {
						_array.push({
							url: fileArray[i]
						})
					}
				}
				return _array
			}
		},
		watch: {

		},
		methods: {
			handleSuccess(response, file, fileList) {
				if(response.status_code){
					this.$message({ message: '上传失败', type: 'warning' })
				}else{
					this.formData.images||(this.formData.images=[]);
					//for(let i in fileList){
					this.formData.images.push(response.data.src);
					//}
				}
				this.groupImgShow=true
			},
			handleRemove(file, fileList) {
				if(!file) return
				console.log(file)
				console.log(fileList)
			},
			mainHandleSuccess(response, file, fileList) {
				if(response.status_code){
					this.$message({ message: '上传失败', type: 'warning' })
				}else{
					this.formData.main_image=response.data.src;
				}
				this.groupImgShow=true
			},
			mainHandleRemove(file, fileList) {
				if(!file) return
				this.formData.main_image=''
				
			},
			mainBeforeUpload(file) {
				const isJPG = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 1;
				if(this.mainFileList.length > 0) {
					this.$message({ message: '最多上传一张图片', type: 'warning' })
					return false
				}
		        if (!isJPG) {
		          this.$message.error('上传图片只能是PNG格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传图片大小不能超过 1MB!');
		        }
        		return isJPG && isLt2M;
			},
			//图片上传组件 before-upload 所对应的方法 可限制图片的格式大小数量等
			beforeUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 1;
		        console.log(this.formData.images)
				if(this.formData.images.length > 14) {
					this.$message({ message: '最多上传15张图片', type: 'warning' })
					return false
				}
		        if (!isJPG) {
		          this.$message.error('上传图片只能是PNG格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传图片大小不能超过 1MB!');
		        }
        		return isJPG && isLt2M;
			},
			handleSelectionChange(val){
				
			},
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
			async addGroup(){
				this.groupingVisible = true
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.groupingFileds.resetFields();
			    	
				}
			},
			async groupSubmit() {
				let self = this;
				let valid = await this.$refs.groupingFileds.validate();
				if(valid){
					let result = await this.$confirm('确认保存吗？', '提示', {})
					if(result) {
						let para = Object.assign({}, this.groupingData);
						let data=await self.adminApi(MerchandisesService).Merchandises.createGroup(para);
						console.log(data)
						if(data) {
							this.$message({message:"新增成功",type: 'success'})
							this.getGroup()
						}
						this.groupingVisible = false
					}
				}
			},
			async getUpdate(type, row, para,fun) {
				this.formVisible = true
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.formFileds.resetFields();
			    	if(type) {
						this.saveType = 1
						if(this.exData) {
							this.exData.affairId = row.id
						}
						let list = await this.adminApi(MerchandisesService).Merchandises.detailData(row.id);
						
						this.formData=Object.assign(this.formData, list)
						this.formData.status=this.formData.status.toString()
						this.formData.images=this.formData.images?this.formData.images:[]
						if(this.formData.categories.length){
							var catArr=[]
							for(let i in this.formData.categories){
								catArr.push(this.formData.categories[i].id)
							}
						}
						this.formData.categories=catArr
						console.log(this.formData)
					} else {
						console.log(this.formData)
						this.saveType = 0
						if(this.exData) {
							this.exData.affairId = ''
						}
						delete this.formData.id
						if(fun) {
							fun()
						}
					}
				}
			},
			async getDetail(row){
				let list = await this.adminApi(MerchandisesService).Merchandises.detailData(row.id);
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
							let data = await self.adminApi(MerchandisesService).Merchandises.updateData(this.formData.id,para);
							console.log(data)
							if(data) {
								this.$message({message:"编辑成功",type: 'success'})
							}
						}else{
							let para = Object.assign({}, this.formData);
							let data=await self.adminApi(MerchandisesService).Merchandises.createData(para);
							console.log(data)
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
								this.getList(this.filters)
							}
						}
						this.formVisible = false
					}
				}
			},
			async getGroup(){
				let [list, meta] = await this.adminApi(MerchandisesService).Merchandises.getGroups();
				this.groupList=list
				console.log(list);
			},
			async getList(fliters){
				let [list, meta] = await this.adminApi(MerchandisesService).Merchandises.getLists(fliters);
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
			this.getList(this.paginator)
			this.getGroup()
			this.appId= JSON.parse(sessionStorage.getItem('appInfo')).id || '';
			this.tokens= TokenService.getToken();
		}
	}
</script>

<style scoped>
	.prompt{color:gray;font-size: 12px;margin-left: 120px;}
	#mapContainer{
	    min-width:500px;
	    min-height:500px;
	}
</style>
<style>
	.el-input-group__prepend{padding:0 5px !important}
</style>