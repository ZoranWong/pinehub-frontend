<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="filters" label-width="10px" ref="selectFileds">
					<el-form-item prop="name">
						<el-input size="small" v-model="filters.name" placeholder="输入手机号码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getSelectData()">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small"  @click="handleExport()">导出</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="selectData" highlight-current-row v-loading="tLoading">
				<el-table-column prop="sIndex" label="序号" width="60"></el-table-column>
				<el-table-column prop="name" label="昵称" min-width="120"></el-table-column>
				<el-table-column prop="phone" label="手机号码" min-width="100"></el-table-column>
				<el-table-column prop="integral" label="消费积分" min-width="60"></el-table-column>
				<el-table-column prop="num" label="订单数" min-width="100"></el-table-column>
				<el-table-column prop="money" label="消费金额" min-width="200"></el-table-column>
				<el-table-column prop="time" label="注册时间" min-width="150"></el-table-column>
				<el-table-column prop="label" label="标签"></el-table-column>
				<el-table-column label="操作" width="120">
					<template scope="scope">
						<el-button type="text" size="mini" icon="search" @click="handleDetail(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" :total="totalNum"></el-pagination>
			</div>
			<!--详情界面-->
			<el-dialog v-model="detailVisible" @close="dialogClose" @open="dialogOpen" size="large" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="商户管理详情" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="120px">
						<el-form-item label="商户名称：">
							<span v-text="detailData.name"></span>
						</el-form-item>
						<el-form-item label="商户编码：">
							<span v-text="detailData.code"></span>
						</el-form-item>
						<el-form-item label="负责人姓名：">
							<span v-text="detailData.manager"></span>
						</el-form-item>
						<el-form-item label="联系电话：">
							<span v-text="detailData.phone"></span>
						</el-form-item>
						<el-form-item label="备用电话：">
							<span v-text="detailData.bphone"></span>
						</el-form-item>
						<el-form-item label="邮箱：">
							<span v-text="detailData.email"></span>
						</el-form-item>
						<el-form-item label="地址：">
							<span>{{detailData.provincename + ' ' + detailData.cityname + ' ' + detailData.areaname + ' ' + detailData.address}}</span>
						</el-form-item>
						<el-form-item label="账户名：">
							<span v-text="detailData.passport"></span>
						</el-form-item>
						<el-form-item label="每月结算日：">
							<span v-text="detailData.cashdate"></span>
						</el-form-item>
						<el-form-item label="结算方式：">
							<span>{{ detailData.accounttype | formatSelect('accounttype') }}</span>
						</el-form-item>
						<el-form-item :label="cashuserName">
							<span v-text="detailData.cashuser"></span>
						</el-form-item>
						<el-form-item :label="accountName">
							<span v-text="detailData.account"></span>
						</el-form-item>
						<el-form-item v-show="detailData.accounttype == 0" label="开户行：">
							<span v-text="detailData.openbank"></span>
						</el-form-item>
						<el-form-item label="短信通知手机：">
							<span v-text="detailData.smsphone"></span>
						</el-form-item>
						<!--图片上传-->
						<el-form-item label="附件上传：" @click.native="viewImg(detailData.merchantpic)">
							<img v-for="(item, index) in formatImg(detailData.merchantpic)" :src="item" :key="index" alt="" width="50" height="50" />
						</el-form-item>
						<el-form-item label="状态：">
							<span>{{ detailData.status | formatSelect('status') }}</span>
						</el-form-item>
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
//	import { mapGetters } from 'vuex'
	export default {
		name: 'hygl',
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