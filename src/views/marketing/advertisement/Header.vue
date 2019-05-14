<template>
    <el-col :span="24" class="toolbar">
        <el-tabs type="card" v-model="tab">
            <el-tab-pane label="所有广告" name="all"></el-tab-pane>
            <el-tab-pane label="等待投放" name="wait"></el-tab-pane>
            <el-tab-pane label="投放中" name="on-put"></el-tab-pane>
            <el-tab-pane label="已下架" name="finish"></el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                tab: 'all',
                status: {
                    'all': null,
                    'wait': 0,
                    'on-put': 1,
                    'finish': [2, 3]
                }
            };
        },
        watch: {
            tab(tab) {
                let search = {};
                search['status'] = this.status[tab];
                this.$emit('search', search);
            }
        }
    }
</script>

<style scoped>

</style>