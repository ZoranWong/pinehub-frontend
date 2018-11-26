/* eslint-disable */
<template>
    <table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
        <template slot = "header" slot-scope="{ search, searchHandler }">
            <shop-header v-model = "search" @search="searchHandler" />
        </template>
        <template slot = "table" slot-scope="{ data }">
            <shop-table :shops="data" />
        </template>
    </table-list>
</template>
<script>
/* eslint-disable */
    import Header from './Header';
    import ShopTable from './ShopTable';
    import TableList from '@/components/TableList';
    export default {
        name: 'Shops',
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
