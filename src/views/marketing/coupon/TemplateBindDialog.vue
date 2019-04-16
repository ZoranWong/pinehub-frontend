<template>
    <el-tabs tab-position="left" v-model="selfWxType" @tab-click="wxTypeChangeHandler">
        <el-tab-pane label="小程序" name="miniprogram">
            <table-list :service="miniprogramConfig.service"
                        :event="miniprogramConfig.event"
                        :query="miniprogramConfig.query"
                        :current="miniprogramConfig.current"
                        :model="userTemplateMiniprogramModel">
                <template v-slot:header="{ search, searchHandler }">
                    <el-input v-model="miniprogramConfig.search" class="query-input"
                              style="width: 100%;" size="mini"
                              prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
                </template>
                <template v-slot:table="{data}">
                    <template-message-table :templateMessages="data" v-model="currentTemplate"
                                            @bind="bindTemplate" @unbind="unBindTemplate">
                    </template-message-table>
                </template>
            </table-list>
        </el-tab-pane>
        <el-tab-pane label="公众号" name="official_account">
            <table-list :service="officialAccountConfig.service"
                        :event="officialAccountConfig.event"
                        :query="officialAccountConfig.query"
                        :current="officialAccountConfig.current"
                        :model="userTemplateOfficialAccountModel">
                <template v-slot:header="{ search, searchHandler }">
                    <el-input v-model="officialAccountConfig.search" class="query-input"
                              style="width: 100%;" size="mini"
                              prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
                </template>
                <template v-slot:table="{data}">
                    <template-message-table :templateMessages="data" v-model="currentTemplate">
                    </template-message-table>
                </template>
            </table-list>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import TemplateMessageTable from './EmbedTemplateTable';
    import TableList from '@/components/TableList';

    export default {
        name: "TemplateBindDialog",
        components: {
            'template-message-table': TemplateMessageTable,
            'table-list': TableList,
        },
        computed: {
            userTemplateMiniprogramModel() {
                return this.$store.state.userTemplateWithMiniprogram;
            },
            userTemplateOfficialAccountModel() {
                return this.$store.state.userTemplateWithOfficialAccount;
            }
        },
        props: {
            wxType: {
                type: String,
                default: 'miniprogram'
            },
            currentTemplate: {
                type: Object,
                default: null
            },
        },
        beforeMount() {
            Object.assign(this.selfWxType, this.wxType);
        },
        watch: {
            'miniprogramConfig.search': {
                handler(value) {
                    this.miniprogramConfig.query = Object.assign({}, this.miniprogramConfig.query, {'title': value});
                }
            },
            'officialAccountConfig.search': {
                handler(value) {
                    this.officialAccountConfig.query = Object.assign({}, this.officialAccountConfig.query, {'title': value});
                }
            },
        },
        data() {
            return {
                miniprogramConfig: {
                    service: 'http.userTemplateWithMiniprogram',
                    event: 'userTemplateWithMiniprogram/setList',
                    current: 'userTemplateWithMiniprogram/currentPage',
                    search: '',
                    query: {}
                },
                officialAccountConfig: {
                    service: 'http.userTemplateWithOfficialAccount',
                    event: 'userTemplateWithOfficialAccount/setList',
                    current: 'userTemplateWithOfficialAccount/currentPage',
                    search: '',
                    query: {}
                },
                selfWxType: 'miniprogram',
            }
        },
        methods: {
            wxTypeChangeHandler(tabPane) {
                this.$emit('wxTypeChange', tabPane);
            },
            async bindTemplate(templateId) {
                this.$emit('bindTemplate', templateId);
            },
            unBindTemplate(templateId) {
                this.$emit('unBindTemplate', templateId);
            },
        }
    }
</script>

<style scoped>

</style>