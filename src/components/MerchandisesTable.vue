<template>
    <el-table highlight-current-row :data="merchandises">
        <el-table-column type="selection" width="55" />
        <el-table-column label="#" prop="idx" min-width="80" />
        <el-table-column label="品类" min-width="100" prop="categories">
            <template slot-scope = "scope">
                <el-tag v-for="(category, index) in scope.row['categories']" :key = "index">{{ category['name'] }}</el-tag>
                <span v-if="!scope.row['categories'] && (scope.row['categories'].length === 0)">--</span>
            </template>
        </el-table-column>
        <el-table-column label="商品" min-width="200" prop="" style="position: relative;display: flex;">
            <template slot-scope="scope">
                <div class="merchandise-main-image" :style="{height: imageHeight + 'px', width: imageWidth + 'px', display: 'inline-block'}">
                    <img :src="scope.row.mainImage" style="width: 100%;height: 100%;">
                </div>
                <div class = "merchandise-info" :style = "{position: 'absolute', left: imageWidth + 18 + 'px', top: '18px', display: 'inline-block'}">
                    <p style="color:#f60"> 商品名称：{{ scope.row.name }} </p>
                    <p style="color:#f60"> 售价：￥{{ scope.row.sellPrice }} 元</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="标签" min-width="100" prop="tags">
            <template slot-scope = "scope">
                <el-tag v-for="(tag, index) in scope.row['tags']" :key = "index">{{ tag }}</el-tag>
                <span v-if="!scope.row['tags']">--</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" min-width="200" />
        <el-table-column label="库存" min-width="80" prop="stockNum" />
        <el-table-column label="总销量" min-width="80" prop="sellNum" />
        <!--<el-table-column  label="创建时间" min-width="100" prop="createdAt"></el-table-column>-->
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <slot name = "tableOpt" :merchandise = "scope.row" />
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
        },
        imageWidth: {
            default: 64,
            type: Number
        },
        imageHeight: {
            default: 64,
            type: Number
        }
    },
    data() {
        return {
        };
    },
    methods: {
        visitorFilter (value, row) {
            console.log(row);
            return typeof row['visitorNum'] !== 'undefined';
        },
        tagsFilter (value, row) {
            return typeof row['tags'] !== 'undefined';
        }
    }
}
</script>
