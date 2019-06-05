<template>
    <div class="toolbar" style="text-align: right;">
        <el-pagination layout="prev, pager, next, ->, total, jumper"
                       @current-change="changePage" background
                       :total="total"
                       :page-size="pageSize"
                       :current-page="currPage"
                       :page-count="pageCount"
                       ref="paginator">
        </el-pagination>
    </div>
</template>
<script>
    import _ from 'underscore';

    export default {
        name: 'Paginator',
        props: {
            currentPage: {
                default: 0,
                type: Number
            },
            totalNum: {
                default: 0,
                type: Number
            },
            command: {
                default: '',
                type: [String, Function]
            },
            search: {
                default: function () {
                    return {}
                },
                type: Object
            },
            limit: {
                default: 15,
                type: Number
            },
            totalPage: {
                default: 0,
                type: Number
            },
            service: {
                default: null,
                type: String
            },
            event: {
                default: null,
                type: String
            },
        },
        watch: {
            currentPage: {
                immediate: true,
                handler(value) {
                    this.currPage = value;
                }
            },
            search: {
                immediate: true,
                deep: true,
                handler(value) {
                    this.changePage(this.search['page'], value);
                }
            },
            totalNum: {
                immediate: true,
                handler(value) {
                    this.total = value;
                }
            },
            limit: {
                immediate: true,
                handler(value) {
                    this.pageSize = value;
                }
            },
            totalPage: {
                immediate: true,
                handler(value) {
                    this.pageCount = value;
                }
            }
        },
        data() {
            return {
                currPage: this.currentPage,
                total: this.totalNum,
                pageCount: this.totalPage,
                pageSize: this.limit
            };
        },
        methods: {
            changePage(page, search = null) {
                this.$emit('change-page', page);
                let query = search ? search : this.search;
                let q = {};
                for (let key in query) {
                    q[key] = this.base64.encodeURI(_.isArray(query[key]) || _.isObject(query[key]) ? this.json.encode(query[key]) : query[key]);
                }
                query = q;
                let params = {};
                query['page'] = page;
                params['projectId'] = this.$requestInput('projectId');
                this.$router.push({name: this.$currentRouteName(), params: params, query: query});
                this.updateList(page);
            },
            updateList(page = null) {
                page = page ? page : 1;
                let search = this.search;
                console.log('搜索条件：', search);
                delete search['page'];
                if (_.isFunction(this.command)) {
                    this.command(this.event, page, search, this.limit);
                } else {
                    this.$command(this.command, this.service, this.event, page, search, this.limit);
                }
            }
        }
    }
</script>
