<template>
  <el-dialog
		title="公众号/小程序授权"
		:visible.sync="show"
		width="60%"
    @open="open"
    @close="close"
		center>
		<span>
			<iframe src="http://www.youzan.com/v2/shop/weixin/binding" id="open_platform_auth" name="open_platform_auth" style="width: 100%;" ></iframe>
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
