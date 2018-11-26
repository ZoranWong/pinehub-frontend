<template>
    <el-form label-width="0px" class="sign-in-form login-box" :model="account">
        <el-form-item prop="none">
            <!--<img class="logo" src="../../src/assets/logo.svg" alt="" style="width:50%;margin:0 auto;display:block">-->
            <p style="text-align: center;font-size: 18px;font-weight: bold;">PINEHUB管理系统</p>
        </el-form-item>
        <el-form-item prop="username" :rules ="[{required: true, message: '请输入用户名', trigger: 'blur'}]">
            <el-input v-model="account['username']" type="text" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item prop="password" :rules ="[{required: true, message: '请输入账号密码', trigger: 'blur'}]">
            <el-input v-model="account['password']" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-checkbox v-model = "remembered" class="remember" @change = "change">记住密码</el-checkbox>
        <el-form-item>
            <el-button v-loading = "loading" type="primary" style="width:100%;" size="small" :disabled="disabled" @click = "signIn">登录</el-button>
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
            },
            loading: false,
            remembered: false
        };
    },
    computed: {
        disabled() {
            return !this.$store.getters['account/publicKey'];
        }
    },
    created() {
        let account = this.localStorage.get('remembered');
        if (account) {
            this.account = account;
            this.remembered = true;
        }
    },
    beforeDestroy() {
        this.change(this.remembered);
    },
    methods: {
        async signIn() {
            this.loading = true;
            await this.$command('SIGNIN', this.account['username'], this.account['password']);
            this.loading = false;
        },
        change(result) {
            if (result) {
                this.localStorage.put('remembered', this.account);
            }else{
                this.localStorage.delete('remembered');
            }

        }
    }
}
</script>
<style scoped>
</style>
