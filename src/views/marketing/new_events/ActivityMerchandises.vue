<template>
    <table-list :service = "service" :event = "event" :current = "current" :model = "model" :query = "query">
        <template slot = "header" slot-scope = "{ search, searchHandler }">
            <merchandise-header v-model = "search" @search = "searchHandler">
                <template slot = "opt-buttons">
                    <div class = "opt-buttons">
                        <el-button size = "small" type = "primary" icon = "el-icon-plus" @click = "addMerchandise">添加活动商品</el-button>
                    </div>
                </template>
            </merchandise-header>
        </template>
        <template slot = "table" slot-scope = "{ data }">
            <merchandise-table :merchandises = "data"></merchandise-table>
        </template>
    </table-list>
</template>

<script>
    /* eslint-disable */
    import Header from '@/components/MerchandisesHeader';
    import MerchandiseTable from '@/components/MerchandisesTable';
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
            },
            addMerchandise() {

            }
        }
    }
</script>
