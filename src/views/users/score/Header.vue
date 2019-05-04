<template>
    <el-col :span="24" class="toolbar">
        <el-row :gutter="0" type="flex" align="middle" class="score-header">
            <el-col :span="8">
                <p>可用积分</p>
                <p class="score can-use-score">{{ canUseScore }}</p>
            </el-col>
            <el-col :span="8">
                <p>已消耗积分</p>
                <p class="score used-score">{{ usedScore }}</p>
            </el-col>
            <el-col :span="8">
                <p>保护内积分</p>
                <p class="score protected-score">{{ protectedScore }}</p>
            </el-col>
        </el-row>
    </el-col>
</template>
<script>
    export default {
        props: ['search'],
        data() {
            return {
            };
        },
        computed: {
            usedScore() {
                return 100;
            },
            protectedScore() {
                return 10;
            },
            canUseScore() {
                return 90;
            }
        }
    }
</script>
<style scoped>
    .score-header{text-align: center;background: #f5f5f5;padding: 25px;color:#888;font-size: 12px;}
    .score-header .score{color:#666;font-size: 24px;margin-top:5px}
</style>
