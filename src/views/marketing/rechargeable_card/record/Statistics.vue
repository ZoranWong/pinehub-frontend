<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="content-scroll">
        <div class="content-box">
            <ul style="display: flex;flex-direction: row;flex-wrap: wrap;align-content: space-between;padding: 20px;">
                <li v-for="(outline,index) in depositOutline" :key="index" style="width: 25%;">
                    <el-card style="margin: 3px;" shadow="hover">
                        <div class="clearfix">
                            <span class="amount">{{outline.value}}</span>
                            <span style="float: right;">{{outline.desc}}</span>
                        </div>
                    </el-card>
                </li>
            </ul>

            <table-list :service="service" :event="event" :model="model" :current="current" :query="query">
                <template v-slot:table="{data}">
                    <record-table :consume-records="data"></record-table>
                </template>
            </table-list>
        </div>
    </div>
</template>

<script>
    import TableList from '@/components/TableList';
    import RecordTable from './Table';

    export default {
        name: "Statistics",
        components: {
            'table-list': TableList,
            'record-table': RecordTable
        },
        computed: {
            model() {
                return this.$store.state.userRechargeableCardConsumeRecords;
            }
        },
        data() {
            return {
                service: 'http.userRechargeableCardConsumeRecords',
                event: 'userRechargeableCardConsumeRecords/setList',
                current: 'userRechargeableCardConsumeRecords/currentPage',
                query: {},

                depositOutline: {
                    consume_count: {
                        'value': 0,
                        'desc': '储值总额'
                    },
                    buy_count: {
                        'value': 0,
                        'desc': '购买次数'
                    },
                    gift_count: {
                        'value': 0,
                        'desc': '赠送总额'
                    },
                    balance_amount: {
                        'value': 0,
                        'desc': '剩余储值金额'
                    }
                }
            }
        },
        async beforeMount() {
            await this.getStatistics();
        },
        methods: {
            async getStatistics() {
                let data = await this.http.userRechargeableCardConsumeRecords.statistics();
                for (let key in data) {
                    this.depositOutline[key].value = data[key];
                }
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