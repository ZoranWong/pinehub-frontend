<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="10px" ref="selectFileds">
					<el-form-item prop="name">
						<el-input size="small" v-model="filters.name" placeholder="输入餐车编号"></el-input>
					</el-form-item>
					<el-form-item prop="area">
						<el-input size="small" v-model="filters.area" placeholder="区域"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getSelectData()">查询</el-button>
					</el-form-item>
					<!--<el-form-item>
						<el-button size="small" type="primary" icon="el-icon-plus" @click="getSelectData()">新增</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small"  @click="handleExport()">导出</el-button>
					</el-form-item>-->
				</el-form>
				<div>
					<el-button size="small" type="primary" icon="el-icon-plus" @click.native="formVisible=true">新增</el-button>
					<el-button size="small"  @click="handleExport()">导出</el-button>
				</div>
			</el-col>

			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading">
				<el-table-column prop="sIndex" label="序号" width="60"></el-table-column>
				<el-table-column prop="name" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="phone" label="车主" min-width="100"></el-table-column>
				<el-table-column prop="integral" label="地理位置" min-width="150"></el-table-column>
				<el-table-column prop="num" label="订单数" min-width="60"></el-table-column>
				<el-table-column prop="money" label="销售金额" min-width="100"></el-table-column>
				<el-table-column prop="time" label="联系方式" min-width="150"></el-table-column>
				<el-table-column label="操作" width="120">
					<template scope="scope">
						<el-button type="text" size="mini" icon="search" @click="handleDetail(scope.row)">查看</el-button>
						<el-button type="text" size="mini" icon="search" @click="handleForm(true, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" :total="totalNum"></el-pagination>
			</div>
			<!--新增编辑界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="100%" :fullscreen="true" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="saveType ? '餐车管理编辑' : '餐车管理新增'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="餐车编号：" prop="number">
							<el-input v-model="formData.number" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="经度：" prop="longitude" style="display:inline-block;">
							<el-input v-model.number="formData.longitude" placeholder="请输入经度"></el-input>
						</el-form-item>
						<el-form-item label="纬度：" prop="latitude" style="display:inline-block;">
							<el-input v-model.number="formData.latitude" placeholder="请输入纬度"></el-input>
						</el-form-item>
						<el-form-item label="" label-width="10px" style="display:inline-block;">
							<el-button type="success" size="mini" @click="mapVisible = true;getMap()">设置地图坐标</el-button>
						</el-form-item>
						<!--<el-form-item label="餐车位置：" prop="area">
							<el-input v-model="formData.area" style="width:30%"></el-input>
							<el-button type="success" size="mini" icon="search" @click="mapVisible = true;getMap()">添加位置</el-button>
						</el-form-item>-->
						<el-form-item label="餐车描述：" prop="manager">
							<el-input v-model="formData.manager" type="textarea" style="width:80%" :rows="4"></el-input>
						</el-form-item>
						<el-form-item label="车主姓名：" prop="name">
							<el-input v-model="formData.name" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="车主电话：" prop="phone">
							<el-input v-model="formData.phone" style="width:30%">
								 <template slot="prepend">+86</template>
							</el-input>
						</el-form-item>
						<el-form-item label="描述：" prop="address">
							<el-input v-model="formData.address" type="textarea" style="width:80%" :rows="4"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="formSubmit()" :loading="bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--详情界面-->
			<el-dialog :visible.sync="detailVisible" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<!--<el-tabs active-name="first">
					<el-tab-pane label="餐车管理详情" name="first"></el-tab-pane>
				</el-tabs>-->
				<el-tabs active-name="first">
					<el-tab-pane label="餐车信息" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="120px">
						<el-form-item label="餐车编号：">
							<span v-text="detailData.number"></span>
						</el-form-item>
						<el-form-item label="餐车地址：">
							<span v-text="detailData.area"></span>
						</el-form-item>
						<el-form-item label="餐车车主：">
							<span v-text="detailData.name"></span>
						</el-form-item>
						<el-form-item label="联系电话：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
					</el-form>
				</div>
				<el-tabs active-name="first">
					<el-tab-pane label="餐车订单：(78单)" name="first"></el-tab-pane>
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
					</el-col>
					<el-col :span="6" class="mapSearch">
						<div class="hd">
							请输入搜索内容：
						</div>
						<div class="bd">
							<el-amap-search-box class="search-box" v-if="" :search-option="searchOption" :on-search-result="onSearchResult" placeholder="输入关键字搜索" :events="sevents"></el-amap-search-box>
						</div>
					</el-col>-->
					<el-col :span="10" class="map-result">
						<div class="hd">
							坐标获取结果：
						</div>
						<div class="bd">
							<el-form :model="mapfilters" :inline="true" ref="mapPosition">
								<el-form-item class="fr">
									<el-button class="lnglatBtn" type="primary" size="small" @click="submitLnglat">确 定</el-button>
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
		</div>
	</div>
</template>

<script>
	
	import { mapGetters } from 'vuex'
	import { TMap } from '../../TMap'
	export default {
		name: 'ccgl',
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
					name: '',
					area: ''
				},
				mapfilters:{
					lng:'',
					lat:''
				},
				formRules: {
					number: [{
						required: true,
						message: '请输入餐车编号',
						trigger: 'blur'
					}],
					area: [{
						required: true,
						message: '请输入餐车位置',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入餐主姓名',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}]
				},
				//新增编辑界面数据
				formData: {
					id: 0,
					name: '',
					number: '',
					manager: '',
					phone: '',
					area: ''
				},
				mapVisible:false,
				selectData:[{
					id:0,
					sIndex:1,
					name:"一花一世界",
					phone:"13623021023",
					integral:"100",
					label:"非会员",
					time:"2016 5.2",
					num:"12",
					money:"100"
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
</style>