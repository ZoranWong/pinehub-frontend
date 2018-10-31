<template>
  <div class="content-scroll">
		<div class="content-box" style="padding:20px 30px">
      <el-tabs active-name="first">
        <el-tab-pane label="新建商品" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <create-form v-model="merchandise" ref="merchandise"></create-form>
      </div>
      <div class="dialog-footer">
        <el-button class="submit-button" type="primary" size="small" @click="create">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Form from './Form';
export default {
  name: 'MerchandiseCreate',
  components: {
    'create-form': Form
  },
  data() {
    return {
      merchandise: null
    };
  },
  methods: {
    async create() {

    }
  }
}
</script>
<style scoped>
.submit-button{
	margin: auto !important;
	width: 64px;
	display: block !important;
}
</style>
