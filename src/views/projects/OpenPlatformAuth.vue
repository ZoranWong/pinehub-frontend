<template>
  <el-dialog
		:title="title"
		:visible.sync="dialogShow"
		width="80%"
    @open="open"
    @close="close"
		center>
		<div class="web-site">
			<iframe class="open-platform-auth" scrolling="no" :src="authUrl" id="open_platform_auth" name="open_platform_auth" style="width: 100%;" ></iframe>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="makeSure">确 认</el-button>
		</span>
	</el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    show: {
      default: false,
      type: Boolean
    },
    authUrl: {
      default: null,
      type: String
    }
  },
  watch: {
    show(value) {
      this.dialogShow = value;
    }
  },
  data() {
    return {
      dialogShow: this.show
    };
  },
  methods: {
    async makeSure() {
      this.close();
      let result = await this.http.projects.makeSure();
      if(result) {
        this.$message({
          message: '授权成功',
          type: 'success'
        });
        await this.$command('RELOAD');
        this.close();
      } else {
        this.$message({
          message: '授权失败',
          type: 'error'
        });
      }
    },
    open() {
      this.dialogShow = true;
      this.$emit('open');
    },
    close() {
      this.dialogShow = false;
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
.open-platform-auth html{
	margin: -219px -150px 0 -150px;
  width: 100%;
	height: 480px;
}

.open-platform-auth html .mp-body{
	padding-bottom: 0;
}
.open-platform-auth html .mp-foot{
	display: none;
}
</style>
