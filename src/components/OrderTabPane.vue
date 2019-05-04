<template>
    <div class="tab-pane">
        <el-table highlight-current-row v-loading="isLoading" class="table-header">
            <el-table-column prop="" label="商品" min-width="250"></el-table-column>
            <el-table-column prop="" label="单价/数量" min-width="80"></el-table-column>
            <el-table-column prop="" label="售后" min-width="80"></el-table-column>
            <el-table-column prop="" label="买家" min-width="80"></el-table-column>
            <el-table-column prop="" label="下单时间" min-width="80"></el-table-column>
            <el-table-column prop="" label="订单状态" min-width="80"></el-table-column>
            <el-table-column prop="" label="实付金额" min-width="80"></el-table-column>
        </el-table>
        <div class = "order-item-content" v-for="(order, index) in orders" :key="index">
            <div class="order-content">
                <div style="float:left">
                    订单号: {{order.code}}
                    <el-tag  size="small" :class="[{'alipay-tag': order.isAliPay}, {'wechatpay-tag': order.isWechatPay}]"> {{ order.payTypeStr}}</el-tag>
                    <p>
                        支付流水号: <span style="color:gray">{{order.transaction_id}}</span>
                    </p>
                </div>
                <div style="float:right">备注</div>
            </div>
            <el-table class="order-merchandise-table" :data="[order]" v-loading="isLoading" :show-header="false" border>
                <el-table-column prop="name" label="商品" min-width="330" header-align="center">
                    <template slot-scope="scope">
                        <el-row :gutter="20" type="flex" align="middle" v-for="(orderItem, indexs) in scope.row.order_items"
                                :key="indexs" v-if="orderItem.merchandise_id">
                            <el-col :span="6"><img class="x-img" :src="orderItem.main_image" width="100%" alt=""/></el-col>
                            <el-col :span="15">
                                <div>{{ orderItem.name }}</div>
                            </el-col>
                            <el-col :span="3">
                                <p>{{orderItem.sell_price + ' X ' +orderItem.quality}}</p>
                            </el-col>
                        </el-row>
                        <el-row v-else>
                            <el-col :span="24">
                                <div>到店付</div>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="orderMoney" label="售后" min-width="80" label-class-name="sell-service">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
                <el-table-column prop="" label="买家" min-width="80" align="center">
                    <template slot-scope="scope">
                        <div v-if="orderItem.customer.nickname">
                            <p>{{orderItem.customer.nickname}}</p>
                            <p>{{orderItem.customer.mobile}}</p>
                        </div>
                        <div v-else>
                            <p>匿名支付</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="orderTime" label="下单时间" min-width="80" align="center">
                    <template slot-scope="scope">
                        <p>{{orderItem.createdAt}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="orderContent" label="订单状态" min-width="80" align="center">
                    <template slot-scope="scope">
                        <p>{{ orderItem.statusStr }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="payment_amount" label="实付金额" min-width="80" align="center"></el-table-column>
            </el-table>
            <div class="order-footer" v-if="order.remark">
                <p><span>买家备注： {{ order.remark }}</span></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'OrderTabPane',
        props:{},
        computed:{
            isLoading() {
                return true;
            },
            orders() {
                return [];
            }
        },
        methods: {

        }
    }
</script>
