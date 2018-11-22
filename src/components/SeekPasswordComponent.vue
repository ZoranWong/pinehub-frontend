<template>
    <el-form label-width="0px" class="login-box">
        <el-form-item prop="passport">
            <el-input type="text" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
            <el-input placeholder="请输绑定的手机号"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
            <span class="back-login" >返回登录</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;" size="small">找回密码</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'SeekPasswordComponent'
    }
</script>
<style scoped></style>
