<template>
    <div class="content-scroll">
        <div class="content-box">
            <!--工具条-->
            <slot name="header" :search="searchJson" :searchHandler="search"></slot>
            <!--列表-->
            <slot name="table" :data="data"></slot>
            <!--工具条-->
            <paginator
                    :totalNum="totalNum"
                    :service="service"
                    :event="event"
                    :totalPage="totalPage"
                    :currentPage="currentPage"
                    :command="command"
                    :limit="pageCount"
                    @change-page="changePage"
                    :search="searchJson">
            </paginator>
            <!--二维码图片界面-->
            <slot name="ext"></slot>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import Paginator from '@/components/Paginator';
    import _ from 'underscore';

    export default {
        name: 'TableList',
        components: {
            paginator: Paginator
        },
        props: {
            'service': {
                default: '',
                type: String
            },
            'event': {
                default: '',
                type: String
            },
            'model': {
                default: function () {
                    return {}
                },
                type: Object
            },
            'current': {
                default: '',
                type: String
            },
            listCommand: {
                default: 'DATA_LIST',
                type: [String, Function]
            },
            query: {
                default: function () {
                    return {};
                },
                type: Object
            }
        },
        data() {
            return {
                searchJson: {}
            };
        },
        computed: {
            totalNum() {
                return this.model.totalNum;
            },
            totalPage() {
                console.log('total page', this.model.totalPage);
                return this.model.totalPage;
            },
            pageCount() {
                console.log('page Count', this.model.pageCount);
                return this.model.pageCount ? this.model.pageCount : 15;
            },
            currentPage() {
                return parseInt(this.model.currentPage);
            },
            data() {
                return this.$store.getters[this.current];
            },
            command() {
                return this.listCommand;
            }
        },
        watch: {
            query: {
                deep: true,
                handler(value) {
                    this.search(value);
                }
            }
        },
        methods: {
            search(data) {
                data['page'] = 1;
                this.searchJson = Object.assign({}, this.searchJson, data);
                for (let key in this.searchJson) {
                    if (!this.searchJson[key]) {
                        delete this.searchJson[key];
                    }
                }
            },
            changePage(page) {
                this.page = page;
            }
        },
        created() {
            let page = this.$requestInput('page');
            this.page = parseInt(!page ? 1 : page);
            let query = this.$query();
            let q = {};
            for (let key in query) {
                let value = this.json.decode(this.base64.decodeURI(query[key]));
                if (_.isObject(value) || _.isArray(value)) {
                    q[key] = value;
                } else {
                    q[key] = query[key];
                }
            }
            this.searchJson = Object.assign({}, q, this.query);
        },
    }
</script>
<style scoped>
    #mapContainer {
        min-width: 500px;
        min-height: 500px;
    }
</style>
