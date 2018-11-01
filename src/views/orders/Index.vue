<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search , searchHandler}">
			<order-header v-model = "search" @search = "searchHandler"></order-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<order-table :orders="data"></order-table>
		</template>
	</table-list>
</template>

<script>
	import OrderTable from './OrderTable';
	import Header from './Header';
	import TableList from '@/components/TableList';
	import _ from 'underscore';
	export default {
		name: 'Orders',
		components:{
			'order-table': OrderTable,
			'order-header': Header,
			'table-list': TableList
		},
		data() {
			return {
				service: 'http.orders',
				event: 'orders/setList',
				current: 'orders/currentPage',
				query: {

				}
			};
		},
		mounted() {

		},
		computed: {
			model() {
				return this.$store.state.orders;
			},
		},
		watch: {

		},
		methods: {
			search(data) {
				this.query = _.extend(this.query, data);
			}
		},
		created() {
		}
	}
</script>

<style scoped>

</style>
