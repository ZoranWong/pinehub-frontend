<template>
  <div class = "content-scroll">
		<div class = "content-box" style = "padding:20px 30px">
      <el-tabs active-name = "first">
        <el-tab-pane label = "编辑会员卡" name = "first"></el-tab-pane>
      </el-tabs>
      <div class = "form-container">
        <edit-form v-model = "card" ref = "memberCard"></edit-form>
      </div>
      <div class = "dialog-footer">
        <el-button class = "submit-button" type = "primary" size = "small" @click = "update">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Form from './Form';
export default {
  name: 'MemberCardEdit',
  components: {
    'edit-form': Form
  },
  data() {
    return {
      card: null
    };
  },
  methods: {
    async update() {
      console.log(this.card);
    },
    async loadMemberCard() {
      let memberCard = await this.http.memberCards.show(this.$requestInput('memberCardId'));
      this.card = memberCard;
      console.log(this.card);
    }
  },
  created() {
    this.loadMemberCard();
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
