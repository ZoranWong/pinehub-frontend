<template>
  <el-dialog
		title="公众号/小程序授权"
		:visible.sync="show"
		width="80%"
    @open="open"
    @close="close"
		center>
		<span>
			<iframe scrolling="no" src="http://www.youzan.com/v2/shop/weixin/binding" id="open_platform_auth" name="open_platform_auth" style="width: 100%;" ></iframe>
		</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="openPlatformAuthShow = false;">取 消</el-button>
			<el-button type="primary" @click="openPlatformAuth">确 认</el-button>
		</span>
	</el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
    };
  },
  methods: {
    openPlatformAuth() {

    },
    open() {
      this.$emit('open');
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>
<style>
iframe{
	width: 340px;
	margin: 8px 0;
	height: 500px;
	position: relative;
	overflow: hidden;
	border: 1px solid #a0a0a0;
}
body{
  min-width: 100% !important;
}
iframe html{
	margin: -219px -150px 0 -150px;
  width: 100%;
	height: 480px;
}

iframe html .mp-body{
	padding-bottom: 0;
}
iframe html .mp-foot{
	display: none;
}
</style>
