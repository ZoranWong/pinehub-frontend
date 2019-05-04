<template>
    <table-list :service ="service" :event="event" :current="current" :model="model" :query = "query">
        <template slot = "header" slot-scope="{ search, searchHandler }">
            <merchandise-header v-model = "search" @search = "searchHandler">
                <template slot="opt-buttons">
                    <div class="opt-buttons">
                        <el-button size="small" type="primary" icon="el-icon-plus" @click = "create">发布商品</el-button>
                    </div>
                </template>
            </merchandise-header>
        </template>
        <template slot = "table" slot-scope="{ data }">
            <merchandise-table :merchandises="data">
                <template slot = "tableOpt" slot-scope = "{merchandise}">
                    <el-button type="text" size="mini" @click="edit(merchandise.id)">编辑</el-button> |
                    <el-popover placement="top">
                        <p><el-button type="text" size="mini" v-if="merchandise.status == 1">下架</el-button></p>
                        <p><el-button type="text" size="mini" disabled>会员价</el-button></p>
                        <p><el-button type="text" size="mini" disabled>推广商品</el-button></p>
                        <p><el-button type="text" size="mini" disabled>删除</el-button></p>
                        <el-button slot="reference" title="更多" type="text" icon="el-icon-more" size="mini"></el-button>
                    </el-popover>
                </template>
            </merchandise-table>
        </template>
    </table-list>
</template>

<script>
    /* eslint-disable */
    import Header from '@/components/MerchandisesHeader';
    import MerchandiseTable from '@/components/MerchandisesTable';
    import TableList from '@/components/TableList';
    export default {
        name: 'Merchandises',
        components: {
            'merchandise-header': Header,
            'merchandise-table': MerchandiseTable,
            'table-list': TableList
        },
        data() {
            return {
                service: 'http.merchandises',
                event: 'merchandises/setList',
                current: 'merchandises/currentPage',
                query: {
                }
            };
        },
        computed: {
            model() {
                return this.$store.state.merchandises;
            },
        },
        methods: {
            search(data) {
                this.query = _.extend(this.query, data);
            },
            create() {
                this.$router.push({
                    name: 'merchandise-create',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            },
            edit(id) {
                this.$router.push({name: 'merchandise-editor', params: {'projectId': this.$requestInput('projectId'), 'merchandiseId': id}});
            }
        }
    }
</script>
