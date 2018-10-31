<template>
  <div class="content-scroll">
		<div class="content-box" style="padding:20px 30px">
      <el-tabs active-name="first">
        <el-tab-pane label="新建优惠券" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <create-form v-model="ticket" ref="ticket"></create-form>
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
  name: 'CouponCreate',
  components: {
    'create-form': Form
  },
  data() {
    return {
      ticket: null
    };
  },
  methods: {
    async create() {
      let result = await this.$refs['activity'].$refs['activity'].validate();
      if(!result) {
        this.$message({
          message: '有必要参数未填写或者格式错误，请填写后再提交',
          type: 'error'
        });
      } else {
        console.log(this.activity);
        this.$command('CREATE_PAID_GIFT_ACTIVITY',this.$requestInput('projectId'), this.activity, this);
      }
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
