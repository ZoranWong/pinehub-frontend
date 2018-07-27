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
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="100%" :fullscreen="true" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="saveType ? '店铺管理编辑' : '店铺管理新增'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="店铺编号：" prop="code">
							<el-input v-model="formData.code" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="店铺地址：" prop="province_id" style="display: inline-block;">
							<el-select v-model="formData.province_id" @change="linkageChange(formData.province_id,'cityData','city')">
								<el-option label="请选择省" value="" @click.native="formData.city_id = '';formData.city_id = ''"></el-option>
								<el-option v-for="(item,index) in provinceData" :label="item.name" :value="item.id" :key="index" @click.native="formData.city_id = '';formData.county_id = ''"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="city_id" label-width="10px" style="display: inline-block;">
							<el-select v-model="formData.city_id" @change="linkageChange(formData.city_id,'areaData','area')">
								<el-option label="请选择市" value="" @click.native="formData.county_id = ''"></el-option>
								<el-option v-for="(item,index) in cityData" :label="item.name" :value="item.id" :key="index" @click.native="formData.county_id = ''"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="county_id" label-width="10px" style="display: inline-block;">
							<el-select v-model="formData.county_id">
								<el-option label="请选择区" value=""></el-option>
								<el-option v-for="(item,index) in areaData" :label="item.name" :value="item.id" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="" prop="" label-width="130px">
						</el-form-item>
						<el-form-item label="店铺位置：  经度" prop="lng" label-width="130px" style="display:inline-block;">
							<el-input v-model.number="formData.lng" placeholder="请输入经度" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="纬度" prop="lat" style="display:inline-block;">
							<el-input v-model.number="formData.lat" placeholder="请输入纬度" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="" label-width="10px" style="display:inline-block;">
							<el-button type="success" size="mini" @click="mapVisible = true;mapfilter.address='';submitLnglat(false)">设置地图坐标</el-button>
						</el-form-item>
						<el-form-item label="店铺描述：" prop="description">
							<el-input v-model="formData.description" type="textarea" style="width:80%" :rows="4"></el-input>
						</el-form-item>
						<el-form-item label="车主姓名：" prop="manager_name">
							<el-input v-model="formData.manager_name" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="车主电话：" prop="manager_mobile">
							<el-input v-model="formData.manager_mobile" style="width:30%">
								<template slot="prepend">+86</template>
							</el-input>
						</el-form-item>
						<el-form-item label="描述：" prop="address">
							<el-input v-model="formData.address" type="textarea" style="width:80%" :rows="4"></el-input>
						</el-form-item>
						<!--<el-form-item label="描述2：" prop="content">
							<vue-html5-editor :content="formData.content" @change="formData.content = $event" :height="500"></vue-html5-editor>
						</el-form-item>-->
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--详情界面-->
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
			<!--地图界面-->
			<el-dialog :visible.sync="mapVisible" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-row :gutter="20" class="mapSearchTips clearfix">
					<!--<el-col :span="8" class="hot-search">
						<div class="hd">
							热门搜索：
						</div>
						<div class="bd clearfix">
							<span v-for="item in mapSearchData" @click="mapSearch(item)">{{ item }}</span>
						</div>
					</el-col>-->
					<el-col :span="11" class="mapSearch">
						<div class="hd">
							请输入搜索内容：
						</div>
						<div class="bd">
							<el-form :model="mapfilter" :inline="true" ref="mapPositions">
								<el-form-item  class="fl">
									<el-input type="text" style="width:103%;margin-right:15px" name="mapLat" placeholder="输入地址，如“合肥，青松集团”" v-model="mapfilter.address"></el-input>
								</el-form-item>
								<el-form-item class="fl">
									<el-button class="lnglatBtn" type="primary" size="small" @click="addressSearch()">搜 索</el-button>
								</el-form-item>
							</el-form>
							<!--<el-amap-search-box class="search-box" v-if="" :search-option="searchOption" :on-search-result="onSearchResult" placeholder="输入关键字搜索" :events="sevents"></el-amap-search-box>-->
						</div>
					</el-col>
					<el-col :span="13" class="map-result">
						<div class="hd">
							坐标获取结果：
						</div>
						<div class="bd">
							<el-form :model="mapfilters" :inline="true" ref="mapPosition">
								<el-form-item class="fr">
									<el-button class="lnglatBtn" type="primary" size="small" @click="submitLnglat(true)">确 定</el-button>
								</el-form-item>
								<el-form-item style="width:35%">
									<el-input type="text" name="mapLng" placeholder="经度" v-model="mapfilters.lng"></el-input>
								</el-form-item>
								<el-form-item style="width:35%">
									<el-input type="text" name="mapLat" placeholder="纬度" v-model="mapfilters.lat"></el-input>
								</el-form-item>
							</el-form>
						</div>
					</el-col>
				</el-row>
				<div id="mapContainer">
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="mapVisible = false" size="small">返回</el-button>
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
	import AdminApiService from '../../services/AdminApiService';
	import { mapGetters } from 'vuex'
	import { TMap } from '../../TMap'
	export default {
		name: 'ccgl',
		data() {
			return {
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
				formRules: {
					address: [{ required: true, message: '请输入店铺位置', trigger: 'blur' }],
					manager_name: [{ required: true, message: '请输入餐主姓名', trigger: 'blur' }],
					manager_mobile: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
					lng: [{ required: true, message: '请选择经度', trigger: 'blur' }],
					lat: [{ required: true, message: '请选择纬度', trigger: 'blur' }]
				},
				//新增编辑界面数据
				formData: {
					manager_name: '',
					code: '',
					address: '',
					lat: '',
					lng: '',
					description:'',
					manager_mobile: '',
					city_id: '',
					country_id: '1',
					province_id: '',
					county_id: '',
					content: ''
				},
				geocoder:'',
				imgCodeUrl:'',
				imgInfo:'',
				imgCodeVisible:false,
				mapVisible:false,
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
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.formFileds.resetFields();
			    	if(type) {
						this.saveType = 1
						if(this.exData) {
							this.exData.affairId = row.id
						}
						let list = await this.adminApi(AdminApiService).Shops.detailData(row.id);
						this.formData=Object.assign(this.formData, list)
					} else {
						this.saveType = 0
						if(this.exData) {
							this.exData.affairId = ''
						}
						delete this.formData.id
						if(fun) {
							fun()
						}
					}
					this.mapfilters={lng:'',lat:''}
				}
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
			submitLnglat(value){
				var that=this;
				TMap('3JFBZ-MHTWG-KSSQJ-IZJEJ-O4F4S-P2BNX').then(qq => {
					var center=new qq.maps.LatLng(that.formData.lat?that.formData.lat:31.866942, that.formData.lng?that.formData.lng:117.282699);
		            var map = new qq.maps.Map(document.getElementById("mapContainer"), {
		                // 地图的中心地理坐标。
		                center: center,
		                zoom: 13
		            });
		             var marker = new qq.maps.Marker({
				        position: center,
				        map: map
				    });
		            qq.maps.event.addListener(map,'click',function(event) {
		            	var latLng = event.latLng ,lat = latLng.getLat().toFixed(6),lng = latLng.getLng().toFixed(6);
			            that.mapfilters.lng = lng
			            that.mapfilters.lat = lat
			            marker.setPosition(event.latLng);
				    });
				    this.geocoder = new qq.maps.Geocoder({
				        complete : function(result){
				            map.setCenter(result.detail.location);
				            marker.setPosition(result.detail.location);
				            that.mapfilters.lng = result.detail.location.lng
			            	that.mapfilters.lat = result.detail.location.lat
				        }
				    });
		        });
		        if(value){
		        	if(this.mapfilters.lng){
		        		this.mapVisible = false
			        	this.formData.lng=this.mapfilters.lng
				        this.formData.lat=this.mapfilters.lat
		        	}else{
		        		this.$message({message:"请先选择地址再提交",type: 'warning'})
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
			this.getList(this.paginator)
			this.getListData()
		}
	}
</script>

<style scoped>
	#mapContainer{min-width:500px;min-height:500px;}
</style>
