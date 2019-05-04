<template>
    <ul class="template-message-list">
        <li v-for="(templateMessage,index) in templateMessages" :key="templateMessage.id"
            class="template-message-li">
            <a href="javascript:;" title="点击进入模板消息自定义" @click="switchToCustomizeTemplates(templateMessage)">
                <template-card v-model="templateMessages[index]"></template-card>
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
            // Redirect to user templates management page.
            switchToCustomizeTemplates(wxTemplateMessage) {
                this.$command('CREATE_UPDATE_ENTITY_INIT', 'wxTemplateMessages/createEditInit', wxTemplateMessage);
                this.$router.push({
                    name: 'wechat-template-messages-custom',
                    params: {
                        projectId: this.$requestInput('projectId'),
                        wxType: this.$requestInput('wxType'),
                        wxTemplateId: wxTemplateMessage.id
                    }
                });
            }
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
</style>