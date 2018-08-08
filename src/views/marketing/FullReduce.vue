<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-tabs v-model="activeName" type="card" @tab-click="switchMenu"> 
					<el-tab-pane label="所有促销" name="first">
						<!--<el-form :inline="true" :model="couponsFilters" label-width="10px" ref="couponsFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="couponsFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(couponsFilters)">搜索</el-button>
							</el-form-item>
						</el-form>-->
						<el-form :inline="true"  label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建满减满送</el-button>
							</el-form-item>
						</el-form>
						<el-table :data="levelsData" highlight-current-row v-loading="$store.state.common.tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="get_limit" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="订单实付金额" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款订单数" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款人数" min-width="80"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text" disabled>删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{$store.state.fullReduce.totalNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="未开始"  name="second">
						<!--<el-form :inline="true" :model="nostartFilters" label-width="10px" ref="nostartFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="nostartFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(nostartFilters)">搜索</el-button>
							</el-form-item>
						</el-form>-->
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="nostartData" highlight-current-row v-loading="$store.state.common.tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="get_limit" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="订单实付金额" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款订单数" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款人数" min-width="80"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text" disabled>删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{nostartNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="进行中"  name="third">
						<!--<el-form :inline="true" :model="processFilters" label-width="10px" ref="processFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="processFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getList(processFilters)">搜索</el-button>
							</el-form-item>
						</el-form>-->
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="processData" highlight-current-row v-loading="$store.state.common.tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="get_limit" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="订单实付金额" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款订单数" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款人数" min-width="80"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{processNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="已结束"  name="forth">
						<!--<el-form :inline="true" :model="endFilters" label-width="10px" ref="endFileds" style="float:right">
							<el-form-item prop="ticket_type" label="">
								<el-input size="small" v-model="endFilters.ticket_type" placeholder="搜索"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="primary" @click="getSelectData()">搜索</el-button>
							</el-form-item>
						</el-form>-->
						<el-form :inline="true" label-width="10px" style="float:left">
							<el-form-item label="">
								<el-button size="small" type="success" @click="getUpdate()">新建优惠券</el-button>
							</el-form-item>
						</el-form>
						<!--列表-->
						<el-table :data="endData" highlight-current-row v-loading="$store.state.common.tLoading">
							<el-table-column prop="name" label="活动名称" min-width="120"></el-table-column>
							<el-table-column prop="" label="有效时间" min-width="140">
								<template slot-scope="scope">
									<p>{{scope.row.begin_at?scope.row.begin_at.date.substr(0,19):''}} 至</p>
									<p>{{scope.row.end_at?scope.row.end_at.date.substr(0,19):''}}</p>
								</template>
							</el-table-column>
							<el-table-column prop="get_limit" label="活动状态" min-width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.status==0">未开始</p>
									<p v-if="scope.row.status==1">进行中</p>
									<p v-if="scope.row.status==2">已结束</p>
									<p v-if="scope.row.status==3">失效</p>
								</template>
							</el-table-column>
							<el-table-column prop="num" label="订单实付金额" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款订单数" min-width="80"></el-table-column>
							<el-table-column prop="num" label="付款人数" min-width="80"></el-table-column>
							<el-table-column label="操作" width="100">
								<template slot-scope="scope">
									<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button> -
									<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--工具条-->
						<div class="toolbar" style="text-align: right;">
							<p>共{{endNum}}条，每页20条</p>
							<!--<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>-->
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<!--新增编辑界面-->
			<el-dialog :visible.sync="formVisible" @close="$dialogClose" @open="$dialogOpen" :modal="false" :top="$store.state.common.scrollTop" width="80%" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="设置满减送" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="$store.state.common.fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<h4>活动信息</h4>
						<el-form-item label="活动名称：" prop="name">
							<el-input v-model="formData.name" style="width:30%"></el-input>
						</el-form-item>
						<el-form-item label="生效时间：" prop="begin_at" style="display: inline-block;">
				    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" @change="getBeginTime" v-model="formData.begin_at" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="开始时间" style=""></el-date-picker>
				    	</el-form-item>
				    	<el-form-item label-width="10px" prop="" style="display: inline-block;">
				    		至
				    	</el-form-item>
				    	<el-form-item label="" prop="end_at" label-width="10px" style="display: inline-block;">
				    		<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.end_at" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="结束时间" style=""></el-date-picker>
				    	</el-form-item>
						
						<h4>优惠设置</h4>
						<el-table :data="formData.gift"  v-loading="$store.state.common.tLoading">
							<el-table-column prop="level_type" label="层级" width="60"></el-table-column>
							<el-table-column prop="condition.least_amount" label="优惠门槛" min-width="220">
								<template slot-scope="scope">
									满 <el-input-number style="width: 30%;" :debounce="600" v-model="formData.gift[scope.$index].condition.least_amount"
										 :min="scope.$index > 0 ? formData.gift[scope.$index-1].condition.least_amount+1 : formData.gift[scope.$index].condition.least_amount" :max="formData.gift.length > (scope.$index + 1) ? (formData.gift[scope.$index+1].condition.least_amount) : 100000"  :controls="false"></el-input-number>  元
									<!--<el-select size="small" v-model="gift[0].type" style="width: 30%;margin-left:10px">
									 	<el-option label="元" value="元"></el-option>
									 	<el-option label="件" value="件"></el-option>
									</el-select>-->
								</template>
							</el-table-column>
							<el-table-column prop="levelType" label="优惠方式(可多选)" min-width="220">
								<template slot-scope="scope">
									<el-checkbox-group v-model="formData.gift[scope.$index].levelType">
									    <div><el-checkbox label="减现金">减{{filterTypes(formData.gift[scope.$index],'减现金')?'':'现金'}}
									    	<el-form-item label="" prop="cost" label-width="5px" v-if="filterTypes(formData.gift[scope.$index],'减现金')" style="display: inline-block;margin-bottom:0">
												<el-input v-model="formData.gift[scope.$index].cost" style="width:30%"></el-input> 元
											</el-form-item>
									    </el-checkbox></div>
									    <div><el-checkbox label="打折">打{{filterTypes(formData.gift[scope.$index],'打折')?'':'折'}}
									    	<el-form-item label="" prop="discount" label-width="5px" v-if="filterTypes(formData.gift[scope.$index],'打折')" style="display: inline-block;margin-bottom:0">
												<el-input v-model="formData.gift[scope.$index].discount" style="width:30%"></el-input> 折
											</el-form-item>
									    </el-checkbox></div>
									    <!--<div><el-checkbox label="免邮"></el-checkbox></div>-->
									    <div><el-checkbox label="送积分">送{{filterTypes(formData.gift[scope.$index],'送积分')?'':'积分'}}
									    	<el-form-item label="" prop="score" label-width="5px" v-if="filterTypes(formData.gift[scope.$index],'送积分')" style="display: inline-block;margin-bottom:0">
												<el-input v-model="formData.gift[scope.$index].score" style="width:30%"></el-input> 积分
											</el-form-item>
									    </el-checkbox></div>
									    <div><el-checkbox label="送优惠">送{{filterTypes(formData.gift[scope.$index],'送优惠')?'':'优惠'}}
									    	<div v-if="filterTypes(formData.gift[scope.$index],'送优惠')" style="display: inline-block;">
									    	<el-form-item label="" prop="ticket_id" label-width="5px" style="display: inline-block;margin-bottom:0;width:40%;">
												<el-select size="small" v-model="formData.gift[scope.$index].ticket_id" style="">
													<el-option v-for="(item,index) in ticketList" :label="item.title" :value="item.id" :key="index"></el-option>
												</el-select>
											</el-form-item>
									    	<el-form-item label="" prop="ticket_number" label-width="5px" style="display: inline-block;margin-bottom:0;width:20%">
												<el-input v-model="formData.gift[scope.$index].ticket_number" style=""></el-input> 张
											</el-form-item>
											<el-button type="text" @click="$router.push({path: '/Yhq'})" style="margin-left:25px !important">|新建 </el-button>
											</div>
									    </el-checkbox></div>
									    <!--<div><el-checkbox label="送赠品"></el-checkbox></div>-->
									</el-checkbox-group>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="70" align="center">
								<template slot-scope="scope" v-if="scope.$index != 0">
									<el-button type="danger" :loading="$store.state.common.bLoading" size="mini" :disabled="scope.$index == 0 || scope.$index != formData.gift.length - 1" @click="levelDel(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div style="" v-if="formData.gift.length<5">
							<el-button type="text" @click="addLevel">+新增一级优惠  </el-button><span style="margin-left:10px;color:#999"> 最多可设置五个层级 (每级优惠不累加)</span>
						</div>
						<!--<h4>选择活动商品</h4>
						<el-form-item label="活动商品：" prop="garden">
							<el-radio-group v-model="formData.garden">
							    <div><el-radio label="click" disabled>所有商品参加</el-radio>（满足优惠门槛后，分销商品的优惠将由分销商承担）</div>
							    <div><el-radio label="view" disabled>部分商品参加</el-radio>(已选0)个</div>
							 </el-radio-group>
						</el-form-item>-->
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="$store.state.common.bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--详情界面-->
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	export default {
		name: 'mjs',
		data() {
			let self=this;
			return {
				nostartData:[],
				levelsData:[],
				processData:[],
				processNum:'',
				nostartNum:'',
				endNum:'',
				endData:[],
				activeName:'first',
		        pickerOptions2:{
		          	disabledDate(time) {
			          	const d = self.formData.begin_at?Date.parse(self.formData.begin_at) + 24 * 60 * 60 * 1000:''
			            return time.getTime() < (d?d:Date.now()) - 8.64e7;
		           	}
		        },		
				pickerOptions1:{
		          	disabledDate(time) {
		            	return time.getTime() < Date.now() - 8.64e7;
		           	}
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
				//列表查询字段
				filters: {
					page:1,
					limit:10,
					status:'',
					type: 'PAY_FULL',
					begin_at: '',
					end_at: ''
				},
				formRules: {
					name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
					begin_at: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
					end_at: [{ required: true, message: '请选择结束时间', trigger: 'blur' }]
				},
				//新增编辑界面数据
				formData: {
					type: 'PAY_FULL',
					name: '',
					begin_at: '',
					end_at: '',
					status: '',
					gift:[{
						level_type:1,
						levelType:[],
						cost:'',
						discount:'',
						ticket_id:'',
						ticket_number:'',
						score:'',
						condition:{least_amount:0}
					}]
				},
				ticketList:[],
				meta:{},
				formVisible:false
			};
		},
		mounted() {
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
			setFilters(type,value){
				if(type==0){
					this.filters.status=''
					return this.getInquire(this.filters) 
				}else if(type==1){
					this.filters.status='0'
					return this.getInquire(this.filters)
				}else if(type==2){
					this.filters.status='1'
					return this.getInquire(this.filters)
				}else if(type==3){
					this.filters.status='2'
					return this.getInquire(this.filters)
				}
			},
			switchMenu(val){
				if(val.name=='first'){
					this.getList(this.filters)
				}else if(val.name=='second'){
					this.getMenuList(this.setFilters('1'),'1')
				}else if(val.name=='third'){
					this.getMenuList(this.setFilters('2'),'2')
				}else{
					this.getMenuList(this.setFilters('3'),'3')
				}
			},
			async getMenuList(filters,type){
				let para=filters
				let [list, meta] = await this.adminApi(ActivityService).FullActivitys.getLists(para);
				if(type==0){
					this.activityData= list;
					this.totalNum=meta.total
				}else if(type==1){
					this.nostartData= list;
					this.nostartNum=meta.total
				}else if(type==2){
					this.processData= list;
					this.processNum=meta.total
				}else if(type==3){
					this.endData= list;
					this.endNum=meta.total
				}
			},
			getBeginTime(val){
				if(Date.parse(new Date())==Date.parse(val)){
					this.formData.status=1
				}else if(Date.parse(new Date())<Date.parse(val)){
					this.formData.status=0
				}
			},
			filterTypes(item,value){
				if(item.levelType.length){
					for(let i in item.levelType){
						if(item.levelType[i]==value){
							return true
						}
					}
				}else{
					return false
				}
			},
			levelDel(index){
				this.formData.gift.splice(index, 1)
			},
			addLevel(){
				this.formData.gift.push({
					level_type:this.formData.gift.length+1,
					levelType:[],
					cost:'',
					discount:'',
					ticket_id:'',
					ticket_number:'',
					score:'',
					condition:{least_amount:this.formData.gift[this.formData.gift.length-1].condition.least_amount + 1}
				})
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
						let list = await this.adminApi(ActivityService).FullActivitys.detailData(row.id);
						this.formData=Object.assign(this.formData, list)
						this.formData.begin_at=this.formData.begin_at?this.formData.begin_at.date.substr(0,19):''
						this.formData.end_at=this.formData.end_at?this.formData.end_at.date.substr(0,19):''
					} else {
						this.saveType = 0
						this.formData.gift=[{
							level_type:1,
							levelType:[],
							cost:'',
							discount:'',
							ticket_id:'',
							ticket_number:'',
							score:'',
							condition:{least_amount:0}
						}]
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
				let list = await this.adminApi(ActivityService).FullActivitys.detailData(row.id);
				this.detailData=list
				this.detailVisible = true
				this.$nextTick(() => {
					this.adapt()
				})
			},
			async createSubmit(beforeSave,afterSave) {
				console.log(this.formData)
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
							let data = await self.adminApi(ActivityService).FullActivitys.updateData(this.formData.id,para);
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
							}
						}else{
							let para = Object.assign({}, this.formData);
							let data=await self.adminApi(ActivityService).FullActivitys.createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
							}
						}
						this.getList(this.filters)
						this.formVisible = false
					}
				}
			},
			async getLists(){
				let [list, meta] = await this.adminApi(CardsService).Coupons.getLists(this.paginator);
				this.ticketList=list
			},
			async getList(fliters){
				let [list, meta] = await this.adminApi(ActivityService).FullActivitys.getLists(fliters);
				this.meta = meta;
				this.levelsData= list;
				this.totalNum=this.meta.total
			}
		},
		filters: {
		},
		created() {
//			this.getList(this.filters)
//			this.getLists()
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