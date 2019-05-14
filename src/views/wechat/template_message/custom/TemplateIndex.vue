<template>
    <div class="content-scroll">
        <div class="content-box">
            <table-list :service="service" :event="event" :current="current" :query="query" :model="model">
                <template v-slot:header="{search,searchHandler}">
                    <el-button type="success" icon="el-icon-plus" @click="switchToTemplateCreate">新建自填充模板消息</el-button>
                </template>
                <template v-slot:table="{data}">
                    <template-message-table :templateMessages="data"></template-message-table>
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
                return this.$store.state.userTemplateMessages;
            }
        },
        data() {
            return {
                service: 'http.userTemplateMessages',
                event: 'userTemplateMessages/setList',
                current: 'userTemplateMessages/currentPage',
                query: {}
            }
        },
        methods: {
            switchToTemplateCreate() {
                this.$command('CREATE_UPDATE_ENTITY_INIT', 'userTemplateMessages/createEditInit', null);
                this.$router.push({
                    name: 'wechat-template-messages-custom-create',
                    params: {
                        projectId: this.$requestInput('projectId'),
                        wxType: this.$requestInput('wxType'),
                        wxTemplateId: this.$requestInput('wxTemplateId')
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>