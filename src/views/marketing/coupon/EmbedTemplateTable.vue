<template>
    <ul class="template-message-list">
        <li v-for="(templateMessage,index) in templateMessages" :key="templateMessage.id"
            class="template-message-li">
            <a href="javascript:;">
                <template-card v-model="templateMessages[index]">
                    <template v-slot:options>
                        <div class="wx_mobile_panel_op">
                            <el-button class="wx_mobile_panel_bt" size="mini" type="warning" icon="el-icon-close"
                                       v-if="value && value.id === templateMessage.id"
                                       @click="unBindTemplate(templateMessage)">取消选择
                            </el-button>
                            <el-button class="wx_mobile_panel_bt" type="success" size="mini" icon="el-icon-check"
                                       v-else @click="bindTemplate(templateMessage)">选择
                            </el-button>
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
        name: "EmbedTemplateTable",
        components: {
            'template-card': TemplateCard,
        },
        props: {
            templateMessages: {
                default: function () {
                    return [];
                },
                type: Array
            },
            value: {
                type: Object
            }
        },
        methods: {
            async bindTemplate(templateMessage) {
                this.$confirm(`此操作将关联“${templateMessage.title}”，是否继续？`, '提示')
                    .then(() => {
                        this.$emit('bind', templateMessage.id);
                    }).catch(() => {
                });
            },
            async unBindTemplate(templateMessage) {
                this.$confirm(`此操作将解绑“${templateMessage.title}”，是否继续？`, '提示')
                    .then(() => {
                        this.$emit('unbind', templateMessage.id);
                    }).catch(() => {
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
        width: 19%;
        margin: 6px;
    }

    .wx_mobile_panel_op {
        padding: 10px;
    }

    .wx_mobile_panel_bt {
        margin-right: 5px;
    }
</style>