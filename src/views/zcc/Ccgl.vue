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
						<el-button type="text" size="mini" icon="search" @click="detailVisible=true">查看</el-button>
						<el-button type="text" size="mini" icon="search" @click="handleDetail(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" :total="totalNum"></el-pagination>
			</div>
			<!--新增编辑界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="80%" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="saveType ? '餐车管理编辑' : '餐车管理新增'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="餐车编号：" prop="number">
							<el-input v-model="formData.number"></el-input>
						</el-form-item>
						<el-form-item label="餐车位置：" prop="area">
							<el-input v-model="formData.area"></el-input>
						</el-form-item>
						<el-form-item label="餐车描述：" prop="manager">
							<el-input v-model="formData.manager"></el-input>
						</el-form-item>
						<el-form-item label="车主姓名：" prop="name">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
						<el-form-item label="车主电话：" prop="phone">
							<el-input v-model="formData.phone"></el-input>
						</el-form-item>
						<el-form-item label="描述：" prop="address">
							<el-input v-model="formData.address"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false">取消</el-button>
					<el-button type="primary" @click.native="formSubmit()" :loading="bLoading">提交</el-button>
				</div>
			</el-dialog>
			<!--详情界面-->
			<el-dialog v-model="detailVisible" @close="dialogClose" @open="dialogOpen" size="large" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="商户管理详情" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="120px">
						<!--<el-form-item label="商户名称：">
							<span v-text="detailData.name"></span>
						</el-form-item>-->
						
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="detailVisible = false">返回</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
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
					manager: [{
						required: true,
						message: '请输入餐车描述',
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
		computed: {
		},
		watch: {

		},
		methods: {
		},
		filters: {
		},
		created() {
//			this.getSelectData()
//			this.getListData()
		},
		mounted() {

		}
	}
</script>

<style>
	
</style>