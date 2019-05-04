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
                <el-main style="display: flex;">
                    <div style="width: 50%">
                        <p style="padding: 10px 0;font-size: 25px">配置</p>
                        <el-form label-width="130px">
                            <el-form-item v-for="(item,index) in items" :key="index" :label="item['key']">
                                <el-col :span="15">
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
                    </div>
                    <div style="padding: 0 0 0 10%;width: 50%;">
                        <div style="padding-bottom: 10px;">
                            <p>配置小助手(补充说明)</p>
                            <p style="font-size: 10px;color: #928383;">
                                各个配置项中，你可以自定义文本，在需要的地方关联上此模板消息之后，将采用你自定义的内容去发送消息给用户。你也可以使用大括号的形式，如“{xxx}”，其中，xxx代表的是下方某一类中的可选项，填写时请查看小手册，否则，不在下方小手册中的值将以你填写的大括号中的内容发送。
                                <br><br>
                                另外需要注意的是，填写正确的匹配项，如不要在优惠券有关的模板信息中填写订单中的配置项，造成不可识别的配置项仍然将以你填写的大括号中的内容发送。
                            </p>
                        </div>
                        <el-collapse accordion>
                            <el-collapse-item title="优惠券" name="coupon">
                                <p>title: 优惠券标题</p>
                                <p>validateTime: 优惠券有效时间</p>
                                <p>cardCode: 优惠券编码code</p>
                            </el-collapse-item>
                            <el-collapse-item title="订单" name="order">
                                <p>selfPickUpCode: 自提码</p>
                                <p>address: 自提地址、早餐车地址</p>
                                <p>pickUpTime: 自提时间</p>
                                <p>title: 待自提的商品名称</p>
                                <p>amount: 订单实付金额</p>
                                <p>paidAt: 支付时间</p>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
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
                this.userTemplateMessageEntity.title = this.wxTemplateMessage.title
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