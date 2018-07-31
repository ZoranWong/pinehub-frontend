<template>
    <div id="login">
		<div class="login-container">
			<transition name="fade">
        <sign-in v-if="signIn" key="signIn" ></sign-in>
        <seek-password v-else-if="seekPassword" key = "seekPassword" ></seek-password>
			</transition>
		</div>
		<div class="login-ft">
			<p class="subtitle">京抖云网络技术有限公司 版权所有</p>
		</div>
	</div>
</template>

<script>
  import SeekPasswordComponent from '../../components/SeekPasswordComponent.vue';
  import SignInComponent from '../../components/SignInComponent.vue';
  export default {
		name: 'signIn',
    components: {
      'seek-password': SeekPasswordComponent,
      'sign-in': SignInComponent
    },
		computed: {
		},
		methods: {

		},
		created() {
      console.log('signIn page created');
    }
  }
</script>
<style>
</style>
