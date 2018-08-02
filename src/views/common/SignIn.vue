<template>
    <div id="login">
		<div class="login-container">
			<!--<div class="login-bg">
				<img class="logo" src="../../../src/assets/bg.png"/>
			</div>-->
			<transition name="fade">
				<el-form :model="ruleForm2" v-if="login" key="login" :rules="rules2" ref="ruleForm2" label-width="0px" class="login-box">
					<el-form-item prop="none">
						<img class="logo" src="../../../src/assets/logo.svg" alt="" style="width:50%;margin:0 auto;display:block"/>
						<p style="text-align: center;font-size: 18px;font-weight: bold;">PINEHUB管理系统</p>
					</el-form-item>
					<el-form-item prop="name">
						<el-input type="text" v-model="ruleForm2.name" placeholder="请输入手机号码"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" @keyup.native.enter="handleSubmit2" v-model="ruleForm2.password" placeholder="请输入密码" :disabled="!Boolean(ruleForm2.name)"></el-input>
					</el-form-item>
					<el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
					<!--<span class="forpsd" @click="forpsd">忘记密码？</span>-->
					<el-form-item>
						<el-button type="primary" style="width:100%;" @click="handleSubmit2" size="small">登录</el-button>
					</el-form-item>
				</el-form> 
				<el-form :model="ruleForm3" v-else key="seek" :rules="rules3" ref="ruleForm3" label-width="0px" class="login-box">
					<el-form-item prop="passport">
						<el-input type="text" v-model="ruleForm3.passport" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item prop="phone">
						<el-input v-model="ruleForm3.phone" placeholder="请输绑定的手机号"></el-input>
					</el-form-item>
					<el-form-item style="text-align: right;">
						<span class="back-login" @click="login = true">返回登录</span>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width:100%;" @click="seekpsd" size="small">找回密码</el-button>
					</el-form-item>
				</el-form>
			</transition>
		</div>
		<div class="login-ft">
			<p class="subtitle">京抖云网络技术有限公司 版权所有</p>
		</div>
	</div>
</template>
<script>
/* eslint-disable */
    export default {
		name: 'login',
		data() {
			return {
				ruleForm2: {
					name: '',
					password: ''
				},
				ruleForm3: {
					passport: '',
					phone: ''
				},
				rules2: {
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},{ validator: this.validateTel, trigger: 'blur' }],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						validator: this.validatePsd,
						trigger: 'blur'
					}]
				},
				rules3: {
					passport: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					phone: [{
							required: true,
							message: '请输绑定的手机号',
							trigger: 'blur'
						},
						{
							validator: this.validateTel,
							trigger: 'blur'
						}
					]
				},
				checked: false,
				login: true,
				publicKey : ''
			}
		},
		computed: {
		},
		methods: {
			async handleSubmit2() {
				let self = this;
				let valid = await this.$refs.ruleForm2.validate();
				if(valid){
					let data = await this.auth(self.publicKey).login(this.ruleForm2.name, this.ruleForm2.password);
					//登录后页面逻辑
					if(data){
					    console.log(data)
						this.token().setToken(data.token)
						sessionStorage.setItem('user', data.user.data.mobile)
						this.$router.push({
								path: '/Apps'
						})
					}
				}
			},
			seekpsd() {
				this.$refs.ruleForm3.validate((valid) => {
					if(valid) {
//						this.bLoading = true
						var para = this.ruleForm3;
//						this.post('/admin/pass/forgot.do', para, (data) => {
//							this.$message({
//								message: '密码已发送至你手机上，请查看',
//								type: 'success'
//							})
//						})
					}
				})
			},
			forpsd() {
				this.login = false
				this.ruleForm3.passport = this.ruleForm2.name
				this.ruleForm3.phone = ''
			},
			async getkey(){
				this.publicKey = await this.auth().getPublicKey();
				console.log(this.publicKey)
			}
		},
		created() {
			console.log(this.command('report', {'count': 100}));
		}
    }
</script>
<style>
	#login{
		height: 100%;
		padding-top:10%;
		position: relative;
		background-color: #35424D;
	}
	#login .login-ft{
		width: 100%;
		height: 10%;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#login .login-ft .title{
		text-align: center;
		color: #FFFFFF;
		font-size: 10px;
	}
	#login .login-ft .subtitle{
		text-align: center;
		color: #FFFFFF;
		font-size: 10px;
	}
	#login .el-input__inner{
		border: none;
		border-bottom: 1px solid #d1d1d1;
		border-radius: 0 !important;
	}
	#login .login-bg{
		width: 450px;
			height: 500px;
			background-size: cover;
			background-repeat: no-repeat;
			position: absolute;
			z-index: 999;
			left: 0px;
			/*top: 0px;*/
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
	}
	#login .login-bg .logo{
		/*width: 48%;*/
	}
	#login .login-bg .title{
		text-align: center;
		color: #fff;
		font-size: 40px;
		margin-top: 20px;
	}
	.login-container{
		/*position: absolute;
		top: 20%;
		left: 50%;
		margin-left: -455px;*/
		margin:0 auto;
		width: 470px;
		height: 440px;
		background: #FFFFFF;
		box-shadow: 0 0 24px 0 #161616;
		border-radius: 10px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.login-box{
		width: 400px;
		padding: 0 70px 0 0;
	}
	.login-box .remember{
		margin: 10px 0px 35px 0px;
		color: #333;
	}
	.login-box .el-checkbox__input.is-checked .el-checkbox__inner{
		background-color: #20a0ff;
		border-color: #0190fe;
	}
	.login-box .el-checkbox__inner{
		border-radius: 4px !important;
	}
	.login-box .forpsd{
		float: right;
		color: #333;
		cursor: pointer;
	}
	.login-box .back-login{
		color: orange;
		cursor: pointer;
	}
	.login-box .el-form-item__content{
		line-height: 36px;
		position: relative;
		font-size: 14px;
	}
	.login-box .el-button--primary{
		color: #fff;
		background-color: #20a0ff;
		border-color: #20a0ff;
	}
	.login-box .el-button{
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		margin: 0;
		padding: 10px 15px;
		border-radius: 4px;
	}
	.fade-enter-active,.fade-leave-active{
		transition: opacity .6s
	}
	.fade-enter,.fade-leave-active{
		opacity: 0
	}
</style>