<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-tabs v-model="activeName" type="card">
					<el-tab-pane label="所有优惠券" name="first">
						<el-form :inline="true" :model="couponsFilters" label-width="10px" ref="couponsFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="couponsFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(couponsFilters)">搜索</el-button>
							</el-form-item>
						</el-form>
						<el-form :inline="true"  label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<el-table :data="couponsData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="title" label="优惠券名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="价值" min-width="100">
								<template slot-scope="scope">
									<div v-if="scope.row.card_type=='discount'" class="couponsType">
										<p>{{scope.row.discount}} 折</p>
										<p>最低消费:</p>
										<p>￥{{scope.row.least_cost}}</p>
									</div>
									<div v-if="scope.row.card_type=='cash'" class="couponsType">
										<p>{{scope.row.reduce_cost}}</p>
										<p>最低消费:</p>
										<p>￥{{scope.row.least_cost}}</p>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="get_limit" label="领取限制" min-width="100">
								<template slot-scope="scope" class="couponsType">
									<p v-if="scope.row.get_limit">一人 {{scope.row.get_limit}} 张</p>
									<p v-else>不限张数</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="有效期" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.created_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="领取人/次" min-width="100"></el-table-column>
							<el-table-column prop="num" label="已使用" min-width="80"></el-table-column>
							<el-table-column prop="num" label="领取率/使用率" min-width="150"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{totalNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="未开始"  name="second">
						<el-form :inline="true" :model="nostartFilters" label-width="10px" ref="nostartFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="nostartFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(nostartFilters)">搜索</el-button>
							</el-form-item>
						</el-form>
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="nostartData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="优惠券名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="价值" min-width="100"></el-table-column>
							<el-table-column prop="integral" label="领取限制" min-width="100"></el-table-column>
							<el-table-column prop="num" label="有效期" min-width="120">
								
							</el-table-column>
							<el-table-column prop="num" label="领取人/次" min-width="100"></el-table-column>
							<el-table-column prop="num" label="已使用" min-width="80"></el-table-column>
							<el-table-column prop="num" label="领取率/使用率" min-width="150"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共1条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="进行中"  name="third">
						<el-form :inline="true" :model="processFilters" label-width="10px" ref="processFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="processFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(processFilters)">搜索</el-button>
							</el-form-item>
						</el-form>
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="processData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="优惠券名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="价值" min-width="100"></el-table-column>
							<el-table-column prop="integral" label="领取限制" min-width="100"></el-table-column>
							<el-table-column prop="num" label="有效期" min-width="120"></el-table-column>
							<el-table-column prop="num" label="领取人/次" min-width="100"></el-table-column>
							<el-table-column prop="num" label="已使用" min-width="80"></el-table-column>
							<el-table-column prop="num" label="领取率/使用率" min-width="150"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共1条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="已结束" name="forth">
						<el-form :inline="true" :model="endFilters" label-width="10px" ref="endFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="endFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getSelectData()">搜索</el-button>
							</el-form-item>
						</el-form>
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="endData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="优惠券名称" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="价值" min-width="100"></el-table-column>
							<el-table-column prop="integral" label="领取限制" min-width="100"></el-table-column>
							<el-table-column prop="num" label="有效期" min-width="120"></el-table-column>
							<el-table-column prop="num" label="领取人/次" min-width="100"></el-table-column>
							<el-table-column prop="num" label="已使用" min-width="80"></el-table-column>
							<el-table-column prop="num" label="领取率/使用率" min-width="150"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共1条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<!--新增优惠券界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" width="60%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="设置店铺优惠券" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container addCardLayout">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<h4>优惠券基础信息</h4>
						<el-form-item label="优惠券名称：" prop="base_info.title">
							<el-input v-model="formData.base_info.title" :maxlength='10' placeholder="最多支持10个字"></el-input>
						</el-form-item>
						<el-form-item label="发放总量：" prop="base_info.sku.quantity">
							<el-input v-model.number="formData.base_info.sku.quantity" style="width:50%"><template slot="append">张</template></el-input>
						</el-form-item>
						<el-form-item label="优惠形式：" prop="card_type">
							<el-radio-group v-model="formData.card_type" @change="clearOffer">
							    <div><el-radio label="cash">指定金额 </el-radio>
							    	<el-form-item label="" label-width="10px" prop="reduce_cost" v-if="formData.card_type=='cash'">
										面值：<el-input v-model.number="formData.reduce_cost" style="width:30%" :disabled="formData.card_type!='cash'"></el-input> 
										<p style="color:gray;font-size: 12px;">同步至微信卡包,不支持金额随机</p>
									</el-form-item>
							    </div>
							    <div><el-radio label="discount">折扣</el-radio>
							    	<el-form-item label="" label-width="10px" prop="discount" style="display:inline-block" v-if="formData.card_type=='discount'">
										：<el-input v-model.number="formData.discount" style="width:30%" :disabled="formData.card_type!='discount'"></el-input> 折
									</el-form-item>
							    </div>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="使用门槛：" prop="least_cost">
							<el-radio-group v-model="formData.least_cost" @change="clearSill">
							    <div><el-radio label="">不限制 </el-radio>
							    	<el-form-item label="" label-width="10px" v-if="formData.least_cost==''">
										<span style="color:red;font-size: 12px;">请谨慎设置无门槛优惠券，避免资金损失</span>
									</el-form-item>
							    </div>
							  	<div><el-radio label="least_cost">满</el-radio>
								  	<el-form-item label="" label-width="10px" prop="advanced_info.use_condition.least_cost" style="display:inline-block">
										<el-input v-model.number="formData.advanced_info.use_condition.least_cost" style="width:30%"></el-input> 元可使用
									</el-form-item>
							  	</div>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="同步发布至：" prop="sync" style="display: inline-block;margin-bottom: 0;">
							<el-checkbox v-model="formData.sync">微信卡券（包）</el-checkbox>
						</el-form-item>
						<p style="color:gray;font-size: 12px;margin-left: 120px;">如你的微信公众号没有开通卡券权限，将由有赞代发券。同步至微信卡包后，需等待微信审核通过，才能领取；</p>
						<el-form-item label="卡券颜色：" prop="base_info.color">
							<el-popover placement="bottom" width="185" trigger="hover">
					    		<div class="colorLayout">
					    			<span v-for="(item,index) in colorOptions" v-on:click="eidtColor(item)" :style="'background-color:'+item.color"></span>
					    		</div>
							  <div class="showColor" slot="reference" size="small"><p :style="saveType?('background-color:'+formatSelect(formData.base_info.color)):chooseColor"></p></div>
							</el-popover>
						</el-form-item>
						<el-form-item label="卡券标题：" prop="base_info.brand_name" :style="formData.base_info.brand_name?'margin-bottom: 0px;':'margin-bottom: 20px;'">
							<el-input v-model="formData.base_info.brand_name" :maxlength='9' placeholder="最多可输入9个字"></el-input>
						</el-form-item>
						<p style="color:gray;font-size: 12px;margin-left: 120px;">建议填写代金券“减免金额”及自定义内容，描述卡券提供的具体优惠。例如：贝塔咖啡5元代金券</p>
						<!--<el-form-item label="卡券副标题：" prop="brand_name" >
							<el-input v-model="formData.brand_name" :maxlength='18' placeholder="最多可输入18个字"></el-input>
						</el-form-item>-->
						<h4>基本规则</h4>
						<el-form-item label="会员等级：">
							<span>所以用户领取</span>
						</el-form-item>
						<el-form-item label="每人限领：" prop="base_info.get_limit">
							 <el-select size="small" v-model="formData.base_info.get_limit">
							 	<el-option label="不限张" value="" ></el-option>
								<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<!--<el-form-item label="同步打标签：" prop="set">
							<el-input v-model="formData.phone" placeholder="选择要同步的标签" style="width:50%"></el-input>
							<el-button size="small" @click.active="" type="text">刷新</el-button> |
							<el-button size="small" @click.active="" type="text">新建</el-button>
						</el-form-item>-->
						<el-form-item label="有效期：" prop="base_info.date_info.type">
							<el-radio-group v-model="formData.base_info.date_info.type" @change="clearDataInfo">
								<div><el-radio label="DATE_TYPE_FIX_TIME_RANGE">固定日期</el-radio> 
									<div v-if="formData.base_info.date_info.type=='DATE_TYPE_FIX_TIME_RANGE'">
										<el-form-item label="" prop="base_info.date_info.begin_timestamp" label-width="10px">
								    		生效时间：<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.base_info.date_info.begin_timestamp" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="开始时间" style="width:50%;margin-right:10px"></el-date-picker>
								    	</el-form-item>
								    	<el-form-item label="" prop="base_info.date_info.end_timestamp" label-width="10px">
								    		过期时间：<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.base_info.date_info.end_timestamp" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="结束时间" style="width:50%"></el-date-picker>
								    	</el-form-item>
									</div>
								</div>
							    <div style="margin:10px 0;">
							    	<el-radio label="DATE_TYPE_FIX_TERM">领到券当日开始</el-radio>  
							    		<el-form-item label="" prop="base_info.date_info.fixed_term" label-width="0px" style="display:inline-block">
							    			<el-input v-model="formData.base_info.date_info.fixed_term" style="width:30%" v-if="formData.base_info.date_info.type=='DATE_TYPE_FIX_TERM'"></el-input><span v-else> N </span> 天内有效
							    		</el-form-item>
							    </div>
							   	<!--<div>
							    	<el-radio label="end">领到券次日开始
							    		<el-input v-model="formData.names" style="width:30%" v-if="formData.gardens=='end'"></el-input>
							    		<span v-else> N </span>
							    		天内有效</el-radio>  
							    </div>-->
							 </el-radio-group>
						</el-form-item> 
						<!--<el-form-item label="到期提醒：" prop="checkeds" style="margin-bottom: 0;">
							<el-checkbox v-model="formData.checkeds">到期前4天提醒一次</el-checkbox>
						</el-form-item>-->
						<p style="color:gray;font-size: 12px;margin-left: 120px;">过期提醒需授权公众号到有赞，未授权商家将无法推送消息。</p>
						<el-form-item label="分享设置：" prop="base_info.can_share" style="margin-bottom: 0;">
							<el-checkbox v-model="formData.base_info.can_share">允许分享优惠券</el-checkbox>
						</el-form-item> 
						<el-form-item label="适用范围：" prop="garden">
							<el-radio-group v-model="formData.garden">
							    <el-radio label="click" disabled>全店商品</el-radio>
							    <el-radio label="view" disabled>指定商品</el-radio>
							    <el-radio label="views" disabled>指定商品不可用</el-radio>
							 </el-radio-group>
						</el-form-item>
						<!--<el-form-item label="" prop="checked">
							<el-checkbox v-model="formData.checked">仅原价购买商品时可用</el-checkbox>
						</el-form-item> -->
						
						<el-form-item label="使用说明：" prop="base_info.description">
							<el-input v-model="formData.base_info.description" type="textarea" :rows="3" :maxlength='300' placeholder="填写活动的详细说明，支持换行；"></el-input>
						</el-form-item> 
						<el-form-item label="客服电话：" prop="base_info.service_phone">
							<el-input v-model="formData.base_info.service_phone" placeholder="手机号或固定电话"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">保存</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
//	import CardsService from '../../services/CardsService';
//	import { mapGetters } from 'vuex'
	export default {
		name: 'yhq',
		data() {
			let self = this;
			return {
//				pickerOptions1: {
//					disabledDate(time) {
//						const d = Date.parse(self.str) + 24 * 60 * 60 * 1000
//						return time.getTime() > Date.now() - 8.64e7 || time.getTime() < d - 8.64e7;
//					}
//				},
				pickerOptions2:{
		          	disabledDate(time) {
			          	const d = self.formData.base_info.date_info.begin_timestamp?Date.parse(self.formData.base_info.date_info.begin_timestamp) + 48 * 60 * 60 * 1000:''
			            return time.getTime() < (d?d:Date.now()) - 8.64e7;
		           	}
		        },		
				pickerOptions1:{
		          	disabledDate(time) {
		            	return time.getTime() < Date.now() - 8.64e7;
		           	}
		        },			
				chooseColor:'background-color:#2c9f67',
				colorOptions:[{color:"#63b359",baseColor:"Color010"},{color:"#2c9f67",baseColor:"Color020"},{color:"#509fc9",baseColor:"Color030"},{color:"#5885cf",baseColor:"Color040"},{color:"#9062c0",baseColor:"Color050"},{color:"#d09a45",baseColor:"Color060"},{color:"#e4b138",baseColor:"Color070"},{color:"#ee903c",baseColor:"Color080"},{color:"#dd6549",baseColor:"Color090"},{color:"#cc463d",baseColor:"Color100"}],
				activeName:'first',
				activeNames:['1'],
				nostartData:[],
				couponsData:[],
				processData:[],
				endData:[],
				cardVisible:false,
				cardData:{
					c1:'',
					c2:'',
				},
				processFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				endFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				nostartFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				//列表查询字段
				couponsFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				formData:{
					base_info:{
						logo_url:'',
						code_type:'CODE_TYPE_QRCODE',//二维码
						notice:'请出示二维码',//卡券使用提醒，字数上限为16个汉字
						sku: {
			                quantity: ''
			            },//商品信息。
					//以上固定字段
						title:'',//会员卡名称
						brand_name:'',
						color:'Color010',
						service_phone:'',//客服电话
						description:'',//使用说明
						get_limit:'',
						date_info: {
		                    type: "",
		                    begin_timestamp: "",
		                   	end_timestamp: "",
		                   	fixed_term: ""
		                },
						can_share:'true'//卡券领取页面是否可分享，默认为true
					},
					advanced_info: {
					 	use_condition:{
					 		least_cost:''
					 	},//满减
					 },
		            discount:'',
					sync:false,
					card_type:'',
					
					least_cost:'',
					garden:'click'
				},
				formRules:{
					'base_info.title': [{ required: true, message: '优惠券名称必须在 1-10 个字内', trigger: 'blur' }],
//					money: [{ required: true, message: '请输入优惠面值', trigger: 'blur' },{ type: 'number', message: '优惠券面值必须大于等于 0.01 元'}],
					'base_info.sku.quantity': [{ required: true, message: '请输入发放总量', trigger: 'blur' },{ type: 'number', message: '发放总量必须是一个整数数字值'}],
					'base_info.description': [{ required: true, message: '使用说明不能为空', trigger: 'blur' }],
					'base_info.brand_name': [{ required: true, message: '卡券标题不能为空', trigger: 'blur' }],
					titles: [{ required: true, message: '卡券副标题不能为空', trigger: 'blur' }],
					'base_info.color': [{ required: true, message: '请选择卡券颜色', trigger: 'blur' }],
					'card_type': [{ required: true, message: '请选择优惠形式', trigger: 'blur' }],
					'advanced_info.use_condition.least_cost': [{ required: true, message: '请选择使用门槛', trigger: 'blur' }],
					'base_info.get_limit': [{ required: true, message: '请选择每人限领', trigger: 'blur' }],
					gardens: [{ required: true, message: '请选择有效期', trigger: 'blur' }],
					garden: [{ required: true, message: '请选择适用范围', trigger: 'blur' }]
				},
				cardRules:{},
				options:[
					[{label:"1张",value:"1"},{label:"2张",value:"2"},{label:"3张",value:"3"},{label:"4张",value:"4"},{label:"5张",value:"5"},{label:"10张",value:"10"}]
				],
				copyFormData:''
			}
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
			clearSill(val){
				if(!val){
					this.formData.advanced_info.use_condition.least_cost=''
				}
			},
			clearOffer(val){
				if(val== "cash"){
					this.formData.discount=''
				}else if(val== "discount"){
					this.formData.reduce_cost=''
				}
			},
			clearDataInfo(val){
				if(val=='DATE_TYPE_PERMANENT'){
					this.formData.base_info.date_info.fixed_term=''
					this.formData.base_info.date_info.begin_timestamp=''
					this.formData.base_info.date_info.end_timestamp=''
				}else if(val=='DATE_TYPE_FIX_TERM'){
					this.formData.base_info.date_info.begin_timestamp=''
					this.formData.base_info.date_info.end_timestamp=''
				}else{
					this.formData.base_info.date_info.fixed_term=''
				}
			},
			formatSelect(value) {
				for(var i in this.colorOptions){
					if(this.colorOptions[i].baseColor==value){
						return this.colorOptions[i].color
					}
				}
			},
			eidtColor(color){
				this.chooseColor="background-color:"+color.color
				this.formData.base_info.color=color.baseColor
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
				this.formVisible = true
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.formFileds.resetFields();
			    	if(type) {
						this.saveType = 1
						if(this.exData) {
							this.exData.affairId = row.id
						}
						let list = await this.adminApi(CardsService).Coupons.detailData(row.id);
						this.formData=Object.assign(this.formData,list.ticket_info)
						this.formData.least_cost=list.ticket_info.advanced_info.use_condition.least_cost?'least_cost':''
						this.formData.card_type=list.ticket_type
						this.formData.sync=list.sync=='0'?false:true
						this.formData.base_info.date_info.begin_timestamp=this.formData.base_info.date_info.begin_timestamp?new Date(this.formData.base_info.date_info.begin_timestamp*1000):''
						this.formData.base_info.date_info.end_timestamp=this.formData.base_info.date_info.end_timestamp?new Date(this.formData.base_info.date_info.end_timestamp*1000):''
						this.formData.id=list.id
						this.formData.begin_at=list.begin_at?list.begin_at.date.substr(0,19):''
						this.formData.end_at=list.begin_at?list.end_at.date.substr(0,19):''
						console.log(this.formData)
					} else {
						this.saveType = 0
						this.formData.base_info.date_info={
		                    type: "",
		                    begin_timestamp: "",
		                   	end_timestamp: "",
		                   	fixed_term: ""
		                }
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
			async createSubmit(beforeSave,afterSave) {
				if(beforeSave) {
					beforeSave()
				}
				let self = this;
				this.copyFormData=JSON.parse(JSON.stringify(this.formData))
				let valid = await this.$refs.formFileds.validate();
				if(valid){
					let result = await this.$confirm('确认提交吗？', '提示', {})
					if(result) {
						if(this.formData.card_type=='discount'){
							delete this.copyFormData.least_cost
							delete this.copyFormData.reduce_cost
						}else if(this.formData.card_type=='cash'){
							delete this.copyFormData.discount
							this.copyFormData.least_cost=this.formData.advanced_info.use_condition.least_cost
						}
						delete this.copyFormData.garden
						delete this.copyFormData.sync
						delete this.copyFormData.card_type
						let para = {
								sync:this.formData.sync,
								ticket_info:'',
								ticket_type:this.formData.card_type,
								end_at:this.formData.end_at?this.formData.end_at:this.formData.base_info.date_info.end_timestamp?this.formData.base_info.date_info.end_timestamp:'',
								begin_at:this.formData.begin_at?this.formData.begin_at:this.formData.base_info.date_info.begin_timestamp?this.formData.base_info.date_info.begin_timestamp:''
							}
						this.copyFormData.base_info.date_info.begin_timestamp=this.formData.base_info.date_info.begin_timestamp?Date.parse(this.formData.base_info.date_info.begin_timestamp)/1000:''
						this.copyFormData.base_info.date_info.end_timestamp=this.formData.base_info.date_info.end_timestamp?Date.parse(this.formData.base_info.date_info.end_timestamp)/1000:''
						if(this.saveType){
							delete this.copyFormData.id
							para.ticket_info=this.copyFormData
							let data = await self.adminApi(CardsService).Coupons.updateData(this.formData.id,para);
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
								this.getList(this.filters)
							}
						}else{
							para.ticket_info=this.copyFormData
							let data = await self.adminApi(CardsService).Coupons.createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
								this.getList(this.filters)
							}
						}
						this.formVisible = false
					}
				}
			},
			async getList(fliters, search){
				let [list, meta] = await this.adminApi(CardsService).Coupons.getLists(fliters, search);
				this.meta = meta;
				this.couponsData= list;
//				for(var i in this.couponsData){
//					this.couponsData[i].index=parseInt(i)+1
//				}
				this.totalNum=this.meta.total
			}
		},
		filters: {
		},
		created() {
			this.getList(this.couponsFilters)
			let shopInfo=JSON.parse(sessionStorage.getItem('shopInfo'))
			if(shopInfo){
				this.formData.base_info.logo_url=shopInfo.logo
			}
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