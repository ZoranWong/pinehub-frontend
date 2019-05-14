<template>
    <div class="content-scroll">
        <div class="content-box">
            <table-list :service="service" :event="event" :current="current" :query="query" :model="model">
                <template v-slot:header="{ search,searchHandler }">
                    <el-tooltip class="" effect="dark" placement="bottom-start">
                        <div slot="content">
                            如果您修改了小程序微信公众平台上的关联模板消息，<br><br>
                            并且修改的模板消息已经在使用的话，建议您点击此按钮，保证应用同步。
                        </div>
                        <el-button type="success" @click="syncWxTemplates(wxType)">
                            同步小程序微信模板消息库
                        </el-button>
                    </el-tooltip>
                </template>
                <template v-slot:table="{ data }">
                    <template-message-table :templateMessages="data" v-if="syncSucceed">
                    </template-message-table>
                </template>
            </table-list>
        </div>
    </div>
</template>

<script>
    import TemplateMessageTable from './Table';
    import TableList from '@/components/TableList';

    export default {
        name: "TemplateIndex",
        components: {
            'template-message-table': TemplateMessageTable,
            'table-list': TableList,
        },
        computed: {
            model() {
                return this.$store.state.wxTemplateMessages;
            },
            wxType() {
                return this.$requestInput('wxType');
            }
        },
        beforeDestroy() {
            if (this.hasOwnProperty('syncIntervalId')) {
                window.clear(this.syncIntervalId);
            }
            if (this.hasOwnProperty('syncLoading')) {
                this.syncLoading.close();
            }
        },
        data() {
            return {
                service: 'http.wxTemplateMessages',
                event: 'wxTemplateMessages/setList',
                current: 'wxTemplateMessages/currentPage',
                query: {},
                syncSucceed: true,
            }
        },
        watch: {
            syncSucceed: function (value) {
                if (value) {
                    window.clearInterval(this.syncIntervalId);
                    this.query = Object.assign({}, this.query);
                    this.syncLoading.close();
                } else {
                    let that = this;
                    this.syncIntervalId = window.setInterval(function () {
                        that.checkSyncWxTemplatesStatus(that.wxType);
                    }, 5000);
                    this.syncLoading = this.$loading({
                        lock: true,
                        text: '小程序模板消息正在同步中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.8)'
                    });
                }
            }
        },
        methods: {
            async syncWxTemplates(type) {
                this.syncSucceed = false;
                this.$command('SYNC_WX_TEMPLATE_MESSAGES', type);
            },
            async checkSyncWxTemplatesStatus(type) {
                let result = await this.$command('SYNC_WX_TEMPLATE_MESSAGES_STATUS_CHECK', type);
                if (result.status === 'sync_end') {
                    this.syncSucceed = true;
                }
            },
        }
    }
</script>

<style scoped>

</style>