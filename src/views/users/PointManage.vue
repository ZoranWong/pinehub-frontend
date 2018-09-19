<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-row :gutter="0" type="flex" align="middle" class="integralHeader">
			  <el-col :span="8">
			  	<p>可用积分</p>
			  	<p class="integralNum">8888</p>
			  </el-col>
			  <el-col :span="8">
			  	<p>已消耗积分</p>
			  	<p class="integralNum">8888</p>
			  </el-col>
			  <el-col :span="8">
			  	<p>保护内积分</p>
			  	<p class="integralNum">8888</p>
			  </el-col>
			</el-row>
			<div class="integralMenu">
				<p>店铺积分通用规则</p>
			</div>
			<div class="integralNow">
				<el-button size="small" type="primary" @click.native="universalUp()">设置通用规则</el-button>
				<div>
					<p >积分通用有效期:至 </p>
					<p >获取数量限制:一个客户每天最多获取  积分</p>
				</div>
			</div>
			<div class="integralMenu">
				<p>自定义积分规则</p>
			</div>
			<!--工具条-->
			<el-button size="small" type="primary" @click.native="getUpdate()" style="margin-bottom: 10px;">新建积分规则</el-button>
			<!--列表-->
			<el-table  highlight-current-row >
				<el-table-column prop="type" label="奖励条件" min-width="180">
					<template slot-scope="scope">
						<span v-if="scope.row.type == '10'">每购买金额{{scope.row.rule.order_amount}}元全部商品参加</span>
						<span v-if="scope.row.type == '11'">每成功交易{{scope.row.rule.order_count}}笔</span>
						<span v-if="scope.row.type == '9'">关注我的微信</span>
					</template>
				</el-table-column>
				<el-table-column prop="score" label="单笔奖励积分" min-width="100"></el-table-column>
				<el-table-column prop="updated_at" label="规则更新时间" min-width="180">
					<template slot-scope="scope">
						<span>{{scope.row.updated_at?scope.row.updated_at.date.substr(0,19):''}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="num" label="已奖励总积分" min-width="100"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button size="small" @click.active="getUpdate(true,scope.row)" type="text">编辑</el-button>
						|<el-button size="small" @click.active="delData(scope.row)" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
/* eslint-disable */
	export default {
		name: 'pointManage',
		data() {
			return {

			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			universalUp(type, row, para,fun) {
			},
			async universalSet(){

			},
			async delData(row){

		  },
			async getUpdate(type, row, para,fun) {
			},
			async createSubmit(beforeSave,afterSave) {
			},
			async getList(fliters, search){

			},
			async getListT(fliters, search){

			}
		},
		created() {

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
