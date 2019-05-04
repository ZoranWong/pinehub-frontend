<template>
    <div class="content-scroll">
        <div class="content-box" style="padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane label="新建优惠券" name="first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <create-form v-model="ticket" ref="ticket"></create-form>
            </div>
            <div class="dialog-footer" style="margin-bottom: 64px">
                <el-button class="submit-button" type="primary" size="small" @click="create">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Form from './CouponForm';

    export default {
        name: 'CouponCreate',
        components: {
            'create-form': Form
        },
        methods: {
            async create() {
                let result = await this.$refs['ticket'].$refs['ticketForm'].validate();
                if (!result) {
                    this.$message({
                        message: '有必要参数未填写或者格式错误，请填写后再提交',
                        type: 'error'
                    });
                } else {
                    let ticket = await this.$command('CREATE_TICKET', this.$requestInput('projectId'), this.ticket);
                    this.$message.success(`优惠券${ticket.title}创建成功`);
                }
            }
        },
        data() {
            return {
                ticket: null
            };
        }
    }
</script>
<style scoped>
    .submit-button {
        margin: auto !important;
        width: 64px;
        display: block !important;
    }
</style>
