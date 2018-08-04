<template>
    <div id="login">
		<div class="login-container">
			<transition name="fade">
				<sign-in v-if="login" > </sign-in>
        <seek-password v-else ></seek-password>
			</transition>
		</div>
		<div class="login-footer">
			<p class="subtitle">京抖云网络技术有限公司 版权所有</p>
		</div>
	</div>
</template>
<script>
/* eslint-disable */
import SignInComponent from '../../components/SignInComponent.vue';
import SeekPasswordComponent from '../../components/SeekPasswordComponent.vue';
export default {
		name: 'login',
		data() {
			return {
				login: true,
			}
		},
    components: {
      'sign-in': SignInComponent,
      'seek-password': SeekPasswordComponent
    },
		computed: {
		},
		methods: {
		},
		created() {
      this.$error('notFound', '暂无数据');
      console.log(this.$store.state.order.currentPage);
      this.$store.dispatch('order/nextPage');
      console.log('change page');
      console.log(this.$store.state.order.currentPage);
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
	#login .login-footer{
		width: 100%;
		height: 10%;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#login .login-footer .title{
		text-align: center;
		color: #FFFFFF;
		font-size: 10px;
	}
	#login .login-footer .subtitle{
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
