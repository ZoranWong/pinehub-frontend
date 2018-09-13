/* eslint-disable */
<template>
	<div class="content-scroll">
		<div class="content-box">
			<!--工具条-->
			<shop-header></shop-header>
			<!--列表-->
			<shop-table :shops="shops"></shop-table>
			<!--工具条-->
			<paginator :totalNum = "totalNum" :service="service" :event="event" :totalPage = "totalPage" :currentPage="currentPage" :command="command"></paginator>
			<!--二维码图片界面-->
		</div>
	</div>
</template>
<script>
/* eslint-disable */
  import Header from './Header';
	import ShopTable from './ShopTable';
	import Paginator from '@/components/Paginator';
	import DataListCommand from '../../commands/DataListCommand';
	export default {
		name: 'Shops',
		components: {
			paginator: Paginator,
			'shop-table': ShopTable,
			'shop-header': Header
		},
		data() {
			return {
				service: 'http.shops',
				event: 'shops/setList',
			};
		},
		mounted() {

		},
		computed: {
			totalNum() {
				return this.$store.state.shops.totalNum;
			},
			totalPage() {
				return this.$store.state.shops.pageCount;
			},
			currentPage() {
				return this.$store.state.shops.currentPage;
			},
			shops() {
				return this.$store.getters['shops/currentPage'];
			},
			command() {
				return DataListCommand.commandName();
			}
		},
		watch: {

		},
		methods: {
		},
		created() {
			let self = this;
			console.log(self);
			(async function(){
				console.log('mock request  shops service', await self.provincesMock.mock(1, null, 10));
			})();
		}
	}
</script>
<style scoped>
	#mapContainer{min-width:500px;min-height:500px;}
</style>
