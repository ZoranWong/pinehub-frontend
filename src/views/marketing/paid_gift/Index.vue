<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search }">
			<act-header :search = "search"></act-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<act-table :activities="data"></act-table>
		</template>
	</table-list>
</template>

<script>
  /* eslint-disable */
	import Header from './Header';
	import CouponTable from './Table';
	import TableList from '@/components/TableList';
	export default {
		name: 'PaidGiftActivities',
		components: {
			'act-header': Header,
			'act-table': CouponTable,
			'table-list': TableList
		},
		data() {
			return {
				service: 'http.paidGiftActivities',
				event: 'paidGiftActivities/setList',
				current: 'paidGiftActivities/currentPage',
        query: {
          status: 0
				}
			};
		},
		computed: {
			model() {
				return this.$store.state.paidGiftActivities;
			},
		},
		methods: {
      search(data) {
        this.query = _.extend(this.query, data);
      }
		}
	}
</script>
