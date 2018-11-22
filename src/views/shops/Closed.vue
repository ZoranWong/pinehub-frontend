/* eslint-disable */
<template>
	<table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
		<template slot = "header" slot-scope="{ search }">
			<shop-header :search = "search"></shop-header>
		</template>
		<template slot = "table" slot-scope="{ data }">
			<shop-table :shops="data"></shop-table>
		</template>
	</table-list>
</template>
<script>
    /* eslint-disable */
    import Header from './Header';
    import ShopTable from './ShopTable';
    import TableList from '@/components/TableList';
    export default {
        name: 'ClosedShops',
        components: {
            'shop-table': ShopTable,
            'shop-header': Header,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.shops',
                event: 'shops/setList',
                current: 'shops/currentPage',
                query: {
                    status: 2
                }
            };
        },
        computed: {
            model() {
                return this.$store.state.shops;
            }
        }
    }
</script>
