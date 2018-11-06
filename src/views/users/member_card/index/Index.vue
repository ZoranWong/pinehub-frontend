<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search, searchHandler }">
			<card-header v-model = "search" @search = "searchHandler"></card-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<card-table :cards="data"></card-table>
		</template>
	</table-list>
</template>

<script>
  /* eslint-disable */
	import Header from './Header';
	import MemberCardTable from './Table';
	import TableList from '@/components/TableList';
	export default {
		name: 'MemberCards',
		components: {
			'card-header': Header,
			'card-table': MemberCardTable,
			'table-list': TableList
		},
		data() {
			return {
				service: 'http.memberCards',
				event: 'memberCards/setList',
				current: 'memberCards/currentPage',
				query: {}
			};
		},
		computed: {
			model() {
				return this.$store.state.memberCards;
			},
		},
		methods: {
		    search(data) {
		        this.query = _.extend(this.query, data);
		    }
		}
	}
</script>
<style>
.el-pagination{
	display: inline-block;
}
</style>
