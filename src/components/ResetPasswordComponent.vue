<template>
    <el-dialog  :close-on-click-modal="false" v-if="show">
        <el-tabs active-name="first">
            <el-tab-pane :label="userName+'-修改密码'" name="first"></el-tab-pane>
        </el-tabs>
        <el-form :model="data" :rules="rules" ref="resetPasswordForm" label-width="120px">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="data.oldPassword" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="data.newPassword" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="doPsd">
                <el-input type="password" v-model="data.confirmPassword" :maxlength="20"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="show = false" size="small">取 消</el-button>
            <el-button type="primary" @click="submit()" size="small">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'ResetPasswordComponent',
        props:['show'],
        data() {
            return {
                data: {
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword: null
                },
                rules: {
                    oldPassword: {

                    },
                    newPassword: {

                    },
                    confirmPassword: {

                    }
                }
            }
        },
        methods: {
            submit() {

            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
