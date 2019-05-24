<template>
    <div>
        <el-table :height="height" highlight-current-row :data="consumeRecords">
            <el-table-column label="#" prop="index" width="50" fixed="left"></el-table-column>
            <el-table-column label="订单流水" prop="order.code" align="center" width="140"></el-table-column>
            <el-table-column label="用户ID" prop="user.id"></el-table-column>
            <el-table-column label="用户昵称" prop="user.nickname"></el-table-column>
            <el-table-column label="用户号码" prop="user.mobile"></el-table-column>
            <el-table-column label="卡片#" prop="rechargeableCard.id"></el-table-column>
            <el-table-column label="卡片名称" prop="rechargeableCard.name" width="90" align="center"></el-table-column>
            <el-table-column label="卡内总额" prop="rechargeableCard.amount" align="center"></el-table-column>
            <el-table-column label="类型" prop="typeDesc" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type === types.BUY">{{scope.row.typeDesc}}</el-tag>
                    <el-tag v-if="scope.row.type === types.CONSUME" type="success">{{scope.row.typeDesc}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="赠送" align="center">
                <template slot-scope="scope">
                    <template v-if="scope.row.type === types.BUY">
                        {{scope.row.rechargeableCard.amount - scope.row.consume}}
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="消费" prop="consume" align="center"></el-table-column>
            <el-table-column label="节省" prop="save" align="center"></el-table-column>
            <el-table-column label="途径" prop="channelDesc" align="center"></el-table-column>
            <el-table-column label="卡内余额" prop="userRechargeableCard.amount" align="center"></el-table-column>
            <el-table-column label="时间" prop="createdAt" align="center" width="145"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            fixHeight: {
                default: false,
                type: Boolean
            },
            height: {
                default: 500,
                type: Number
            },
            consumeRecords: {
                default: function () {
                    return [];
                },
                type: Array
            }
        },
        data() {
            return {
                types: {
                    BUY: 1,
                    CONSUME: 2
                }
            }
        }
    }
</script>

<style scoped>

</style>