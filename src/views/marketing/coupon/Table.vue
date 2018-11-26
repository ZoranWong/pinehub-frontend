<template>
    <el-table highlight-current-row :data="coupons">
        <el-table-column prop="index" label="#" width="50" />
        <el-table-column prop="code" label="优惠券编号" min-width="80" />
        <el-table-column prop="title" label="优惠券名称" min-width="100" />
        <el-table-column prop="type" label="类型" min-width="120" />
        <el-table-column prop="publish" label="是否同步微信" min-width="80" />
        <el-table-column prop="activeTime" label="有效时间" min-width="100" />
        <el-table-column prop="issuedNum" label="总发行数" min-width="80" />
        <el-table-column prop="stockNum" label="库存" min-width="100" />
        <el-table-column prop="receivedNum" label="已领取是数量" min-width="100" />
        <el-table-column prop="usedNum" label="使用数" min-width="100" />
        <el-table-column prop="usedRate" label="使用率" min-width="100" />
        <el-table-column label="操作" width="150">
            <template slot-scope="scope">
                <el-button type="success" size="mini" :disabled="true" @click="show(scope)">查看</el-button>
                <el-button type="primary" size="mini" :disabled="true">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        coupons: {
            default: null,
            type: Array
        }
    },
    data() {
        return {
        };
    },
    methods: {
        show(scope) {
            console.log(scope);
        }
    }
}
</script>
