<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search, searchHandler }">
			<customer-header v-model = "search" @search="searchHandler"></customer-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<customer-table :customers="data"></customer-table>
		</template>
	</table-list>
</template>

<script>
    /* eslint-disable */
    import Header from './Header';
    import CustomersTable from './Table';
    import TableList from '@/components/TableList';
    export default {
        name: 'CouponCards',
        components: {
            'customer-header': Header,
            'customer-table': CustomersTable,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.customers',
                event: 'customers/setList',
                current: 'customers/currentPage',
                query: {
                    status: 0
                }
            };
        },
        computed: {
            model() {
                return this.$store.state.customers;
            },
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            }
        }
    }
</script>
