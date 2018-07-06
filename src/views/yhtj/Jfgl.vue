<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-row :gutter="0" type="flex" align="middle" class="integralHeader">
			  <el-col :span="8">
			  	<p>可用积分</p>
			  	<p class="integralNum">5622</p>
			  </el-col>
			  <el-col :span="8">
			  	<p>已消耗积分</p>
			  	<p class="integralNum">5622</p>
			  </el-col>
			  <el-col :span="8">
			  	<p>保护内积分</p>
			  	<p class="integralNum">0</p>
			  </el-col>
			</el-row>
			<div class="integralMenu">
				<p>店铺积分通用规则</p>
			</div>
			<div class="integralNow">
				<el-button size="small" type="primary" @click.native="universalUp()">设置通用规则</el-button>
				<div>
					<p v-if="universalData.updated_at">积分通用有效期:至 {{universalData.updated_at}}</p>
					<p v-if="universalData.scope">获取数量限制:一个客户每天最多获取 {{universalData.scope}} 积分</p>
				</div>
			</div>
			<div class="integralMenu">
				<p>自定义积分规则</p>
			</div>
			<!--工具条-->
			<el-button size="small" type="primary" @click.native="getUpdate()" style="margin-bottom: 10px;">新建积分规则</el-button>
			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading">
				<el-table-column prop="type" label="奖励条件" min-width="180">
					<template scope="scope">
						<span v-if="scope.row.type == '10'">每购买金额{{scope.row.rule.order_amount}}元全部商品参加</span>
						<span v-if="scope.row.type == '11'">每成功交易{{scope.row.rule.order_count}}笔</span>
						<span v-if="scope.row.type == '9'">关注我的微信</span>
					</template>
				</el-table-column>
				<el-table-column prop="score" label="单笔奖励积分" min-width="100"></el-table-column>
				<el-table-column prop="updated_at" label="规则更新时间" min-width="180">
					<template scope="scope">
						<span>{{scope.row.updated_at.date.substr(0,19)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="num" label="已奖励总积分" min-width="100"></el-table-column>
				<el-table-column label="操作" width="100">
					<template scope="scope">
						<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button>
						|<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<p>共{{totalNum}}条，50条每页</p>
				<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
			</div>
			<!--店铺积分通用规则界面-->
			<el-dialog :visible.sync="cardVisible" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="店铺积分通用规则" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="cardData" v-loading="fLoading" label-width="120px" :rules="cardRules" ref="cardFileds">
						<el-form-item label="通用有效期：" prop="garden">
							<el-radio-group v-model="cardData.garden">
								<div><el-radio label="click">永久有效</el-radio> </div>
							    <div style="margin-top:10px;">
							    	<el-radio label="view">从获得开始至</el-radio>
							    	<!--<el-select size="small" v-model="cardData.nian" style="width:30%;margin:0 10px;display: inline-block;" :disabled="cardData.garden!='view'">
										<el-option v-for="(item,index) in options[0]" :label="item.value" :value="item.id" :key="index"></el-option>
									</el-select>-->
							    	<el-date-picker v-model="cardData.expires_at" type="date" :editable="false" placeholder="选择日期" style="width:50%;margin:0 10px;" :disabled="cardData.garden!='view'"></el-date-picker>
							    </div>
							 </el-radio-group>
						</el-form-item>
						
						<p style="color:gray;font-size: 12px;margin:-20px 0 20px 140px;">示例：如果设置为“明年01月01日”，那么用户在2018年05月01日获得的积分，将在2019年01月01日 00:00:00失效</p>

						<el-form-item label="获取数量限制：" prop="num" style="display: inline-block;">
							<el-checkbox v-model="cardData.num">一个客户每天最多获取</el-checkbox>
						</el-form-item>
						<el-form-item label="" label-width="10px" prop="score" style="display: inline-block;">
							<el-input v-model="cardData.score" style="width:50%" :disabled="!cardData.num"></el-input> 积分
						</el-form-item>
						<p></p>
						<!--<el-form-item label="积分保护期：" prop="deww" style="display: inline-block;">
							<el-checkbox v-model="cardData.deww">积分在发放后将进入</el-checkbox>
						</el-form-item>
						<el-form-item label="" label-width="10px" prop="day" style="display: inline-block;">
							<el-input v-model="cardData.day" style="width:50%" :disabled="!cardData.deww"></el-input> 天保护期，无法使用
						</el-form-item>
						<p style="color:gray;font-size: 12px;margin:-20px 0 20px 140px;">只有在买家满足交易或购买条件而发放的积分具有保护期，其他类型积分照常可使用</p>-->
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="cardVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="universalSet()" :loading="bLoading" size="small">确定</el-button>
				</div>
			</el-dialog>
			<!--新建积分规则-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="新建积分规则" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="奖励分值：" prop="score">
							<el-input v-model="formData.score" style="width:50%"></el-input>
						</el-form-item>
						<el-form-item label="通知设置：" prop="notice_user">
							<el-checkbox v-model="formData.notice_user">给粉丝发送获得了积分的通知</el-checkbox>
						</el-form-item>
						<el-form-item label="奖励条件：" prop="type" style="margin-bottom: 0;">
							<el-radio-group v-model="formData.type">
								<div><el-radio label="9">关注我的微信</el-radio> </div>
							    <div style="margin:20px 0px 10px;"><el-radio label="11">每成功交易</el-radio> 
							    	<el-form-item label="" label-width="10px" prop="rule.order_count" style="display: inline-block;" v-if="formData.type=='11'">
										<el-input v-model="formData.rule.order_count" style="width:50%"><template slot="append">笔</template></el-input> 
							    	</el-form-item>
							    	<el-form-item label="" label-width="10px" v-else style="display: inline-block;">
										<el-input style="width:50%" disabled><template slot="append">笔</template></el-input> 
							    	</el-form-item>
							    </div>
							    <div><el-radio label="10">每购买金额</el-radio> 
							    	<el-form-item label="" label-width="10px" prop="rule.order_amount" style="display: inline-block;" v-if="formData.type=='10'">
										<el-input v-model="formData.rule.order_amount" style="width:50%"><template slot="append">元</template></el-input> 
									</el-form-item>
									<el-form-item label="" label-width="10px" style="display: inline-block;" v-else>
										<el-input style="width:50%" disabled><template slot="append">元</template></el-input> 
									</el-form-item>
							    </div>
							 </el-radio-group>
						</el-form-item>
						<el-form-item label="" prop="gardens" label-width="140px" v-if="formData.type=='10'" style="margin-bottom: 0;">
							<el-radio-group v-model="formData.gardens">
								<el-radio disabled label="click">全部商品参加</el-radio>
								<el-radio disabled label="clicks">部分商品参加已选商品( 0 )个</el-radio>
							 </el-radio-group>
						</el-form-item>
						<p v-if="formData.type=='10'" style="color:gray;font-size: 12px;margin-left: 140px;">如果商品参加多个积分规则，会重复送积分；发生部分退款时, 按照实际支付金额扣除应退积分。</p>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">确定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import UserService from '../../services/UserService';
	import { mapGetters } from 'vuex'
	export default {
		name: 'jfgl',
		data() {
			return {
				selected_appid:'',
				universalData:{
					expires_at:'',	
					score:''
				},
				cardVisible:false,
				cardData:{
					type:'0',
					expires_at:'',	
					garden:'click',
					num:true,
					score:'',
					rule:{"order_count":'',"order_amount":'',"focus":''}
				},
				//列表查询字段
				filters: {
					page: 1,
					limit: 15,
					name: '',
				},
				formData:{
					notice_user:false,
					score:'',
					type:'',
					gardens:'click',
					rule:{"order_count":'',"order_amount":'',"focus":''}
				},
				formRules:{
					score: [{ required: true, message: '请输入奖励分值', trigger: 'blur' },{ validator: this.validateInt, trigger: 'blur' }],
					type: [{ required: true, message: '请选择奖励条件', trigger: 'blur' }],
					'rule.order_count': [{ required: true, message: '请输入交易笔数限制', trigger: 'blur' },{ validator: this.validateZero, trigger: 'blur' }],
					'rule.order_amount': [{ required: true, message: '请输入购买金额限制', trigger: 'blur' },{ validator: this.validateTwo, trigger: 'blur' }]
				},
				cardRules:{
					score:[{ required: true, message: '积分不能为空'},{ validator: this.validateInt, trigger: 'blur' }]
				},
				options:[[{value:"明年",id:'1'},{value:"后年",id:'2'},{value:"3年后",id:'3'},{value:"4年后",id:'4'},{value:"5年后",id:'5'}]],
				selectData:[{}]
			}
		},
		computed: {
		},
		watch: {

		},
		methods: {
			universalUp(type, row, para,fun) {
				this.cardVisible=true
				this.cardData=Object.assign(this.cardData, this.universalData)
				console.log(this.cardData)
			},
			async universalSet(){
				let self = this;
				let valid = await this.$refs.cardFileds.validate();
				if(valid){
					let result = await this.$confirm('确认提交吗？', '提示', {})
					if(result) {
						let para = Object.assign({}, this.cardData);
						console.log(para)
						let data = await self.adminApi(UserService).Integrals.createData(para);
//						let data = await self.adminApi(UserService).Integrals.updateData(para);
						console.log(data)
						if(data) {
							this.$message({message:"设置成功",type: 'success'})
						}
						this.getListT()
					}
				}
			},
			async delData(row){
		    	let result = await this.$confirm('确认删除该条数据吗？', '提示', {})
				if(result) {
		    		let list = await this.adminApi(UserService).Integrals.deleteData(row.id);
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
						let list = await this.adminApi(UserService).Integrals.detailData(row.id);
						this.formData=Object.assign(this.formData, list)
						this.formData.type=this.formData.type.toString()
						if(this.formData.notice_user){
							this.formData.notice_user=true
						}else{
							this.formData.notice_user=false
						}
					} else {
						this.saveType = 0
						this.formData.rule={order_count:'',order_amount:'',focus:''}
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
					if(result) {
						if(this.saveType){
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(UserService).Integrals.updateData(this.formData.id,para);
							console.log(data)
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
							}
						}else{
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(UserService).Integrals.createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
							}
						}
						this.getList(this.filters)
						this.formVisible = false
					}
				}
			},
			async getList(fliters, search){
				let [list, meta] = await this.adminApi(UserService).Integrals.getLists(fliters, search);
				this.meta = meta;
				this.selectData= list;
				for(var i in this.selectData){
					this.selectData[i].index=parseInt(i)+1
				}
				this.totalNum=this.meta.total
			},
			async getListT(fliters, search){
				let [list, meta] = await this.adminApi(UserService).Integrals.getListT(fliters, search);
				if(list){
					for(var i in list){
						if(list[i]=='0'){
							this.universalData= list[i];
						}
					}
				}
			}
		},
		filters: {
		},
		created() {
			this.getList(this.filters)
			this.getListT()
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.content-box{padding-top:10px}
	.integralHeader{text-align: center;background: #f5f5f5;padding: 25px;color:#888;font-size: 12px;}
	.integralHeader .integralNum{color:#666;font-size: 24px;margin-top:5px}	
	.integralMenu p{border-left: 4px solid #f70;padding-left:12px}	
	.integralMenu{background: #f5f5f5;padding:12px;margin:10px 0;color:#000;font-size: 14px;font-weight: 700;}	
	.integralNow div{padding: 15px;border: 1px solid #e5e5e5;margin-top: 10px;line-height: 25px;font-size: 12px;}
	.integralNow div p:last-child{margin-left:20px;}
</style>