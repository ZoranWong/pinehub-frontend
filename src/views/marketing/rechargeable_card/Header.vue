<template>
    <el-col :span="24" class="toolbar">
        <el-tabs type="card" v-model="tab">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="常规卡" name="normal"></el-tab-pane>
            <el-tab-pane label="优惠卡" name="preferential"></el-tab-pane>
            <el-tab-pane label="已下架" name="off"></el-tab-pane>
        </el-tabs>
    </el-col>
</template>

<script>

    export default {
        name: "Header",
        props: {
            value: {
                default: () => {
                    return {};
                },
                type: Object
            }
        },
        data() {
            return {
                tab: 'all',
                status: {
                    'all': null,
                    'normal': 11,
                    'preferential': 12,
                    'off': 21
                },
                search: {}
            }
        },
        watch: {
            tab(tab) {
                this.search['status'] = this.status[tab];
                let search = Object.assign({}, this.search);
                this.$emit('search', search);
            },
        },
        created() {
            if (this.value) {
                this.initSearchData(this.value);
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

<style scoped>

</style>