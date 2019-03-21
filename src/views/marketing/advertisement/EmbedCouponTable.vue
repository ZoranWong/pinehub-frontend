<template>
    <el-table highlight-current-row :data="coupons">
        <el-table-column prop="code" label="优惠券编号" min-width="80"/>
        <el-table-column prop="title" label="优惠券名称" min-width="100"/>
        <el-table-column prop="type" label="类型" min-width="120"/>
        <el-table-column prop="content" label="优惠" min-width="120"/>
        <el-table-column prop="activeTime" label="有效时间" min-width="100"/>
        <el-table-column prop="issuedNum" label="总发行数" min-width="80"/>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button type="success" size="mini" @click="show(scope.row)">查看</el-button>
                <el-button type="primary" size="mini" v-if="relateCoupon !== scope.row.cardId"
                           @click="relateCouponHandler(scope.row)">关联
                </el-button>
                <el-button type="danger" size="mini" v-if="relateCoupon === scope.row.cardId"
                           @click="unRelateCouponHandler">取消关联
                </el-button>
            </template>
        </el-table-column>
    </el-table>
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
            show(row) {
                console.log(row);
            },
            relateCouponHandler(ticket) {
                this.$emit('relateCouponChange', ticket.cardId);
            },
            unRelateCouponHandler() {
                this.$emit('relateCouponChange', null);
            }
        }
    }
</script>

<style scoped>

</style>