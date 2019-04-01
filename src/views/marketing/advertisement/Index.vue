<template>
    <table-list :service="service" :event="event" :model="model" :current="current" :query="query">
        <template slot="header" slot-scope="{ search, searchHandler }">
            <el-button type="success" class="new-ad" @click="createNewAdvertisement">+ 创建广告</el-button>
            <advertisement-header v-model="search" @search="searchHandler"></advertisement-header>
        </template>
        <template slot="table" slot-scope="{data}">
            <advertisement-table :advertisements="data"></advertisement-table>
        </template>
    </table-list>
</template>

<script>
    import Header from './Header';
    import TableList from '@/components/TableList';
    import AdvertisementTable from './Table';
    import _ from 'underscore';

    export default {
        name: "Index",
        components: {
            'advertisement-header': Header,
            'table-list': TableList,
            'advertisement-table': AdvertisementTable,
        },
        data() {
            return {
                service: 'http.advertisements',
                event: 'advertisements/setList',
                current: 'advertisements/currentPage',
                query: {}
            }
        },
        computed: {
            model() {
                return this.$store.state.advertisements
            },
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            },
            createNewAdvertisement() {
                this.$command('CREATE_UPDATE_ENTITY_INIT', 'advertisements/createEditInit', null);
                this.$router.push({
                    name: 'advertisement-create',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .new-ad {
        margin: 6px 12px 6px 6px !important;
        float: right;
        position: absolute;
        right: 0;
        z-index: 1000;
    }
</style>