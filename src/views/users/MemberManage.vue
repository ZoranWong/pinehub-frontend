<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="100px" ref="selectFileds">
					<el-form-item prop="mobile" label="手机号码：">
						<el-input size="small" v-model="filters.mobile" placeholder=""></el-input>
					</el-form-item>
					<el-form-item prop="nickname" label="微信昵称：">
						<el-input size="small" v-model="filters.nickname" placeholder=""></el-input>
					</el-form-item>
					<el-form-item prop="channel" label="来源渠道：">
						<el-select size="small" v-model="filters.channel">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[0]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="orders_count" label="购次：">
						<el-select size="small" v-model="filters.orders_count">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[1]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="card" label="会员卡：">
						<el-select size="small" v-model="filters.card">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in cardsData" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="register_channel" label="来源方式：">
						<el-select size="small" v-model="filters.register_channel">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="(item,index) in options[3]" :label="item.label" :value="item.value" :key="index"></el-option>
						</el-select>
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
					<!--<el-form-item prop="area">
						<el-select size="small" v-model="filters.area">
							<el-option label="请选择区" value=""></el-option>
							<el-option v-for="(item,index) in cxAreaData" :label="item.name" :value="item.id" :key="index"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item>
						<el-button size="small" type="primary" @click="getList(getInquire(filters))">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading">
				<el-table-column prop="mobile" label="姓名" min-width="120"></el-table-column>
				<el-table-column prop="mobile" label="手机号码" min-width="120"></el-table-column>
				<el-table-column prop="nickname" label="微信号/微信昵称" min-width="140">
					<template slot-scope="scope">
						<p>{{scope.row.mobile}}</p>
						<p>{{scope.row.nickname}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="orders_count" label="购次" min-width="80"></el-table-column>
				<el-table-column prop="card" label="会员卡" min-width="150"></el-table-column>
				<el-table-column prop="score" label="积分" min-width="100"></el-table-column>
				<el-table-column label="操作" width="120">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="cardVisible=true">设置会员卡</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" :total="totalNum"></el-pagination>
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
					<el-form :model="cardData" v-loading="fLoading" label-width="120px" ref="cardFileds">
						<el-form-item label="无门槛卡：" prop="c1">
							<el-select size="small" v-model="cardData.c1" multiple>
								<el-option label="选择无门槛卡" value=""></el-option>
								<el-option v-for="(item,index) in cardsData" :label="item.label" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="规则卡：" prop="c2" multiple>
							<el-select size="small" v-model="cardData.c2">
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
		</div>
	</div>
</template>

<script>
//	import UserService from '../../services/UserService';
//	import { mapGetters } from 'vuex'
	export default {
		name: 'hygl',
		data() {
			return {
				paginator:{
					page:1,
					limit:10
				},
				cardsData:[],
				cardData:{
					c1:'',
					c2:'',
				},
				cardVisible:false,
				//列表查询字段
				filters: {
					province: '',
					city: '',
//					area: '',
					mobile: '',
					nickname: '',
					card: '',
					channel: '',
					register_channel: '',
					orders_count: ''
				},
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
			async setMember(){
				let list = await this.adminApi(UserService).Members.setMember(this.cardData);
				console.log(list)
				if(list){
					this.$message({message:"设置成功",type: 'success'})
					this.cardVisible=false
				}
			},
			async getList(fliters){
				let [list, meta] = await this.adminApi(UserService).Members.getLists(fliters);
				this.selectData= list;
				this.totalNum=meta.total
			}
		},
		filters: {
			
		},
		created() {
			this.getList(this.paginator)
			this.getListData()
		},
		mounted() {

		}
	}
</script>

<style>
	
</style>