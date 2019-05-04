/* eslint-disable */
<template>
    <div class="content-scroll">
        <div class="content-box">
            <!--工具条-->
            <el-col class = "c-header">
                <!--<el-button size="small" type="primary" icon="el-icon-plus">添加新品类</el-button>-->
            </el-col>
            <!--列表-->
            <el-table highlight-current-row :data="categories">
                <el-table-column type="selection" width="55" />
                <el-table-column label="#" prop="idx" min-width="80" />
                <el-table-column label="名称" prop="name" min-width="100" />
                <el-table-column label="商品数量" prop="merchandiseNum" min-width="80" />
                <!--<el-table-column label="操作" width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <!--工具条-->
            <paginator
                :total-num = "totalNum"
                :service="service"
                :event="event"
                :total-page = "totalPage"
                :current-page="currentPage"
                :command="command"
                :search="query"
                @change-page="changePage" />
        </div>
    </div>
</template>
<script>

import _ from 'underscore';
import Paginator from '@/components/Paginator';
import DataListCommand from '../../commands/DataListCommand';
export default {
    name: 'Categories',
    components: {
        'paginator': Paginator
    },
    data() {
        return {
            service: 'http.categories',
            event: 'categories/setList',
            isLoading: false,
            query: {
                page: null
            }
        };
    },
    computed: {
        categories() {
            return this.$store.getters['categories/currentPage'];
        },
        totalNum() {
            return this.$store.state.categories.totalNum;
        },
        totalPage() {
            return this.$store.state.categories.totalPage ? this.$store.state.categories.totalPage : 15;
        },
        currentPage() {
            return this.$store.state.categories.currentPage;
        },
        command() {
            return DataListCommand.commandName();
        }
    },
    created() {
        let page = this.$router.currentRoute.query.page;
        this.query.page = parseInt(!page ? 1 : page);
    },
    methods: {
        edit(data) {
            console.log(data);
        },
        search(data) {
            this.query = _.extend(this.query, data);
        },
        changePage(page) {
            this.query['page'] = page;
        }
    }
}
</script>

<style scoped>
	.prompt{color:gray;font-size: 12px;margin-left: 120px;}
	.c-header{
		margin: 12px;
	}
</style>
<style>
	.el-input-group__prepend{padding:0 5px !important}
</style>
