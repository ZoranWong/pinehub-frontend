<template>
    <div class="content-scroll">
        <div class="content-box" style="padding: 20px 30px;">
            <el-container>
                <el-aside>
                    <div class="template-card-example-box">
                        <template v-if="templateId">
                            <p class="title">
                                <span>自定义模板消息</span>
                            </p>
                            <template-card v-model="templateMessage"></template-card>
                        </template>
                        <template v-else>
                            <p class="title">
                                <span>微信模板消息</span>
                            </p>
                            <template-card v-model="userTemplateMessageEntity"></template-card>
                        </template>
                    </div>
                </el-aside>
                <el-main>
                    <p style="padding: 10px 0;font-size: 25px">配置</p>
                    <el-form label-width="130px">
                        <el-form-item v-for="(item,index) in items" :key="index" :label="item['key']">
                            <el-col :span="8">
                                <el-form-item>
                                    <el-input :style="{width: '100%'}"
                                              v-model="userTemplateMessageEntity.content['keyword'+(index+1)]['value']">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item>
                                    <el-color-picker style="width: 100%;"
                                                     v-model="userTemplateMessageEntity.content['keyword'+(index+1)]['color']">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="configSubmitHandler" type="primary">
                                <span v-if="templateId">立即更新</span>
                                <span v-else>立即创建</span>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    import TemplateCard from './TemplateCard';

    export default {
        name: "Form",
        components: {
            'template-card': TemplateCard,
        },
        computed: {
            userTemplateMessage() {
                return this.$store.state.userTemplateMessages.entity;
            },
            wxTemplateMessage() {
                return this.$store.state.wxTemplateMessages.entity;
            },
            templateId() {
                return this.$requestInput('templateId');
            },
            templateMessage() {
                return this.templateId ? this.userTemplateMessage : this.wxTemplateMessage;
            },
            items() {
                return this.templateMessage.items;
            }
        },
        data() {
            return {
                userTemplateMessageEntity: {
                    'type': 1,
                    'template_id': null,
                    'content': null,
                }
            }
        },
        beforeMount() {
            if (this.templateId) {
                this.userTemplateMessageEntity = this.templateMessage;
            } else {
                let items = this.wxTemplateMessage.items;
                let content = {};
                for (let index in items) {
                    content['keyword' + (parseInt(index) + 1)] = {
                        value: items[index]['value'],
                        color: '#545454'
                    };
                }
                this.userTemplateMessageEntity.content = Object.assign({}, content);
                this.userTemplateMessageEntity.template_id = this.$requestInput('wxTemplateId');
                this.userTemplateMessageEntity.parent = this.templateMessage;
            }
        },
        methods: {
            async configSubmitHandler() {
                if (this.templateId) {
                    await this.$command('UPDATE_USER_TEMPLATE', this.userTemplateMessageEntity);
                    this.$message.success('已更新');
                } else {
                    await this.$command('CREATE_USER_TEMPLATE', this.userTemplateMessageEntity);
                    this.$message.success('已创建');
                }
            }
        }
    }
</script>

<style scoped>
    .content-box {
        height: 100%;
    }

    .el-aside {
        background-color: #eaeef3;
        border-radius: 10px;
        text-align: center;
        width: 30% !important;
        margin: 20px;
    }

    .el-main {
        /*background-color: #eaeef3;*/
        /*text-align: center;*/
        margin: 20px;
        border-radius: 10px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .template-card-example-box {
        padding: 4% 15% 8% 15%;
    }

    .template-card-example-box .title {
        padding: 10px 0;
        font-size: 25px;
    }
</style>