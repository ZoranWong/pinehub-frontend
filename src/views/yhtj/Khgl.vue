<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="100px" ref="selectFileds">
					<el-form-item prop="name" label="关键词：">
						<el-input size="small" v-model="filters.name" placeholder="手机号/微信昵称/姓名"></el-input>
					</el-form-item>
					<el-form-item prop="name" label="来源渠道：">
						<el-select size="small" v-model="filters.qudao">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="name" label="购次：">
						<el-select size="small" v-model="filters.gouci">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[1]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="name" label="客户身份：">
						<el-select size="small" v-model="filters.shenfen">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[2]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="name" label="来源方式：">
						<el-select size="small" v-model="filters.type">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[3]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="name" label="标签：">
						<el-select size="small" v-model="filters.accountstatus" disabled>
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="name" label="会员卡：">
						<el-select size="small" v-model="filters.accountstatus">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getList(filters)">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<div>
						<el-button size="small" type="primary" icon="el-icon-plus" @click.native="getUpdate()">添加客户</el-button>
						<el-button size="small" plain @click.native="batchDelData()">批量导入</el-button>
					</div>
				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
				<el-table-column prop="phone" label="手机号码" min-width="120"></el-table-column>
				<el-table-column prop="integral" label="微信号/微信昵称" min-width="140"></el-table-column>
				<el-table-column prop="num" label="购次" min-width="80"></el-table-column>
				<el-table-column prop="money" label="积分" min-width="100"></el-table-column>
				<el-table-column prop="time" label="来源方式" min-width="150"></el-table-column>
				<el-table-column prop="label" label="客户身份"></el-table-column>
				<el-table-column label="操作" width="250">
					<template scope="scope">
						<el-popover placement="left-start" width="280" v-model="news">
						  <p>剩余短信数量不足，请先进行短信充值</p>
						  <!--<div style="text-align: right; margin: 0">
						    <el-button size="mini" plain @click="deleteNewsReply = false">取消</el-button>
						    <el-button type="success" size="mini" @click="">确定</el-button>
						  </div>-->
						  <el-button slot="reference"size="small" type="text">发短信</el-button>
						</el-popover>
						|<el-popover placement="left-start" width="300" v-model="labels">
						  <p style="border-bottom: 1px solid #dfe6ec;">加标签</p>
						  <div style="text-align: right; margin: 0">
						  	<el-select size="small" v-model="operateData.label" style="float: left; margin:15px 0">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						    <el-button size="mini" plain @click="labels = false">取消</el-button>
						    <el-button type="primary" size="mini" @click="giveLabel()">确定</el-button>
						  </div>
						  <el-button slot="reference"size="small" type="text">加标签</el-button>
						</el-popover>
						|<el-popover placement="left-start" width="300" v-model="integrals">
						 <p style="border-bottom: 1px solid #dfe6ec;">给积分</p>
						  <div style="">
						  	<el-form :inline="true" :model="operateData" label-width="0px" ref="operateFileds">
							  	<el-form-item label="" prop="integral" style="margin-bottom:0;" :rules="[{ required: true, message: '积分不能为空'},{ validator: validateInt, trigger: 'blur' }]">
							  		<el-input size="small" v-model="operateData.integral" placeholder="请输入要加/减的积分值（-1代表减1积分）" style="margin:15px 0;width:130%"></el-input>
							    </el-form-item>
							</el-form>
						    <el-button size="mini" plain @click="integrals = false" style="float: right;">取消</el-button>
						    <el-button type="primary" size="mini" @click="giveIntegral()" style="float: right;">确定</el-button>
						  </div>
						  <el-button slot="reference"size="small" type="text" @click="resetForm('operateFileds')">给积分</el-button>
						</el-popover>
						|<el-button size="small" @click.active="cardVisible=true" type="text">设置会员卡</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>
			</div>
			<!--设置会员卡界面-->
			<el-dialog :visible.sync="cardVisible" @close="dialogClose" @open="dialogOpen" width="50%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="设置会员卡" name="first"></el-tab-pane>
				</el-tabs>
				<div style="color:gray;border-bottom: 1px solid #dfe6ec;padding:10px 0 20px 0;margin-bottom: 20px;">
					<p>你可以在这里编辑该会员的会员卡信息，添加／删除无门槛卡、添加／删除规则卡。（暂不支持编辑付费卡）</p>
					<p>注：会员可以拥有多张零门槛卡，但只能一张规则卡</p>
				</div>
				<div class="form-container">
					<el-form :model="cardData" v-loading="fLoading" label-width="120px" :rules="cardRules" ref="cardFileds">
						<el-form-item label="无门槛卡：" prop="c1">
							<el-select size="small" v-model="cardData.c1" multiple>
								<el-option label="选择无门槛卡" value=""></el-option>
								<el-option v-for="(item,index) in cardsData" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="规则卡：" prop="c2">
							<el-select size="small" v-model="cardData.c2" multiple>
								<el-option label="选择规则卡" value=""></el-option>
								<el-option v-for="(item,index) in cardsData" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="cardVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="setMember()" :loading="bLoading" size="small">确定</el-button>
				</div>
			</el-dialog>
			<!--添加客户界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" width="50%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="添加客户" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="客户身份：" prop="type">
							<el-radio-group v-model="formData.type">
							    <el-radio label="click">非会员</el-radio>
							    <el-radio label="view">会员</el-radio>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="手机号：" prop="phone">
							<el-input v-model="formData.phone"></el-input>
						</el-form-item>
						<el-form-item label="姓名：" prop="name">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
						<!--<el-form-item label="标签：" prop="label">
							<el-select size="small" v-model="formData.label">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>-->
						<el-form-item label="性别：" prop="garden">
							<el-radio-group v-model="formData.garden">
							    <el-radio label="click">男</el-radio>
							    <el-radio label="view">女</el-radio>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="生日：" prop="bir">
							<el-input v-model="formData.bir"></el-input>
						</el-form-item>
						<el-form-item label="备注：" prop="beizhu">
							<el-input v-model="formData.beizhu" type="textarea" placeholder="备注请不要超过200字"></el-input>
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
	import UserService from '../../services/UserService';
	import { mapGetters } from 'vuex'
	export default {
		name: 'khgl',
		data() {
			return {
				news:false,
				integrals:false,
				labels:false,
				cardsData:[],
				cardVisible:false,
				operateData:{
					label:'',
					integral:''
				},
				cardData:{
					c1:'',
					c2:'',
				},
				//列表查询字段
				filters: {
					pageNum: 1,
					pagesize: 10,
					name: '',
					shenfen: '',
					type: '',
					qudao: '',
					gouci: ''
				},
				formData:{},
				formRules:{
					type: [{ required: true, message: '请选择客户身份', trigger: 'blur' }],
					phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },{ validator: this.validateTel, trigger: 'blur' }]
				},
				cardRules:{},
				options:[
					[{label:"微信",value:"微信"},{label:"微信公众号",value:"微信公众号"},{label:"微信小程序",value:"微信小程序"},{label:"支付宝",value:"支付宝"},{label:"微博",value:"微博"},{label:"QQ",value:"QQ"},{label:"今日头条",value:"今日头条"},{label:"浏览器",value:"浏览器"},{label:"其他APP",value:"其他APP"},{label:"其他",value:"其他"}],
					[{label:"0",value:"0"},{label:"1+",value:"1+"},{label:"2+",value:"2+"},{label:"3+",value:"3+"},{label:"4+",value:"4+"},{label:"5+",value:"5+"},{label:"10+",value:"10+"},{label:"15+",value:"15+"},{label:"20+",value:"20+"},{label:"30+",value:"30+"},{label:"50+",value:"50+"}],
					[{label:"会员",value:"会员"},{label:"非会员",value:"非会员"}],
					[{label:"关注公众号",value:"关注公众号"},{label:"WiFi增粉",value:"WiFi增粉"},{label:"普通下单",value:"普通下单"},{label:"扫码收款",value:"扫码收款"},{label:"外部导入",value:"外部导入"},{label:"手工导入",value:"手工导入"},{label:"三分平台",value:"三分平台"},{label:"会员储值",value:"会员储值"},{label:"APP拓客",value:"APP拓客"},{label:"领取会员卡",value:"领取会员卡"},{label:"领取优惠券",value:"领取优惠券"},{label:"咨询客户",value:"咨询客户"},{label:"其他",value:"其他"}]
				],
				selectData:[{}]
			}
		},
		computed: {
		},
		watch: {

		},
		methods: {
			giveLabel(){
				if(this.operateData.label){
					this.labels=false
				}
			},
			giveIntegral(){
				if(this.operateData.integral){
					this.integrals=false
				}
			},
			async setMember(){
				let list = await this.adminApi(UserService).Clients.setMember(this.cardData);
				console.log(list)
				if(list){
					this.$message({message:"设置成功",type: 'success'})
					this.cardVisible=false
				}
			},
			handleSelectionChange(){
				
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
						let list = await this.adminApi(UserService).Clients.detailData(row.id);
						this.formData=Object.assign(this.formData, list)
						console.log(list)
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
				}
			},
			async createSubmit(beforeSave,afterSave) {
				if(beforeSave) {
					beforeSave()
				}
				let self = this;
				let valid = await this.$refs.formFileds.validate();
				if(valid){
					let result = await this.$confirm('确认提交吗？', '提示', {})
//					if(result) {
//						if(this.saveType){
//							let para = Object.assign({}, this.formData);
//							let data = await self.adminApi(NoPublicService).updateData(this.formData.id,para);
//							console.log(data)
//							if(data) {
//								this.$message({message:"修改成功",type: 'success'})
//							}
//						}else{
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(UserService).Clients.createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
							}
//						}
						this.getList(this.filters)
						this.formVisible = false
//					}
				}
			},
			async getList(fliters, search){
				let [list, meta] = await this.adminApi(UserService).Clients.getLists(fliters, search);
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
//			this.getList(this.filters)
		},
		mounted() {

		}
	}
</script>

<style>
	
</style>