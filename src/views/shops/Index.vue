/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="searchFields" label-width="10px" ref="searchFields">
					<el-form-item prop="code">
						<el-input size="small" v-model="searchFields.code" placeholder="输入店铺编号"></el-input>
					</el-form-item>
					<el-form-item prop="province">
						<el-select size="small" v-model="searchFields.province.name">
							<el-option label="请选择省" value="" @click.native="searchFields.city.name = '';searchFields.county.name = ''"></el-option>
							<el-option v-for="(province, index) in provinces" :label="province.name" :value="province.id" :key="index"
							@click.native="searchFields.city.name = '';searchFields.county.name = ''"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="city">
						<el-select size="small" v-model="searchFields.city.name">
							<el-option label="请选择市" value="" @click.native="searchFields.county.name = ''"></el-option>
							<el-option v-for="(city, index) in cities" :label="city.name" :value="city.id" :key="index" @click.native="searchFields.county.name = ''"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="area">
						<el-select size="small" v-model="searchFields.county.name">
							<el-option label="请选择区" value=""></el-option>
							<el-option v-for="(county, index) in counties" :label="county.name" :value="county.id" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getList(getInquire(filters))">查询</el-button>
					</el-form-item>
				</el-form>
				<div>
					<el-button size="small" type="primary" icon="el-icon-plus" @click.native="getUpdate(false)">新增</el-button>
					<el-button size="small"  @click="handleExport()">导出</el-button>
				</div>
			</el-col>
			<!--列表-->
			<el-table :data="$store.state.shops.list" highlight-current-row v-loading="isLoading">
				<el-table-column prop="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="code" label="编号" min-width="80"></el-table-column>
				<el-table-column prop="boss()" label="车主" min-width="100"></el-table-column>
				<el-table-column prop="location()" label="地理位置" min-width="180"></el-table-column>
				<el-table-column prop="num" label="订单数" min-width="60"></el-table-column>
				<el-table-column prop="money" label="销售金额" min-width="100"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="success" size="mini" >查看</el-button>
						<el-button type="primary" size="mini" >编辑</el-button>
						<el-popover placement="top">
							<el-button type="success" size="mini" @click="showQRCode(false,scope.row)">支付二维码</el-button>
							<el-button type="success" size="mini" @click="showQRCode(true,scope.row)">微信参数二维码</el-button>
							<el-button slot="reference" title="更多" icon="el-icon-more" size="mini"></el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<paginator :totalNum = "totalNum" :totalPage = "totalPage" :command="command"></paginator>
			<!--二维码图片界面-->
		</div>
	</div>
</template>
<script>
/* eslint-disable */
	import Paginator from '../../components/Paginator.vue';
	import GetShopsCommand from '../../commands/GetShopsCommand';
	export default {
		name: 'Shops',
		components: {
			paginator: Paginator
		},
		data() {
			return {
				isLoading: false,
				qrCode: null,
				qrCodeTitle: null,
				searchFields: {
					code: null,
					province: {name: '',cities: []},
					city: {name: '', counties: []},
					county: {name: ''}
				}
			};
		},
		mounted() {

		},
		computed: {
			provinces () {
				return this.$store.state.provinces;
			},
			cities () {
				return this.searchFields.province.cities;
			},
			counties () {
				return this.searchFields.city.counties;
			},
			totalNum() {
				return 68;
			},
			totalPage() {
				return 5;
			},
			command() {
				return GetShopsCommand.commandName();
			}
		},
		watch: {

		},
		methods: {
		},
		created() {
			console.log('create shops moduel');
			let self = this;
			(async function(){
				console.log('mock request  shops service', await self.shops.shops());
			})();

		}
	}
</script>
<style scoped>
	#mapContainer{min-width:500px;min-height:500px;}
</style>
