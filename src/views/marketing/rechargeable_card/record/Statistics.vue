<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="content-scroll">
        <div class="content-box">
            <ul style="display: flex;flex-direction: row;flex-wrap: wrap;align-content: space-between;padding: 10px 20px 0 20px;">
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
                    <div>
                        <el-form :inline="true">
                            <el-form-item label="用户昵称：">
                                <el-input size="mini" v-model.trim="searchFields.user_nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="卡片名称：">
                                <el-input size="mini" v-model.trim="searchFields.rechargeable_card_name"></el-input>
                            </el-form-item>
                            <el-form-item label="用户手机号：">
                                <el-input size="mini" v-model.trim="searchFields.user_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="类型：">
                                <el-select size="mini" v-model="searchFields.type">
                                    <el-option value="">不限类型</el-option>
                                    <el-option label="储值" :value="1">储值</el-option>
                                    <el-option label="消费" :value="2">消费</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="渠道：">
                                <el-select size="mini" v-model="searchFields.channel">
                                    <el-option value="">不限</el-option>
                                    <el-option v-for="(channel,key,index) in channels" :key="index" :value="key"
                                               :label="channel"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="日期查询：">
                                <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期"
                                                size="mini" end-placeholder="结束日期" unlink-panels
                                                value-format="yyyy-MM-dd"
                                                v-model="searchFields.created_at"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="mini" type="primary" icon="el-icon-search"
                                           @click="conditionQueryHandler">查询
                                </el-button>
                                <el-button size="mini" type="success" icon="el-icon-download" @click="exportHandler">
                                    导出
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <record-table :consume-records="data"></record-table>
                </template>
            </table-list>
        </div>
    </div>
</template>

<script>
    import TableList from '@/components/TableList';
    import RecordTable from './Table';
    import _ from 'underscore';
    import UserRechargeableCardConsumeRecord from '../../../../models/UserRechargeableCardConsumeRecord';

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
        watch: {
            searchFields: {
                deep: true,
                handler: function () {
                    for (let key in this.searchFields) {
                        if (this.searchFields.hasOwnProperty(key) && this.searchFields[key] === '') {
                            this.searchFields[key] = null;
                        }
                    }
                }
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
                },

                channels: UserRechargeableCardConsumeRecord.channels(),

                searchFields: {
                    user_nickname: null,
                    user_mobile: null,
                    type: null,
                    created_at: null,
                    rechargeable_card_name: null,
                    channel: null
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
            },
            search(data) {
                this.query = _.extend(this.query, data);
            },
            checkQueryValidation(data) {
                if (data instanceof Object) {
                    for (let key in data) {
                        if (!this.checkQueryValidation(data[key])) {
                            return false;
                        }
                    }
                    return true;
                }

                if (typeof data === 'string' && data === "") {
                    return false;
                }

                return !(data === null || data === undefined);
            },
            itegrateQueryCondition() {
                let search = {};
                let query = Object.assign({}, this.query);
                for (let key in this.searchFields) {
                    if (this.searchFields.hasOwnProperty(key)) {
                        let value = this.searchFields[key];
                        if (this.checkQueryValidation(value) || query.hasOwnProperty(key)) {
                            search[key] = value;
                        }
                    }
                }
                query = Object.assign({}, query, search);
                return query;
            },
            // 条件搜索
            async conditionQueryHandler() {
                let query = this.itegrateQueryCondition();
                this.query = Object.assign({}, query);
            },
            async exportHandler() {
                let query = this.itegrateQueryCondition();
                query = Object.assign({}, query);
                let downloadUrl = await this.$command('EXCEL_EXPORT', this.$requestInput('projectId'), 'deposit_records', query);
                window.open(downloadUrl);
            }
        }
    }
</script>

<style scoped>
    .amount {
        font-size: 30px;
        color: #b49e39;
    }

    .el-form-item {
        margin-bottom: 0px;
    }
</style>
