<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search }">
			<card-header :search = "search"></card-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<card-table :coupons="data"></card-table>
		</template>
	</table-list>
</template>

<script>
  /* eslint-disable */
	import Header from './Header';
	import CouponTable from './Table';
	import TableList from '@/components/TableList';
	export default {
		name: 'CouponCards',
		components: {
			'card-header': Header,
			'card-table': CouponTable,
			'table-list': TableList
		},
		data() {
			return {
				service: 'http.couponCards',
				event: 'couponCards/setList',
				current: 'couponCards/currentPage',
        query: {
          status: 0
				}
			};
		},
		computed: {
			model() {
				return this.$store.state.couponCards;
			},
		},
		methods: {
      search(data) {
        this.query = _.extend(this.query, data);
      }
		}
	}
</script>
