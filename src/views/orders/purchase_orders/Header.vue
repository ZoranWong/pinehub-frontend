<template>
    <search-header :model="orderModel">
        <template slot="searchInput">
            <el-form-item prop="orderCode" label="订单号">
                <el-input size="small" v-model="orderCode" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item prop="receiverName" label="收货人姓名">
                <el-input size="small" v-model="receiverName" placeholder="收货人姓名"></el-input>
            </el-form-item>
            <el-form-item prop="receiverMobile" label="收货人手机号">
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
            <el-form-item prop="merchandiseName" label="商品名称">
                <el-input size="small" v-model="merchandiseName" placeholder="商品名称"></el-input>
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

    export default {
        components: {
            'search-header': SearchHeader
        },
        props: {
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
                merchandiseName: null,
                orderStatus: 0,
                payType: 0,
                payTypes: [
                    '全部',
                    '未知支付',
                    '支付宝',
                    '微信支付'
                ],
                statusDict: [
                    "全部",
                    "未支付",
                    "待发货",
                    "待签收",
                    "已完成",
                    "退款中",
                    "拒绝退款",
                    "退款成功",
                    "订单关闭"
                ]
            };
        }
    }
</script>
