<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted() {
    console.log('mounted');
  },
  created() {
    console.log(this);
    (async () => {
      console.log(await this.account.httpGet('', '', true));
    })();

  }
}
</script>

<style>
@import url("assets/css/custom.css");
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		height: 100%;
		width: 100%;
	}
	.topBackBtn { position:absolute; right:10px; top:8px; }
</style>
