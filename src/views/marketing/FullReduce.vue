<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-col :span="24" class="toolbar">
				<el-tabs v-model="activeName" type="card">
					<el-tab-pane label="所有促销" name="first">
					</el-tab-pane>
					<el-tab-pane label="未开始"  name="second">
					</el-tab-pane>
					<el-tab-pane label="进行中"  name="third">
					</el-tab-pane>
					<el-tab-pane label="已结束"  name="forth">
					</el-tab-pane>
				</el-tabs>
			</el-col>
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
