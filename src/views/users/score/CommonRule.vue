<template>
  <el-col :span="24" class="toolbar">
    <div class="common-score-title">
      <p>店铺积分通用规则</p>
    </div>
    <div class="common-score-rule">
      <el-button size="small" type="primary" @click.native="setRule()">设置通用规则</el-button>
      <div>
        <p v-if="endAt">积分通用有效期:至 {{ endAt }}</p>
        <p v-if="limit">获取数量限制:一个客户每天最多获取 {{ limit }} 积分</p>
      </div>
    </div>
  </el-col>
</template>
<script>
  export default {
    props: ['search'],
    data() {
      return {
      };
    },
    computed: {
      endAt() {
        return '2018-09-30 09:10:00'
      },
      limit() {
        return 30;
      }
    },
    methods: {
      setRule() {

      }
    }
  }
</script>
<style scoped>
.common-score-title p{border-left: 4px solid #f70;padding-left:12px}
.common-score-title{background: #f5f5f5;padding:12px;margin:10px 0;color:#000;font-size: 14px;font-weight: 700;}
.common-score-rule div{padding: 15px;border: 1px solid #e5e5e5;margin-top: 10px;line-height: 25px;font-size: 12px;}
.common-score-rule div p:last-child{margin-left:20px;}
</style>
