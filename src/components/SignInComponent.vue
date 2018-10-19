<template>
  <el-form label-width="0px" class="sign-in-form login-box" :model="account">
    <el-form-item prop="none">
      <img class="logo" src="../../src/assets/logo.svg" alt="" style="width:50%;margin:0 auto;display:block"/>
      <p style="text-align: center;font-size: 18px;font-weight: bold;">PINEHUB管理系统</p>
    </el-form-item>
    <el-form-item prop="username" :rules ="[{required: true, message: '请输入用户名', trigger: 'blur'}]">
      <el-input type="text" placeholder="请输入手机号码" v-model="account['username']"></el-input>
    </el-form-item>
    <el-form-item prop="password" :rules ="[{required: true, message: '请输入账号密码', trigger: 'blur'}]">
      <el-input type="password" placeholder="请输入密码" v-model="account['password']"></el-input>
    </el-form-item>
    <el-checkbox class="remember">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" style="width:100%;" size="small" @click = "signIn">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SignInComponent',
  data() {
    return {
      account: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    signIn() {
      this.$command('SIGNIN', this.account['username'], this.account['password']);
    }
  }
}
</script>
<style scoped>
</style>
