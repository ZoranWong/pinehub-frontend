<template>
    <el-table highlight-current-row :data="customers">
        <el-table-column prop="idx" label="#" />
        <el-table-column prop="nickname" label="昵称">
            <template slot-scope="scope">
                {{ scope.row.nickname ? scope.row.nickname : '--' }}
            </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签">
            <template slot-scope="scope">
                <el-tag v-for ="(tag, key ) in scope.row.tags" :key="key" size="mini">{{ tag }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="ordersCount" label="购次" />
        <el-table-column prop="totalScore" label="累计积分" min-width="100" />
        <el-table-column prop="score" label="积分" />
        <el-table-column prop="canUseScore" label="可用积分" />
        <el-table-column prop="registerChannel" label="来源方式">
            <template slot-scope="scope">
                <el-tag size="mini" :type="channel(scope.row.channel)">{{ channels[scope.row.channel] }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="isMember" label="客户身份" />
        <el-table-column prop = "sex" label="性别" />
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-popover v-model="scope.row['showAddTag']" title="加标签" placement="left" popper-class="customer-table-opt" :disabled="true">
                    <el-form class = "tags-box">
                        <el-form-item prop="tag">
                            <el-input v-model="tag" size="small" placeholder="输入标签名称" />
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini" plain @click="scope.row['showAddTag'] = false">取消</el-button>
                            <el-button type="primary" size="mini">确定</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button slot="reference" size="mini" type="success" @click="scope.row['showAddTag'] = true">加标签</el-button>
                </el-popover>

                <el-popover v-model="scope.row['showAddScore']" placement="left" title="给客户积分" popper-class="customer-table-opt" :disabled="true">
                    <el-button slot="reference" size="mini" type="primary">给积分</el-button>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import UserDict from '../UserDict';
import _ from 'underscore';
export default {
    props: {
        customers: {
            default: null,
            type: Array
        }
    },
    data() {
        return _.extend({
            tag: null,
            showAddTag: false,
        }, UserDict);
    },
    methods: {
        show(scope) {
            console.log(scope);
        },
        channel(ch) {
            switch (ch) {
            case 0:
                return 'info';
            case 1:
                return 'success';
            case 2:
                return 'primary';
            }
        }
    }
}
</script>
<style scoped>
    .tags-box{
        text-align: right;
        margin: 0;
    }
    .customer-table-opt{
        display: inline-flex;
        width: 50%;
    }
</style>
