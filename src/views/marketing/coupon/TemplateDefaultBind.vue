<template>
    <div class="content-scroll">
        <div class="content-box">
            <el-form label-width="120px">
                <div class="ticket-info base-rules">
                    <h4>模板消息关联</h4>
                    <el-form-item label="温馨提示">
                        <ul>
                            <li>
                                此处模板设置为优惠券有关模板消息的默认设置。当需要发送模板消息时，默认发送此处设置的模板消息，若需为特定优惠券进行定制，可在优惠券列表页“操作栏”点击“模板消息设置”进行设置。
                            </li>
                        </ul>
                    </el-form-item>
                    <el-form-item label="过期消息">
                        <el-button size="mini" type="success" icon="el-icon-plus"
                                   @click="popupTemplateBindDialogHandler('expire')">设置模板
                        </el-button>
                        <div style="width: 20%;">
                            <template-card v-if="template.scenes.expire.data" v-model="template.scenes.expire.data">
                            </template-card>
                        </div>
                    </el-form-item>
                    <el-form-item label="领取消息:">
                        <el-button size="mini" type="success" icon="el-icon-plus"
                                   @click="popupTemplateBindDialogHandler('book')">设置模板
                        </el-button>
                        <div style="width: 20%;">
                            <template-card v-if="template.scenes.book.data" v-model="template.scenes.book.data">
                            </template-card>
                        </div>
                    </el-form-item>
                </div>
            </el-form>

            <el-dialog title="关联模板消息" :visible.sync="templateDialogTableVisible" width="90%">
                <template-bind-dialog :current-template="template.current.data"
                                      :wx-type="template.current.wxType"
                                      @wxTypeChange="wxTypeChangeHandler"
                                      @bindTemplate="bindTemplate"
                                      @unBindTemplate="unBindTemplate">
                </template-bind-dialog>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import TemplateCard from './TemplateCard';
    import TemplateBindDialg from './TemplateBindDialog';

    export default {
        name: "TemplateDefaultBind",
        components: {
            'template-card': TemplateCard,
            'template-bind-dialog': TemplateBindDialg
        },
        data() {
            return {
                sceneToType: {
                    expire: 3,
                    book: 2
                },
                templateDialogTableVisible: false,
                template: {
                    scenes: {
                        expire: {
                            type: 'miniprogram',
                            data: null
                        },
                        book: {
                            type: 'miniprogram',
                            data: null
                        }
                    },
                    current: {
                        scene: null,
                        wxType: 'miniprogram',
                        data: null,
                    }
                }
            }
        },
        async mounted() {
            this.renderTemplateMessage();
        },
        methods: {
            popupTemplateBindDialogHandler(scene) {
                this.template.current.scene = scene;
                this.template.current.data = this.template.scenes[scene].data;
                console.log('当前关联选项：', this.template.current.wxType, scene);
                this.templateDialogTableVisible = true;
            },
            wxTypeChangeHandler(tabPane) {
                this.template.current.wxType = tabPane.name;
            },
            async renderTemplateMessage() {
                console.log('渲染优惠券模板消息...');
                let templateBindList = await this.$command('GET_COUPON_DEFAULT_TEMPLATES', JSON.stringify([2, 3]));
                let vm = this;
                templateBindList.forEach((template) => {
                    vm.template.scenes[template.scene].type = template.wx_type;
                    vm.template.scenes[template.scene].data = template.userTemplateMessage.data;
                    vm.template.scenes[template.scene].data.title = template.userTemplateMessage.data.parent.title
                });
                console.log('渲染优惠券模板消息结束');
            },
            async bindTemplate(templateId) {
                console.log('关联模板消息ID:', templateId);
                let userTemplateMessage = await this.$command('BIND_COUPON_DEFAULT_TEMPLATE',
                    templateId, this.template.current.wxType, this.template.current.scene, this.sceneToType[this.template.current.scene]);
                this.template.scenes[this.template.current.scene].data = userTemplateMessage;
                this.template.current.data = userTemplateMessage;
                this.$message.success('绑定成功');
            },
            async unBindTemplate(templateId) {
                console.log('解除关联模板消息ID:', templateId);
                await this.$command('UNBIND_COUPON_DEFAULT_TEMPLATE', templateId,
                    this.template.current.wxType, this.template.current.scene, this.sceneToType[this.template.current.scene]);
                this.template.current.data = null;
                this.template.scenes[this.template.current.scene].data = null;
                this.$message.success('解绑成功');
            },
        }
    }
</script>

<style scoped>

</style>