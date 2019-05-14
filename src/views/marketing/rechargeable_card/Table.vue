<template>
    <el-table highlight-current-row :data="rechargeableCards">
        <el-table-column label="#" prop="index" width="50"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="卡内金额(元)" prop="amount"></el-table-column>
        <el-table-column label="售价(元)" prop="price"></el-table-column>
        <el-table-column label="优惠价格(元)" prop="preferentialPrice"></el-table-column>
        <el-table-column label="续费价格(元)" prop="autoRenewPrice"></el-table-column>
        <el-table-column label="享受折扣(%)" prop="discount"></el-table-column>
        <el-table-column label="卡种类型" prop="cardTypeDesc"></el-table-column>
        <el-table-column label="限期类型" prop="typeDesc"></el-table-column>
        <el-table-column label="期限">
            <template slot-scope="scope">{{scope.row.count}}{{scope.row.timeUnit}}</template>
        </el-table-column>
        <el-table-column label="使用场景">
            <template slot-scope="scope">
                <el-tag v-for="(scenario,index) in scope.row.usageScenariosDesc" :key="index">{{scenario}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="时段/天">
            <template slot-scope="scope">
                {{scope.row.specifiedStart}}-{{scope.row.specifiedEnd}}
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="statusDesc"></el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="是否优惠" prop="onSale">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.onSale" @change="onSaleStatusChangeHandler(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="是否推荐" prop="isRecommend">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.isRecommend"
                           @change="recommendStatusChangeHandler(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                <el-button v-if="scope.row.status < 10" size="mini" type="primary"
                           @click="enableRechargeableCardHandler(scope.row.id)">上架
                </el-button>
                <el-button v-else-if="scope.row.status > 20" size="mini" type="warning"
                           @click="disableRechargeableCardHandler(scope.row.id)">下架
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "Table",
        props: {
            rechargeableCards: {
                default: [],
                type: Array
            }
        },
        data() {
            return {};
        },
        methods: {
            // 优惠状态改变
            onSaleStatusChangeHandler(rechargeableCard) {
                console.log(rechargeableCard.id, rechargeableCard.onSale);
            },
            // 下架
            disableRechargeableCardHandler(rechargeableCardId) {
            },
            // 上架
            enableRechargeableCardHandler(rechargeableCardId) {

            },
            // 推荐位改变
            recommendStatusChangeHandler(rechargeableCard) {

            }
        }
    }
</script>

<style scoped>

</style>