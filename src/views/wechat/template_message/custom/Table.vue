<template>
    <ul class="template-message-list">
        <li v-for="(templateMessage,index) in templateMessages" :key="templateMessage.id"
            class="template-message-li">
            <a href="javascript:;">
                <template-card v-model="templateMessages[index]">
                    <template v-slot:options>
                        <div class="wx_mobile_panel_op">
                            <el-button class="wx_mobile_panel_bt" size="mini" type="primary" icon="el-icon-edit" circle
                                       @click="switchToTemplateUpdate(templateMessage)"></el-button>
                            <el-button class="wx_mobile_panel_bt" type="warning" size="mini" icon="el-icon-delete"
                                       circle
                                       @click="deleteConfirm(templateMessage)"></el-button>
                        </div>
                    </template>
                </template-card>
            </a>
        </li>
    </ul>
</template>

<script>
    import TemplateCard from './TemplateCard';

    export default {
        name: "Table",
        components: {
            'template-card': TemplateCard,
        },
        props: {
            templateMessages: {
                default: function () {
                    return [];
                },
                type: Array
            }
        },
        methods: {
            switchToTemplateUpdate(template) {
                this.$command('CREATE_UPDATE_ENTITY_INIT', 'userTemplateMessages/createEditInit', template);
                this.$router.push({
                    name: 'wechat-template-messages-custom-edit',
                    params: {
                        projectId: this.$requestInput('projectId'),
                        wxType: this.$requestInput('wxType'),
                        wxTemplateId: this.$requestInput('wxTemplateId'),
                        templateId: template.id
                    }
                });
            },
            deleteConfirm(template) {
                this.$confirm(`此操作将删除自填充模板消息"${template.title}", 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.deleteTemplateHandler(template);
                }).catch(() => {
                });
            },
            async deleteTemplateHandler(template) {
                await this.$command('DELETE_USER_TEMPLATE_MESSAGE', template.id);
                this.renderUserTemplateMessageList();
            },
            renderUserTemplateMessageList() {
                this.$command('DATA_LIST', 'http.userTemplateMessages', 'userTemplateMessages/setList', this.$requestInput('page'));
            },
        }
    }
</script>

<style scoped>
    .template-message-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: space-between;
    }

    .template-message-li {
        width: 18%;
        margin: 15px;
    }

    .wx_mobile_panel_op {
        padding: 10px;
    }

    .wx_mobile_panel_bt {
        margin-right: 5px;
    }
</style>