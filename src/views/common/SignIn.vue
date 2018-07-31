<template>
    <div id="signIn">
		<div class="sign-in-container">
			<transition name="fade">
        <sign-in v-if="signIn" key="signIn" ></sign-in>
        <seek-password v-else-if="seekPassword" key = "seekPassword" ></seek-password>
			</transition>
		</div>
		<div class="sign-in-footer">
			<p class="company">京抖云网络技术有限公司 版权所有</p>
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
      signIn () {
        return true;
      },
      seekPassword() {
        return false;
      }
		},
		methods: {

		},
		created() {
      console.log('signIn page created');
      this.command('account:sign-in', {username: 'Json', password: '123456'});
      this.command('report', {'speed': 100});
    }
  }
</script>
<style>
</style>
