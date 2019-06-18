<template>
    <search-header @search="search" :model="orderModel">
        <template slot="searchInput">
            <el-form-item prop="orderCode" label="订单号">
                <el-input size="small" v-model="orderCode" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item prop="receiverName" label="客户姓名">
                <el-input size="small" v-model="receiverName" placeholder="收货人姓名"></el-input>
            </el-form-item>
            <el-form-item prop="receiverMobile" label="客户手机号">
                <el-input size="small" v-model="receiverMobile" placeholder="收货人手机号"></el-input>
            </el-form-item>
            <el-form-item prop="beginAt" label="下单时间">
                <el-date-picker v-model="beginAt" type="date" :editable="false" placeholder="开始时间"
                                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="" label-width="0px">
                至
            </el-form-item>
            <el-form-item prop="endAt" label="">
                <el-date-picker v-model="endAt" type="date" :editable="false" placeholder="结束时间"
                                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item prop="orderStatus" label="订单状态">
                <el-select size="small" v-model="orderStatus" placeholder="订单状态">
                    <el-option v-for="(value, key) in statusDict" :value="key" :label="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="payType" label="付款方式">
                <el-select size="small" v-model="payType" placeholder="付款方式">
                    <el-option v-for="(value, key) in payTypes" :value="key" :label="value" :key="value"></el-option>
                </el-select>
            </el-form-item>
        </template>
    </search-header>
</template>
<script>
    import SearchHeader from '@/components/SearchHeader';
    import ORDER_STATUS from '../OrderStatus';
    import PAYMENT_TYPES from '../Payment';
    import _ from 'underscore';

    export default {
        components: {
            'search-header': SearchHeader
        },
        props: {
            value: {
                default: null,
                type: Object
            },
            orderModel: {
                default: null,
                type: Object
            }
        },
        data() {
            return {
                receiverName: null,
                orderCode: null,
                receiverMobile: null,
                beginAt: null,
                endAt: null,
                orderStatus: 'ALL',
                payType: 'ALL',
                payTypes: {
                    "ALL": '全部',
                    "UNKNOWN": '未知支付',
                    "ALI_PAY": '支付宝',
                    "WECHAT_PAY": '微信支付',
                    "BALANCE_PAY": '余额支付',
                },
                statusDict: {
                    "ALL": "全部",
                    "WAIT_PAY": "未支付",
                    "PAID": "已支付",
                    "COMPLETED": "已完成",
                    "REFUNDING": "退款中",
                    "REFUSE_REFUND": "拒绝退款",
                    "REFUNDED": "退款成功",
                    "ORDER_CANCEL": "订单关闭"
                }
            };
        },
        watch: {
            value: {
                deep: true,
                handler(search) {
                    if (search) {
                        this.initSearchData(search);
                    }
                }
            }
        },
        created() {
            if (this.value && !_.isEmpty(this.value)) {
                this.initSearchData(this.value);
            }
        },
        methods: {
            search() {
                let search = this.buildSearchData();
                this.$emit('search', search);
            },
            initSearchData(search) {
                this.receiverName = search['receiver_name'];
                this.receiverMobile = search['receiver_mobile'];
                this.orderCode = search['code'];
                this.beginAt = search['paid_at'] && search['paid_at'][1] && search['paid_at'][1]['value'] ? search['paid_at'][0]['value'] : null;
                this.endAt = search['paid_at'] && search['paid_at'][1] && search['paid_at'][1]['value'] ? search['paid_at'][1]['value'] : null;

                for (let index in ORDER_STATUS) {
                    let value = ORDER_STATUS[index];
                    if (value == search['status']) {
                        this.orderStatus = index;
                        if (index === 'WAIT_SEND' || index === 'PAID') {
                            this.orderStatus = 'PAID';
                        }
                    }
                }

                for (let index in PAYMENT_TYPES) {
                    let value = PAYMENT_TYPES[index];
                    if (value == search['pay_type']) {
                        this.payType = index;
                    }
                }
            },
            buildSearchData() {
                let search = {
                    "paid_at": [
                        {
                            'opt': '>='
                        },
                        {
                            'join': 'and',
                            'opt': '<'
                        }
                    ]
                };
                if (this.receiverName)
                    search['receiver_name'] = this.receiverName;
                else
                    delete search['receiver_name'];

                if (this.receiverMobile)
                    search['receiver_mobile'] = this.receiverMobile;
                else
                    delete search['receiver_mobile'];

                if (this.orderCode)
                    search['code'] = this.orderCode;
                else
                    delete search['code'];

                if (this.merchandiseName)
                    search['orderItems.name'] = this.merchandiseName;
                else
                    delete search['orderItems.name'];

                if (this.beginAt) {
                    search['paid_at'][0]['value'] = this.beginAt;
                }
                if (this.endAt)
                    search['paid_at'][1]['value'] = this.endAt;
                // if(this.orderStatus && ORDER_STATUS[this.orderStatus])
                //     search['status'] = ORDER_STATUS[this.orderStatus];
                // if(this.payType && PAYMENT_TYPES[this.payType])
                //     search['pay_type'] = PAYMENT_TYPES[this.payType];
                if (this.orderStatus) {
                    search['status'] = ORDER_STATUS[this.orderStatus];
                } else {
                    delete search['status'];
                }

                if (this.payType) {
                    search['pay_type'] = PAYMENT_TYPES[this.payType];
                } else {
                    delete search['status'];
                }
                return search;
            }
        }
    }
</script>
