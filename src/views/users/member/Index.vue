<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search }">
			<member-header :search = "search"></member-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<member-table :members="data"></member-table>
		</template>
	</table-list>
</template>

<script>
  /* eslint-disable */
	import Header from './Header';
	import MembersTable from './Table';
	import TableList from '@/components/TableList';
	export default {
		name: 'Members',
		components: {
			'member-header': Header,
			'member-table': MembersTable,
			'table-list': TableList
		},
		data() {
			return {
				service: 'http.members',
				event: 'members/setList',
				current: 'members/currentPage',
        query: {
				}
			};
		},
		computed: {
			model() {
				console.log(this.$store.state.members);
				return this.$store.state.members;
			},
		},
		methods: {
      search(data) {
        this.query = _.extend(this.query, data);
      }
		}
	}
</script>
