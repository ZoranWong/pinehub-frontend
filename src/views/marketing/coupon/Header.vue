<template>
    <el-col :span="24" class="toolbar">
        <el-tabs type="card" v-model="tab">
            <el-tab-pane label="所有优惠券" name="all"></el-tab-pane>
            <el-tab-pane label="审核中" name="applying"></el-tab-pane>
            <el-tab-pane label="审核通过" name="pass"></el-tab-pane>
            <el-tab-pane label="审核失败" name="fail"></el-tab-pane>
        </el-tabs>
    </el-col>
</template>
<script>
    export default {
        props: {
            value: {
                default: () => {
                    return {};
                },
                type: Object
            }
        },
        created() {
            if (this.value) {
                this.initSearchData(this.value);
            }
        },
        data() {
            return {
                tab: "all",
                status: {
                    'all': null,
                    'applying': 0,
                    'pass': 1,
                    'fail': 2
                }
            };
        },
        watch: {
            tab(tab) {
                let search = {};
                search['status'] = this.status[tab];
                this.$emit('search', search);
            }
        },
        methods: {
            initSearchData(search) {
                if (typeof search['search'] === 'undefined') {
                    search['search'] = null;
                }
                for (let key in this.status) {
                    if (search['status'] === this.status[key]) {
                        this.tab = key;
                    }
                }
            }
        }
    }
</script>
<style>
    .el-tabs--top .el-tabs__item.is-top:last-child {
        font-size: 14px !important;
    }
</style>
