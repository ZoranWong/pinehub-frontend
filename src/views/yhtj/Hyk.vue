<template>
	<div class="content-scroll">
		<div class="content-box" style="padding:0">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-tabs v-model="activeName">
					<el-tab-pane label="会员卡管理" name="first">
						<el-form :inline="true" :model="cardFilters" label-width="10px" ref="cardFileds" style="float:right">
							<el-form-item prop="name" label="">
								<el-input size="small" v-model="cardFilters.name" placeholder=""></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(cardFilters)">搜索</el-button>
							</el-form-item>
						</el-form>
						<div class="cardMenu">
							<el-collapse accordion v-model="activeNames">
								<el-collapse-item name='1'> 
								    <template slot="title">
								     	 无门槛会员卡
								     	 <i class="el-icon-question"></i>
								    </template>
								    <div class="showCard" v-for="(item,index) in selectData" :key="index" :style="item.background_pic_url?('background:url('+IMAGE_SERVER_HOST+'/material/view?material_src='+item.background_pic_url+') repeat;background-size: cover;border-radius: 10px 10px 0 0;background-position: 50%;'):('background:'+(formatSelect(item.color)))">
								    	<div class="header">
									        <h3 class="pull-left">{{item.title}}</h3>
									        <h4 class="pull-right">无门槛领卡</h4>
									    </div>
									    <div class="detail js-rights-area">
        									<div class="rights-area"><span class="rights-item points"></span></div>
									    </div>
									    <div class="bottom-area">
									        <div class="operate">
									        	<el-button size="small" @click.active="" type="text">查看成员</el-button> -
									            <el-button size="small" @click.active="importVisible=true" type="text">导入</el-button> -
									            <el-button size="small" @click.active="" type="text">发卡</el-button> -
									            <el-button size="small" @click.active="getUpdate(true,item.id)" type="text">编辑</el-button> 
									        </div>
									        <div class="state">{{item.sync=='0'?'同步失败':'同步成功'}}</div>
									    </div>
								    </div>
								    <div class="addCard">
								    	<h2>+</h2>
								    	<h3><el-button size="small" @click.active="getUpdate()" type="text">新建会员卡</el-button></h3>
								    </div>
								</el-collapse-item>
							</el-collapse>
						</div>
					</el-tab-pane>
					<el-tab-pane label="领取记录"  name="second">
						<el-form :inline="true" :model="receiveFilters" label-width="10px" ref="receiveFileds" style="float:right">
							<el-form-item prop="name" label="">
								<el-input size="small" v-model="receiveFilters.name" placeholder="请输入会员卡号"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(receiveFilters)">搜索</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="receiveData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="领取时间" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="会员卡号" min-width="120"></el-table-column>
							<el-table-column prop="integral" label="会员" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.get_limit">会员</p>
									<p v-else>非会员</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="会员卡|类型" min-width="100"></el-table-column>
							<el-table-column prop="num" label="售价（元）" min-width="100"></el-table-column>
							<el-table-column prop="num" label="状态" min-width="100"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="" type="text">-</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共1条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="退卡记录"  name="third">
						<el-form :inline="true" :model="checkOutFilters" label-width="10px" ref="checkOutFileds" style="float:right">
							<el-form-item prop="name" label="">
								<el-input size="small" v-model="checkOutFilters.name" placeholder="请输入会员卡号"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(checkOutFilters)">搜索</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="checkOutData" highlight-current-row v-loading="tLoading">
							<el-table-column prop="name" label="领取时间" min-width="120"></el-table-column>
							<el-table-column prop="phone" label="会员卡号" min-width="120"></el-table-column>
							<el-table-column prop="integral" label="会员" min-width="100"></el-table-column>
							<el-table-column prop="num" label="会员卡|类型" min-width="100">
								<template slot-scope="scope">
									<p>{{}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="售价（元）" min-width="100"></el-table-column>
							<el-table-column prop="num" label="状态" min-width="100"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="" type="text">-</el-button>
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
			<!--导入-->
			<el-dialog :visible.sync="importVisible" @close="dialogClose" @open="dialogOpen" width="50%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="批量导入" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="importData" v-loading="fLoading" label-width="120px" :rules="importRules" ref="importFileds">
						<el-form-item label="选会员卡：" prop="card">
							<el-select size="small" v-model="importData.card" multiple>
								<el-option label="选择无门槛卡" value=""></el-option>
								<el-option v-for="(item,index) in cardsData" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上传数据：" prop="merchantpic">
							<el-upload class="upload-demo" name="merchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/app/logo/cloud?token='+tokens" :data="exImportData" :on-success="handleSuccess" :on-remove="handleRemove" :on-error="handleError" :beforeUpload="beforeUpload">
								<el-button size="small" type="text">添加文件</el-button>
								<div slot="tip" class="el-upload__tip">当前仅支持csv格式文件（大小在10M以内）下载文件模版请严格按照模板内容填入用户数据，否则可能会出现异常</div>
							</el-upload>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="importVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="importSubmit()" :loading="bLoading" size="small">保存</el-button>
				</div>
			</el-dialog>
			<!--新建会员卡界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" width="60%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="新建会员卡" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container addCardLayout">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<h4>会员卡基本信息</h4>
						<el-form-item label="店铺名称：">
							<span v-text="formData.base_info.brand_name"></span>
						</el-form-item>
						<el-form-item label="店铺logo：">
							<img :src="formData.base_info.logo_url" alt="" style="width:50px"/>
							<p style="color:gray;font-size: 12px;">如需修改店铺信息，请在店铺设置中更新。</p>
						</el-form-item>
						<el-form-item label="卡片封面：" prop="cover">
							<el-radio-group v-model="formData.cover">
							    <div>
							    	<el-radio label="color" style="float: left;margin-top: 10px;">背景色</el-radio>
							    	<el-popover placement="bottom" width="185" trigger="hover" :disabled="formData.cover!='color'">
							    		<div class="colorLayout">
							    			<span v-for="(item,index) in colorOptions" v-on:click="eidtColor(item)" :style="'background-color:'+item.color"></span>
							    		</div>
									  <div class="showColor" slot="reference" size="small"><p :style="saveType?('background-color:'+formatSelect(formData.base_info.color)):chooseColor"></p></div>
									</el-popover>
							    	<p><span></span></p>
							    </div>
							    <div style="clear: both;margin-top: 10px;"><el-radio label="background_pic_url">封面图片</el-radio>
							    	 <!--<img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+keyImgTextUrl.content.news_item[0].thumb_url" style="width:148px" class="image">-->
							    	<img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+formData.background_pic_url" v-if="formData.background_pic_url" alt="" style="width:100px"/>
							    	<el-button size="small" @click.native="getImgMaterials()" type="text" v-if="formData.background_pic_url" :disabled="formData.cover!='background_pic_url'">重新选择图片</el-button>
							    	<el-button size="small" @click.native="getImgMaterials()" type="text" v-else :disabled="formData.cover!='background_pic_url'">选择图片</el-button>
							    </div>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="会员卡名称：" prop="base_info.title" :style="formData.base_info.title?'margin-bottom: 0;':'margin-bottom:15px'">
							<el-input v-model="formData.base_info.title" :maxlength='9' placeholder="最多可输入9个字符"></el-input>
						</el-form-item>
						<p style="color:gray;font-size: 12px;margin-left: 120px;">会员卡名称保存成功后不支持修改</p>
						 <el-form-item label="会员权益：" prop="quanyi">
						    <el-checkbox-group v-model="formData.quanyi" @change="clearQuanYi">
						      <div><el-checkbox label="包邮">包邮</el-checkbox></div>
						      <div><el-checkbox label="会员折扣"></el-checkbox>
						      	<el-form-item label="" label-width="10px" prop="discount" style="display: inline-block;">
						      		<el-input size="small" v-model.number="formData.discount" style="width:30%;margin:0 10px;"></el-input>  折
						      	</el-form-item>
						      </div>
						      <!--<div><el-checkbox label="优惠券  " class="discountAfter"></el-checkbox>
						      	<el-form-item label="" label-width="10px" prop="sets" style="display: inline-block;width:20%;">
								      <el-select size="small" v-model="formData.sets" style="display: inline-block;">
								      	<el-option label="请选择优惠券" value="" ></el-option>
										<el-option v-for="(item,index) in options[0]" :label="item.value" :value="item.id" :key="index"></el-option>
									  </el-select>
								</el-form-item>
								<el-form-item label="" label-width="10px" prop="zheng" style="display: inline-block;">
							  		<el-input v-model="formData.zheng" style="width:30%;"></el-input> 张
							  </el-form-item>
						      </div>-->
						      <div><el-checkbox label="送积分" class="discountsAfter"></el-checkbox>
						      	<el-form-item label="" label-width="10px" prop="bonus_rule.init_increase_bonus" style="display: inline-block;">
						      		<el-input v-model.number="formData.bonus_rule.init_increase_bonus" style="width:30%;"> </el-input> 积分
						    	 </el-form-item>
						      </div>
						    </el-checkbox-group>
						</el-form-item>
						<el-form-item label="使用须知：" prop="base_info.description">
							<el-input v-model="formData.base_info.description" type="textarea" :rows="3" :maxlength='300' placeholder="会员特权会跟你您上文的勾选情况系统自动生成，此处可填写其他补充信息以便会员知晓，最多可输入300个字符"></el-input>
						</el-form-item> 
						<el-form-item label="客服电话：" prop="base_info.service_phone">
							<el-input v-model="formData.base_info.service_phone" placeholder="请输入手机号或固定电话"></el-input>
						</el-form-item>
						
						<h4>领取设置</h4>
						<el-form-item label="会员期限：" prop="base_info.date_info.type" v-if="saveType">
							<el-radio-group v-model="formData.base_info.date_info.type" @change="clearDataInfo">
								<div><el-radio label="DATE_TYPE_PERMANENT" disabled> 无限期</el-radio> </div>
							    <div style="margin:10px 0;" v-if="formData.base_info.date_info.fixed_term">
							    	<el-radio label="DATE_TYPE_FIX_TERM" disabled>
								    	<el-form-item label="" label-width="0px" style="display: inline-block;">
								    		<span v-text="formData.base_info.date_info.fixed_term"></span>  天
								    	</el-form-item>
							    	</el-radio>
							    </div>
							    <div v-else>
							    	<el-radio label="DATE_TYPE_FIX_TIME_RANGE" :disabled="formData.base_info.date_info.fixed_term?true:false">
								    	<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" :disabled="formData.base_info.date_info.type!='DATE_TYPE_FIX_TIME_RANGE' || formData.base_info.date_info.fixed_term?true:false" v-model="formData.base_info.date_info.begin_timestamp" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="开始时间" style="width:30%;margin-right:10px"></el-date-picker>
								    	<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" :disabled="formData.base_info.date_info.type!='DATE_TYPE_FIX_TIME_RANGE' || formData.base_info.date_info.fixed_term?true:false" v-model="formData.base_info.date_info.end_timestamp" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="结束时间" style="width:30%"></el-date-picker>
							    	</el-radio>
							    </div>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="会员期限：" prop="base_info.date_info.type" v-else>
							<el-radio-group v-model="formData.base_info.date_info.type" @change="clearDataInfo">
								<div><el-radio label="DATE_TYPE_PERMANENT"> 无限期</el-radio> </div>
							    <div style="margin:10px 0;">
							    	<el-radio label="DATE_TYPE_FIX_TERM">
								    	<el-form-item label="" label-width="0px" prop="base_info.date_info.fixed_term" style="display: inline-block;">
								    		<el-input v-model.number="formData.base_info.date_info.fixed_term" style="width:30%" :disabled="formData.base_info.date_info.type!='DATE_TYPE_FIX_TERM'"></el-input>  天
								    	</el-form-item>
							    	</el-radio>
							    </div>
							    <div>
							    	<el-radio label="DATE_TYPE_FIX_TIME_RANGE">
							    		<el-form-item label="" prop="base_info.date_info.begin_timestamp" label-width="10px" style="display:inline-block;width:30%">
								    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions1" :disabled="formData.base_info.date_info.type!='DATE_TYPE_FIX_TIME_RANGE'" v-model="formData.base_info.date_info.begin_timestamp" type="datetime" :editable="false" placeholder="开始时间" ></el-date-picker>
								    	</el-form-item>
								    	<el-form-item label="" prop="base_info.date_info.end_timestamp" label-width="80px" style="display:inline-block;width:30%">
								    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions2" :disabled="formData.base_info.date_info.type!='DATE_TYPE_FIX_TIME_RANGE'" v-model="formData.base_info.date_info.end_timestamp" type="datetime" :editable="false" placeholder="结束时间"></el-date-picker>
							    		</el-form-item>
							    	</el-radio>
							    </div>
							 </el-radio-group>
						</el-form-item>
						<!--<el-form-item label="过期设置：" prop="set">
							过期后调整至
							<el-select size="small" v-model="formData.set" style="width:30%;margin:0 10px;display: inline-block;">
								<el-option v-for="(item,index) in options[0]" :label="item.value" :value="item.id" :key="index"></el-option>
							</el-select>
							<el-button size="small" @click.active="" type="text">刷新</el-button> |
							<el-button size="small" @click.active="" type="text">新建</el-button>
						</el-form-item>-->
						<el-form-item label="激活设置：" prop="activate_url" style="margin-bottom: 0;">
							<el-radio-group v-model="formData.activate_url">
							    <el-radio label="false">无需激活 </el-radio>
							    <el-radio label="true">需要激活</el-radio>
							 </el-radio-group>
						</el-form-item>
						<!--<el-form-item label="" prop="shez" style="margin-bottom: 0;" v-if="formData.jhuo==1">
							<el-checkbox-group v-model="formData.shez">
							    <el-checkbox label="0">验证手机号（必填）</el-checkbox>
							    <el-checkbox label="1">填写完整会员资料</el-checkbox>
							</el-checkbox-group>
						</el-form-item>-->
						<p style="color:gray;font-size: 12px;margin-left: 140px;">如需在线下门店使用，建议设置为“需要激活”</p>
						<el-form-item label="分享设置：" prop="base_info.can_share">
							<el-radio-group v-model="formData.base_info.can_share">
							    <el-radio label="1">允许会员分享招募新会员 </el-radio>
							    <el-radio label="0">禁止会员分享</el-radio>
							 </el-radio-group>
						</el-form-item>
						
						<h4>同步设置</h4>
						
						<el-form-item label="同步发布至：" prop="sync" style="display: inline-block;">
							<el-checkbox v-model="formData.sync">微信卡包</el-checkbox>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">保存</el-button>
				</div>
			</el-dialog>
			<!--选择图片-->
			<el-dialog :visible.sync="imgVisible" title="选择图片" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<div class="form-container" style="position: relative;">
					<div class="imgLayoutRight">
						<div class="upload">
							<el-upload class="upload-demo" name="merchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/wechat/image/material?app_id='+appId" :on-remove="handleRemove" :data="exImportData" :on-success="handleSuccess" :on-error="handleError" list-type="picture-card">
							  <el-button plain size="small">点击上传 <i class="el-icon-edit el-icon--right"></i> </el-button>
							  <div slot="tip" class="el-upload__tip">仅支持jpg、gif、png三种格式, 大小不超过1 MB </div>
							</el-upload>
						</div>
						<div class="downContent" v-if="groupImgShow">
							<div v-for="(item, index) in groupImgList" :key="index" v-on:click="chooseImg(index,item)">
								<div v-if="item.className==1" class="active">
									<p></p>
								</div>
								<img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+item.url" alt="" />
							</div>
						</div>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="imgSubmit()" size="small" type="success">确定</el-button>
						<el-button @click.native="imgVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import UserService from '../../services/UserService';
	import NoPublicService from '../../services/NoPublicService';
	export default {
		name: 'hyk',
		data() {
			let self = this;
			return {
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
				appId:'',
				groupImgShow:false,
				groupImgList:[],
				imgVisible:false,
				formData:{
					background_material_id:'',
					//自添加背景图id
					prerogative:'使用卡券买单可以享受消费积分。',//会员卡特权说明,限制1024汉字
					supply_bonus:false,//会员卡特权说明,限制1024汉字
					supply_balance:false,//会员卡特权说明,限制1024汉字
//					custom_cell1:{
//						name:'青松会员',//入口名称。
//						tips:'青松会员卡',//入口右侧提示语，6个汉字内。
//						url:'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283'//入口跳转链接。
//					},
					//以上固定字段
					background_pic_url:'',
					base_info:{
						code_type:'CODE_TYPE_QRCODE',//二维码
						notice:'付款使用',//卡券使用提醒，字数上限为16个汉字
						sku:{quantity:1000000},//商品信息。卡券库存的数量，不支持填写0，上限为100000000。
					//以上固定字段
						brand_name:'',
						title:'',//会员卡名称
						color:'Color010',
						logo_url:'',
						service_phone:'',//客服电话
						description:'',//使用说明
						date_info: {
		                    type: "",
		                    begin_timestamp: "",
		                   	end_timestamp: "",
		                   	fixed_term: ""
		                },
						can_share:''//卡券领取页面是否可分享，默认为true
					},
//					 "advanced_info": {
//					 	"time_limit":[
//					 	],//时间选择范围
//					 },
					activate_url:'',//激活会员卡的url
					bonus_rule: {//积分规则
                		init_increase_bonus: ""
		            },
		            discount:'',
					sync:false,
					
					cover:'',
					quanyi:[]
				},
				tokens:'',
				cardsData:[],
				exImportData: {
					file_field: 'merchantpic',
					affairId: '',
					needStorage: true
				},
				headers:{
					Accept: 'application/vnd.pinehub.v0.0.1+json'
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
				checkOutData:[],
				receiveData:[],
				importVisible:false,
				importData:{},
				importRules:{},
				
				checkOutFilters: {
					name: ''
				},
				receiveFilters: {
					name: ''
				},
				//列表查询字段
				cardFilters: {
					name: ''
				},
				
				formRules:{
					'base_info.title': [{ required: true, message: '会员卡名称不能为空', trigger: 'blur' }],
					quanyi: [{ required: true, message: '请至少为会员卡选择一种权益', trigger: 'blur' }],
					'base_info.description': [{ required: true, message: '使用须知不能为空', trigger: 'blur' }],
					jhuo: [{ required: true, message: '请选择激活设置', trigger: 'blur' }],
//					sync: [{ required: true, message: '授权异常！请确认已将“微信卡券权限”授权给有赞', trigger: 'blur' }]
				},
				cardRules:{},
				copyFormData:'',
				imgSaveTo:'',
				options:[[]]
			}
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
			formatImgUrl(url){
				return 'background:url('+this.IMAGE_SERVER_HOST+'/material/view?material_src='+url+') no-repeat'
			},
			clearQuanYi(val){
				if(!val.find(item => item == "会员折扣")){
					this.formData.discount=''
				}else if(!val.find(item => item == "送积分")){
					this.formData.bonus_rule.init_increase_bonus=''
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
			chooseImg(index,item){
				for(var i in this.groupImgList){
					this.groupImgList[i].className=0
				}
				this.imgSaveTo=item
				this.groupImgList[index].className=1
			},
			imgSubmit(){
				if(this.imgSaveTo){
					this.imgVisible=false
					this.formData.background_pic_url=this.imgSaveTo.url
					this.formData.background_material_id=this.imgSaveTo.media_id
					this.imgSaveTo=''
				}else{
					this.$message({ message: '请先选择图片素材再提交！', type: 'warning' })
				}
			},
			async getImgMaterials(value){
				this.submitType=value
				this.imgVisible=true
				let list = await this.adminApi(NoPublicService).getMaterialsLists(this.appId,"image")
				if(list){
					for(var i in list.item){
						list.item[i].className=0
					}
					this.groupImgList=list.item
					this.groupImgShow=true
				}
			},
			handleSuccess(response, file, fileList) {
				if(response.status_code){
					this.$message({ message: '上传失败', type: 'warning' })
				}else{
					this.groupImgList.push({url:response.data.url});
				}
				this.groupImgShow=true
			},
			handleRemove(file, fileList) {
				if(!file) return
				
			},
			//图片上传组件 before-upload 所对应的方法 可限制图片的格式大小数量等
			beforeUpload(file) {
				const isJPG = file.type === 'csv';
		        const isLt2M = file.size / 1024 / 1024 < 10;
		
		        if (!isJPG) {
		          this.$message.error('上传文件只能是CSV格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传文件大小不能超过 10MB!');
		        }
        		return isJPG && isLt2M;
			},
			eidtColor(color){
				this.chooseColor="background-color:"+color.color
				this.formData.base_info.color=color.baseColor
			},
			async getUpdate(type, id, para,fun) {
				this.formVisible = true
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.formFileds.resetFields();
			    	if(type) {
						this.saveType = 1
						if(this.exData) {
							this.exData.affairId = id
						}
						let list = await this.adminApi(UserService).MemberCards.detailData(id);
						this.formData=Object.assign(this.formData,list.member_info)
						this.formData.quanyi=["包邮","会员折扣","送积分"]
						this.formData.sync=list.sync=='0'?false:true
						this.formData.cover=this.formData.background_pic_url?'background_pic_url':'color'
						this.formData.base_info.can_share=this.formData.base_info.can_share?'1':'0'
						this.formData.base_info.date_info.begin_timestamp=this.formData.base_info.date_info.begin_timestamp?new Date(this.formData.base_info.date_info.begin_timestamp*1000):''
						this.formData.base_info.date_info.end_timestamp=this.formData.base_info.date_info.end_timestamp?new Date(this.formData.base_info.date_info.end_timestamp*1000):''
						this.formData.id=list.id
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
						delete this.copyFormData.cover
						delete this.copyFormData.quanyi
						delete this.copyFormData.sync
						let para = {
								sync:this.formData.sync,
								member_info:''
							}
						this.copyFormData.base_info.can_share=this.copyFormData.base_info.can_share=='1'?true:false
						this.copyFormData.base_info.date_info.begin_timestamp=this.copyFormData.base_info.date_info.begin_timestamp?Date.parse(this.copyFormData.base_info.date_info.begin_timestamp)/1000:''
						this.copyFormData.base_info.date_info.end_timestamp=this.copyFormData.base_info.date_info.end_timestamp?Date.parse(this.copyFormData.base_info.date_info.end_timestamp)/1000:''
						
						if(this.saveType){
							if(this.copyFormData.base_info.date_info.type=='DATE_TYPE_FIX_TIME_RANGE'){
								delete this.copyFormData.base_info.date_info.fixed_term
							}else{
								delete this.copyFormData.base_info.date_info
							}

							delete this.copyFormData.base_info.brand_name
							delete this.copyFormData.base_info.sku
							delete this.copyFormData.id
							
							para.member_info=this.copyFormData
							let data = await self.adminApi(UserService).MemberCards.updateData(this.formData.id,para);
							if(data) {
								this.getList(this.filters)
								this.$message({message:"修改成功",type: 'success'})
							}
						}else{
							para.member_info=this.copyFormData
							let data = await self.adminApi(UserService).MemberCards.createData(para);
							if(data) {
								this.getList(this.filters)
								this.$message({message:"新增成功",type: 'success'})
							}
						}
						this.formVisible = false
					}
				}
			},
			async getList(fliters, search){
				let [list, meta] = await this.adminApi(UserService).MemberCards.getLists(fliters, search);
				this.meta = meta;
				this.selectData= list;
			}
		},
		filters: {
			
		},
		created() {
			this.getList(this.filters)
			let shopInfo=JSON.parse(sessionStorage.getItem('appInfo'))
			if(shopInfo){
				this.formData.base_info.logo_url=shopInfo.logo
				this.formData.base_info.brand_name=shopInfo.name
			}
			this.appId= JSON.parse(sessionStorage.getItem('appInfo')).wechat_app_id || '';
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
	.showCard .bottom-area .operate{float:left;display: inline-block;width:180px !important}
	.showCard .bottom-area .state{float:right;color:#666;display: inline-block;width:auto}
	.discountAfter:after{content:"   开卡赠送";margin-left:15px}
	.discountsAfter:after{content:"   开卡赠送";margin-left:40px}
	
	.imgLayoutRight{
		
	}
	.imgLayoutRight .upload{
		padding:20px 15px 15px 0;
		border-bottom: 1px solid #dfe6ec;
	}
	.imgLayoutRight .downContent{
		padding:10px;
		height: 500px;
		overflow-y: scroll;
	}
	.imgLayoutRight .downContent>div{
		width:148px;
		height:148px;
		cursor: pointer;
		display: inline-block;
		position: relative;
	}
	.imgLayoutRight .downContent img,.imgTextContent img{
		width:148px;
		height:148px;
		cursor: pointer;
	}
	.imgLayoutRight .downContent .active{
		width:148px;
		height:148px;
		position: absolute;
		top:0;
		left:0;
		background: rgba(0,0,0,0.7);
	}
	.imgLayoutRight .downContent .active p,.imgTextContent .active p{
		width:46px;
		height:46px;
		background: url(../../assets/WeChat.png) 0 -2355px no-repeat;
		position: absolute;
	    top: 35%;
	    left: 35%;
	}
	
</style>
<style>
	.el-upload--picture-card{
    	background-color:none !important;
		border:none !important;
		width: auto !important;
		height: auto !important;
		line-height: 0px !important;
		vertical-align: bottom;
    }
    .el-upload--picture-card i {
	    font-size: 12px !important;
	}
	.imgLayoutRight .upload .el-upload-list--picture-card{
		display: none !important;
	}
</style>