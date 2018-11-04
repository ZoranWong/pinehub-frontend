<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search, searchHandler }">
			<el-button type="success" class="new-coupon" @click="createTicket">创建新活动</el-button>
			<card-header v-model = "search" @search = "searchHandler"></card-header>
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
      },
			createTicket() {
				this.$router.push({
					name: 'coupon-create',
					params: {
						projectId: this.$requestInput('projectId')
					}
				});
			}
		}
	}
</script>

<style scoped>
.new-coupon{
	margin: 6px 12px 6px 6px !important;
	float: right;
	position: absolute;
	right: 0;
	z-index: 1000;
}
</style>
<style>
.content-box {
    padding: 10px !important;
}
</style>
