<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<s-header @search="search"></s-header>
			<!--列表-->
			<m-table :merchandises = "merchandises"></m-table>
			<!--工具条-->
			<paginator :totalNum = "totalNum" :service="service" :event="event" :totalPage = "totalPage" :currentPage="currentPage" :command="command"  @change-page="changePage" :search="query"></paginator>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import Header from './Header';
	import Paginator from '@/components/Paginator';
	import MerchandiseTable from './MerchandiseTable';
	import DataListCommand from '../../commands/DataListCommand';
	export default {
		name: 'MerchandiseSelling',
		components: {
			's-header': Header,
			'paginator': Paginator,
			'm-table': MerchandiseTable
		},
		data() {
			return {
				service: 'http.merchandises',
				event: 'merchandises/setList',
				isLoading: false,
				query: {
					page: 1,
					projectId: 0,
					status: 1
				}
			};
		},
		computed: {
			merchandises() {
				return this.$store.getters['merchandises/currentPage'];
			},
			totalNum() {
				return this.$store.state.merchandises.totalNum;
			},
			totalPage() {
				return this.$store.state.merchandises.pageCount;
			},
			currentPage() {
				return this.$store.state.merchandises.currentPage;
			},
			command() {
				return DataListCommand.commandName();
			}
		},
		methods: {
			search(data) {
				this.query = _.extend(this.query, data);
			},
			changePage(page) {
				this.query['page'] = page;
			}
		},
		created() {
			//this.query = this.$router.currentRoute.query;
		}
	}
</script>

<style scoped>
	.prompt{color:gray;font-size: 12px;margin-left: 120px;}
</style>
<style>
	.el-input-group__prepend{padding:0 5px !important}
</style>
