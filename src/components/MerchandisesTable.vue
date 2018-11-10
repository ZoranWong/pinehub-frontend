<template>
    <el-table  highlight-current-row :data="merchandises">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="#" prop="idx" min-width="80"></el-table-column>
        <el-table-column  label="商品" prop="name" min-width="200"></el-table-column>
        <el-table-column  label="售价" min-width="200" prop="">
            <template slot-scope="scope">
                <p style="color:#f60"> ￥{{scope.row.sellPrice}} 元</p>
            </template>
        </el-table-column>
        <el-table-column label="访问量" min-width="100" prop="stockNum">
            <template slot-scope="scope">
                <p>访问人数：{{scope.row.visitorNum}}</p>
                <p>浏览人次：{{scope.row.visitTime}}</p>
            </template>
        </el-table-column>
        <el-table-column  label="状态" prop="status" min-width="200"></el-table-column>
        <el-table-column  label="库存" min-width="80" prop="stockNum"></el-table-column>
        <el-table-column  label="总销量" min-width="80" prop="sellNum"></el-table-column>
        <el-table-column  label="创建时间" min-width="100" prop="createdAt"></el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="text" size="mini" @click="edit(scope.row.id)">编辑</el-button> |
                <el-popover placement="top">
                    <p><el-button type="text" size="mini" v-if="scope.row.status==1">下架</el-button></p>
                    <p><el-button type="text" size="mini" disabled>会员价</el-button></p>
                    <p><el-button type="text" size="mini" disabled>推广商品</el-button></p>
                    <p><el-button type="text" size="mini" disabled>删除</el-button></p>
                    <el-button slot="reference" title="更多" type="text" icon="el-icon-more" size="mini"></el-button>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default {
        props: {
            merchandises: {
                default: null,
                type: Array
            }
        },
        data() {
            return {
            };
        },
        methods: {
            edit(id) {
                this.$router.push({name: 'merchandise-editor', params: {'projectId': this.$requestInput('projectId'), 'merchandiseId': id}});
            }
        }
    }
</script>
