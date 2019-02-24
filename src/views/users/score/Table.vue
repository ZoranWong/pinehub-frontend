<template>
    <el-col :span= "24" class="toolbar">
        <div class="special-rule">
            <p>自定义积分规则</p>
        </div>
        <!--工具条-->
        <el-button size="small" type="primary" @click="create()" style="margin-bottom: 10px;">新建积分规则</el-button>
        <!--列表-->
        <el-table  highlight-current-row :data="rules">
            <el-table-column prop="condition" label="奖励条件" min-width="180">
                <template slot-scope = "scope">
                    {{ condition(scope.row) }}
                </template>
            </el-table-column>
            <el-table-column prop="score" label="单笔奖励积分" min-width="100"></el-table-column>
            <el-table-column prop="updatedAt" label="规则更新时间" min-width="180"></el-table-column>
            <el-table-column prop="totalReceivedScore" label="已奖励总积分" min-width="100"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="small" @click="edit(scope.row.id)" type="text">编辑</el-button>
                    <el-button size="small" @click="delete(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-col>
</template>
<script>
    const FOLLOW = 9;
    const ORDER_COUNT = 11;
    const ORDER_AMOUNT = 10;
    export default {
        data() {
            return {

            };
        },
        props: {
            rules: {
                default: null,
                type: Array
            }
        },
        computed: {
        },
        methods: {
            create() {
                this.$router.push({
                    name: 'rule-create',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            },
            edit(id) {
                this.$router.push({
                    name: 'rule-editor',
                    params: {
                        'projectId': this.$requestInput('projectId'),
                        'scoreRuleId': id
                    }
                })
            },
            delete(id) {
                this.$command('DELETE_SCORE_RULE', id);
            },
            condition(condition) {
                switch (condition['type']) {
                    case FOLLOW:
                        return '关注我的微信';
                    case ORDER_COUNT:
                        return `每成功交易${condition['orderCount']}笔`;
                    case ORDER_AMOUNT:
                        return `每购买金额${condition['orderAmount']}元`;
                }
            }
        }
    }
</script>
<style scoped>
    .special-rule p{border-left: 4px solid #f70;padding-left:12px}
    .special-rule{background: #f5f5f5;padding:12px;margin:10px 0;color:#000;font-size: 14px;font-weight: 700;}
</style>
