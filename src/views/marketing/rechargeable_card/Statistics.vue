<template>
    <div class="content-scroll">
        <div class="content-box">
            <ul style="display: flex;flex-direction: row;flex-wrap: wrap;align-content: space-between;">
                <li v-for="(outline,index) in depositOutline" :key="index" style="width: 25%;">
                    <el-card style="margin: 3px;" shadow="hover">
                        <div class="clearfix">
                            <span class="amount">{{outline.value}}</span>
                            <span style="float: right;">{{outline.desc}}</span>
                        </div>
                    </el-card>
                </li>
            </ul>

            <table-list :service="service" :event="event" :model="model" :current="current" :query="query"></table-list>
        </div>
    </div>
</template>

<script>
    import TableList from '@/components/TableList';
    import RechargeableCardTable from "./Table";

    export default {
        name: "Statistics",
        components: {
            'rechargeable-card-table': RechargeableCardTable,
            'table-list': TableList,
        },
        computed: {
            model() {
                return this.$store.state.rechargeableCards;
            }
        },
        data() {
            return {
                service: 'http.rechargeableCards',
                event: 'rechargeableCards/setList',
                current: 'rechargeableCards/currentPage',
                query: {},

                depositOutline: [
                    {
                        'key': 'amount',
                        'value': 1000000,
                        'desc': '储值总额'
                    },
                    {
                        'key': 'amount',
                        'value': 1000000,
                        'desc': '购买次数'
                    }, {
                        'key': 'amount',
                        'value': 1000000,
                        'desc': '赠送总额'
                    }, {
                        'key': 'amount',
                        'value': 1000000,
                        'desc': '剩余储值金额'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .amount {
        font-size: 30px;
        color: #b49e39;
    }
</style>