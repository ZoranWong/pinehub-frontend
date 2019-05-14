<template>
    <table-list :service="service" :event="event" :model="model" :current="current" :query="query">
        <template v-slot:header="{search,searchHandler}">
            <div class="button-panel">
                <el-button type="success" @click="switchToCreate" icon="el-icon-plus">新建卡种</el-button>
            </div>
            <rechargeable-card-header v-model="search" @search="searchHandler"></rechargeable-card-header>
        </template>
        <template v-slot:table="{data}">
            <rechargeable-card-table :rechargeableCards="data"></rechargeable-card-table>
        </template>
    </table-list>
</template>

<script>
    import TableList from '@/components/TableList';
    import Header from './Header';
    import RechargeableCardTable from './Table';
    import _ from 'underscore';

    export default {
        name: "Index",
        components: {
            'rechargeable-card-table': RechargeableCardTable,
            'rechargeable-card-header': Header,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.rechargeableCards',
                event: 'rechargeableCards/setList',
                current: 'rechargeableCards/currentPage',
                query: {}
            }
        },
        computed: {
            model() {
                return this.$store.state.rechargeableCards;
            }
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            },
            switchToCreate() {
                this.$router.push({
                    name: 'rechargeable-cards-create',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .button-panel {
        margin: 6px 12px 6px 6px !important;
        float: right;
        position: absolute;
        right: 0;
        z-index: 1000;
    }
</style>