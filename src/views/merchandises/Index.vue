<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search, searchHandler }">
			<merchandise-header :search = "search" @search="searchHandler"></merchandise-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<merchandise-table :merchandises="data"></merchandise-table>
		</template>
	</table-list>
</template>

<script>
  /* eslint-disable */
	import Header from './Header';
	import MerchandiseTable from './MerchandiseTable';
	import TableList from '@/components/TableList';
	export default {
		name: 'Merchandises',
		components: {
			'merchandise-header': Header,
			'merchandise-table': MerchandiseTable,
			'table-list': TableList
		},
		data() {
			return {
				service: 'http.merchandises',
				event: 'merchandises/setList',
				current: 'merchandises/currentPage',
        query: {
				}
			};
		},
		computed: {
			model() {
				return this.$store.state.merchandises;
			},
		},
		methods: {
	      search(data) {
	        this.query = _.extend(this.query, data);
	      }
		}
	}
</script>
