<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-dialog :visible.sync="formVisible" @close="$dialogClose" @open="$dialogOpen" :modal="false" :top="$store.state.common.scrollTop" width="100%" :fullscreen="true" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="$store.state.common.saveType ? '店铺管理编辑' : '店铺管理新增'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="$store.state.common.fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="店铺编号：" prop="code">
							<el-input v-model="formData.code" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="店铺地址：" prop="province_id" style="display: inline-block;">
							<el-select v-model="formData.province_id" @change="linkageChange(formData.province_id,'cityData','city')">
								<el-option label="请选择省" value="" @click.native="formData.city_id = '';formData.city_id = ''"></el-option>
								<el-option v-for="(item,index) in $store.state.common.provinceData" :label="item.name" :value="item.id" :key="index" @click.native="formData.city_id = '';formData.county_id = ''"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="city_id" label-width="10px" style="display: inline-block;">
							<el-select v-model="formData.city_id" @change="linkageChange(formData.city_id,'areaData','area')">
								<el-option label="请选择市" value="" @click.native="formData.county_id = ''"></el-option>
								<el-option v-for="(item,index) in $store.state.common.cityData" :label="item.name" :value="item.id" :key="index" @click.native="formData.county_id = ''"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="county_id" label-width="10px" style="display: inline-block;">
							<el-select v-model="formData.county_id">
								<el-option label="请选择区" value=""></el-option>
								<el-option v-for="(item,index) in $store.state.common.areaData" :label="item.name" :value="item.id" :key="index"></el-option>
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
					<el-button type="primary" @click.native="createSubmit()" :loading="$store.state.common.bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--地图界面-->
			<el-dialog :visible.sync="mapVisible" @close="$dialogClose" @open="$dialogOpen" width="80%" :modal="false" :top="$store.state.common.scrollTop" :close-on-click-modal="false">
				<el-row :gutter="20" class="mapSearchTips clearfix">
					<el-col :span="11" class="mapSearch">
						<div class="hd">请输入搜索内容：</div>
						<div class="bd">
							<el-form :model="mapfilter" :inline="true" ref="mapPositions">
								<el-form-item  class="fl">
									<el-input type="text" style="width:103%;margin-right:15px" name="mapLat" placeholder="输入地址，如“合肥，青松集团”" v-model="mapfilter.address"></el-input>
								</el-form-item>
								<el-form-item class="fl">
									<el-button class="lnglatBtn" type="primary" size="small" @click="addressSearch()">搜 索</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-col>
					<el-col :span="13" class="map-result">
						<div class="hd">坐标获取结果：</div>
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
				<div id="mapContainer"></div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="mapVisible = false" size="small">返回</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'DingCarAddComponent',
		props: ['formVisible'],
		data() {
		    return {
		    	mapfilter:{
					address:''
				},
				mapfilters:{
					lng:'',
					lat:''
				},
		    	mapVisible:false,
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
		    }
		},
		computed:{
		    username() {
		    	if(this.formVisible)
				console.log(this.formVisible)
		    }
		},
		methods: {
		  	createSubmit(){
		  		
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
		},
		created() {
			console.log(this.formVisible)
		}
	}
</script>
<style scoped>

</style>