<template>
  <el-form label-width="0px" class="sign-in-form login-box">
    <el-form-item prop="none">
      <img class="logo" src="../../src/assets/logo.svg" alt="" style="width:50%;margin:0 auto;display:block"/>
      <p style="text-align: center;font-size: 18px;font-weight: bold;">PINEHUB管理系统</p>
    </el-form-item>
    <el-form-item prop="name">
      <el-input type="text" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" placeholder="请输入密码" ></el-input>
    </el-form-item>
    <el-checkbox class="remember">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" style="width:100%;" size="small">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SignInComponent'
}
</script>
<style scoped>
</style>
