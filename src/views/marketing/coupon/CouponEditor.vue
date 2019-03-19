<template>
    <div class="content-scroll">
        <div class="content-box" style="padding:20px 30px">
            <el-tabs active-name="first">
                <el-tab-pane label="新建优惠券" name="first"></el-tab-pane>
            </el-tabs>
            <div class="form-container">
                <ticket-form v-model="ticket" ref="ticket"></ticket-form>
            </div>
            <div class="dialog-footer" style="margin-bottom: 64px">
                <el-button class="submit-button" type="primary" size="small" @click="update">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Form from './CouponForm';
    export default {
        name: 'CouponEditor',
        components: {
            'ticket-form': Form
        },
        methods: {
            async update() {
                let result = await this.$refs['ticket'].$refs['ticketForm'].validate();
                if(!result) {
                    this.$message({
                        message: '有必要参数未填写或者格式错误，请填写后再提交',
                        type: 'error'
                    });
                } else {
                    console.log(this.ticket);
                    this.$command('CREATE_TICKET',this.$requestInput('projectId'), this.ticket);
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
    .submit-button{
        margin: auto !important;
        width: 64px;
        display: block !important;
    }
</style>
