<template>
  <el-dialog
		title="删除应用项目"
		:visible.sync="show"
		width="30%"
    @open="open"
    @close="close"
		center>
		<span>
      你将删除此应用，是否确定删除？
		</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="openPlatformAuth">删 除</el-button>
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
