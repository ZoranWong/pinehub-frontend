<template>
    <div class="tab-pane">
        <el-table highlight-current-row v-loading="isLoading" class="table-header" :data="orders" :span-method="spanMethod">
            <el-table-column label="#" prop="idx" min-width="20" indx = "0">
            </el-table-column>
            <el-table-column label="订单" min-width = "120" prop="code" indx = "1" >
                <template slot-scope="scope">
                    订单号: {{scope.row.code}}
                    <p class="transaction-id">
                        支付流水号: <span style="color:gray">{{scope.row.transactionId}}</span>
                    </p>
                    <p class="payment-type">
                        支付方式: <el-tag  size="small" :class="[{'alipay-tag': scope.row.isAliPay}, {'wechatpay-tag': scope.row.isWechatPay}]"> {{ scope.row.payTypeStr}}</el-tag>
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="" label="商品" indx = "2">
                <template slot-scope="scope">
                    <el-row :gutter="20" type="block" align="middle" v-if="scope.row.item && scope.row.item.merchandiseId">
                        <el-col style="width: 64px; height: 64px;">
                            <img class="x-img" :src="scope.row.item.merchandiseImage" width="100%" alt=""/>
                        </el-col>
                        <el-col>
                            <div>{{ scope.row.item.merchandiseName }}</div>
                        </el-col>
                    </el-row>
                    <el-row v-else>
                        线下扫码支付
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="" label="单价X数量(应付金额)" indx = "3">
                <template slot-scope="scope" >
                    <div v-if = "scope.row.item">
                        <span style="color: red;"> {{scope.row.item.sellPrice}} 元 </span> X {{scope.row.item.quality}}
                        <p>（  <span style="color: red;"> {{scope.row.item.totalAmount}}元</span>）</p>
                    </div>
                    <p v-else> ---- </p>
                </template>
            </el-table-column>
            <el-table-column prop="" label="售后" min-width="80" indx = "4">
                <template slot-scope="scope" >
                    <el-row style="display: flex;" v-if="scope.row.item && scope.row.item.status === REFUNDING">
                        <el-button  @click="refund(scope.row)" type="success" size="mini" style="width: 50%;" plain>同意退款</el-button>
                        <el-button  @click="refund(scope.row)" type="danger" size="mini" style="width: 50%;" plain>拒绝退款</el-button>
                    </el-row>
                    <el-row v-else-if = "scope.row.item && scope.row.item.status === WAITSEND">
                        <el-button  @click="refund(scope.row)" type="success" size="mini" plain>去发货</el-button>
                    </el-row>

                    <el-row v-else-if="scope.row.item && scope.row.item.status === REFUNDED">
                        <el-button  @click="refund(scope.row)" type="success" size="mini" plain>查看退款</el-button>
                    </el-row>
                    <el-row v-else>
                        <el-tag size="small">无售后信息</el-tag>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="" label="卖家/提货点" indx = "5" >
                <template slot-scope="scope">
                    <div v-if = "scope.row.item && scope.row.item.shop">
                        <p>店铺：{{scope.row.item.shop.name}}</p>
                    </div>
                    <div v-else-if = "scope.row.receiveShop">
                        <p>自提点：{{ scope.row.receiveShop.name}}</p>
                    </div>
                    <div v-else>
                        <p>平台商城</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="买家" indx = "6" >
                <template slot-scope="scope">
                    <div v-if="scope.row.item && scope.row.item.customer && scope.row.item.customer.nickname">
                        <p>{{scope.row.item.customer.nickname}}</p>
                        <p>{{scope.row.item.customer.mobile}}</p>
                    </div>
                    <div v-else>
                        <p>匿名用户</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="item.statusStr" label="订单状态" indx = "7" >
            </el-table-column>
            <el-table-column prop="createdAt" label="下单时间" indx = "8">
            </el-table-column>
            <el-table-column prop="typeStr" label="订单类型" indx = "9">
            </el-table-column>
            <el-table-column prop="" label="优惠金额"  indx = "10">
                <template slot-scope="scope">
                    <span style="color: red;"> {{scope.row.discountAmount}} 元 </span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="合计"  indx = "11">
                <template slot-scope="scope">
                    <span style="color: red;"> {{scope.row.paymentAmount}} 元 </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import _ from 'underscore';
    import OrderDict from './OrderDict';
    export default {
        name: 'OrderTable',
        props:{
            orders: {
                default: null,
                type: Array
            }
        },
        data() {
            return _.extend({

            }, OrderDict.orderStatusDict);
        },
        computed:{
            isLoading() {
                return false;
            }
        },
        methods: {
            refund() {

            },
            spanMethod({ row, columnIndex }) {
                if(columnIndex === 0 || columnIndex === 1 || columnIndex === 8 ||
                     columnIndex === 9 || columnIndex === 10 || columnIndex === 11){
                    if(row.needSpan){
                        return row.span;
                    }else{
                        return {
                            colspan: 0,
                            rowspan: 0
                        };
                    }
                }
            }
        }
    }
</script>
