<template>
    <!--<el-table highlight-current-row :data="coupons">-->
    <!--<el-table-column prop="code" label="优惠券编号" min-width="80"/>-->
    <!--<el-table-column prop="title" label="优惠券名称" min-width="100"/>-->
    <!--<el-table-column prop="type" label="类型" min-width="120"/>-->
    <!--<el-table-column prop="content" label="优惠" min-width="120"/>-->
    <!--<el-table-column prop="activeTime" label="有效时间" min-width="100"/>-->
    <!--<el-table-column prop="issuedNum" label="总发行数" min-width="80"/>-->
    <!--<el-table-column label="操作" width="200">-->
    <!--<template slot-scope="scope">-->
    <!--<el-button type="primary" size="mini" v-if="relateCoupon !== scope.row.cardId"-->
    <!--@click="relateCouponHandler(scope.row)">关联-->
    <!--</el-button>-->
    <!--<el-button type="danger" size="mini" v-if="relateCoupon === scope.row.cardId"-->
    <!--@click="unRelateCouponHandler">取消关联-->
    <!--</el-button>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->

    <ul class="coupon-list">
        <li v-for="coupon in coupons" :key="coupon.id" class="coupon-li">
            <div style="display: flex;width: 100%">
                <img src="../../../assets/ticket-left.png" alt="" class="el-card-ticket-left">
                <div class="el-card-div">
                    <el-card class="el-card" :body-style="{ padding: '0px' }">
                        <div style="padding: 14px;">
                            <span></span>
                            <div class="bottom clearfix">
                                <span class="ticket-title">{{coupon.title}}</span>
                                <span class="ticket-content">{{coupon.content}}</span>
                                <span class="ticket-validate">有效期：{{coupon.activeTime}}</span>
                            </div>
                        </div>
                    </el-card>
                    <img src="../../../assets/ticket-quan.png" alt="" class="el-card-ticket-quan">
                    <el-button title="点击关联" size="mini" circle class="coupon-relate-button" icon="el-icon-check"
                               v-if="relateCoupon !== coupon.cardId"
                               @click="relateCouponHandler(coupon)">
                    </el-button>
                    <el-button title="点击取消关联" icon="el-icon-check" circle class="coupon-relate-button" type="success"
                               v-else
                               size="mini" @click="unRelateCouponHandler">
                    </el-button>
                </div>
            </div>
        </li>
    </ul>

</template>

<script>
    export default {
        name: "EmbedCouponTable",
        props: {
            coupons: {
                default: null,
                type: Array
            },
            relateCoupon: {
                default: null,
            }
        },
        computed: {},
        data() {
            return {};
        },
        methods: {
            relateCouponHandler(ticket) {
                this.$emit('relateCouponChange', ticket);
            },
            unRelateCouponHandler() {
                this.$emit('relateCouponChange', null);
            }
        }
    }
</script>

<style scoped>
    .coupon-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: space-between;
    }

    .coupon-li {
        width: 33%;
        padding: 7px;
    }

    .ticket-title {
        font-size: 20px;
    }

    .ticket-content {
        font-size: 10px;
        display: block;
    }

    .ticket-validate {
        font-size: 10px;
    }

    .el-card {
        border: 0px;
        border-radius: 0px;
        height: 100px;
    }

    .el-card-div {
        position: relative;
        width: 100%;
    }

    .el-card-ticket-left {
        height: 100px;
    }

    .el-card-ticket-quan {
        width: 42px;
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .coupon-relate-button {
        position: absolute;
        right: 5px;
        bottom: 5px;
    }
</style>