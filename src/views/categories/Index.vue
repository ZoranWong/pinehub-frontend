/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<el-col class = "c-header">
				<el-button size="small" type="primary" icon="el-icon-plus">添加新品类</el-button>
			</el-col>
			<!-- <s-header @search="search"></s-header> -->
			<!--列表-->
      <el-table  highlight-current-row :data="categories">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="#" prop="idx" min-width="80"></el-table-column>
				<el-table-column label="名称" prop="name" min-width="100"></el-table-column>
				<el-table-column label="商品数量" prop="merchandiseNum" min-width="80"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="edit(scope.row)" >编辑</el-button>
					</template>
				</el-table-column>
      </el-table>
			<!--工具条-->
			<paginator :totalNum = "totalNum" :service="service" :event="event" :totalPage = "totalPage" :currentPage="currentPage" :command="command" @change-page="changePage" :search="query"></paginator>
		</div>
	</div>
</template>
<script>

  import _ from 'underscore';
	import Paginator from '@/components/Paginator';
	import DataListCommand from '../../commands/DataListCommand';
	export default {
		name: 'Categories',
		components: {
			'paginator': Paginator
		},
		data() {
			return {
				service: 'http.categories',
				event: 'categories/setList',
				isLoading: false,
				query: {
					page: 1,
					projectId: 0,
				}
			};
		},
		computed: {
			categories() {
				return this.$store.getters['categories/currentPage'];
			},
			totalNum() {
				return this.$store.state.categories.totalNum;
			},
			totalPage() {
				return this.$store.state.categories.pageCount;
			},
			currentPage() {
				return this.$store.state.categories.currentPage;
			},
			command() {
				return DataListCommand.commandName();
			}
		},
		methods: {
			edit(data) {
				console.log(data);
			},
			search(data) {
				this.query = _.extend(this.query, data);
			},
			changePage(page) {
				this.query['page'] = page;
			}
		}
	}
</script>

<style scoped>
	.prompt{color:gray;font-size: 12px;margin-left: 120px;}
	.c-header{
		margin: 12px;
	}
</style>
<style>
	.el-input-group__prepend{padding:0 5px !important}
</style>
