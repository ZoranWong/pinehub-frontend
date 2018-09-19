<template>
  <el-col class="member-cards-list">
    <el-col class="card-item-box" :style="" :xl="4" :lg="6" :md="8" :sm="12" :xs="24" v-for="(item, index) in cards" :key="index">
      <el-col class="card-item"  >
        <div class="header">
            <h3 class="pull-left">{{ item.title }}</h3>
        </div>
        <div class="detail js-rights-area">
            <div class="rights-area"><span class="rights-item points"></span></div>
        </div>
        <div class="bottom-area">
            <div class="operate">
              <el-button size="small" @click.active="" type="text">查看成员</el-button> -
                <el-button size="small" @click.active="edit(true, item.id)" type="text">编辑</el-button>
            </div>
            <div class="state">{{item.sync}}</div>
        </div>
      </el-col>
      <el-col class="add-card" v-if="!cards || cards.length < 1">
        <h2>+</h2>
        <h3><el-button size="small" @click.active="create()" type="text">新建会员卡</el-button></h3>
      </el-col>
    </el-col>
  </el-col>
</template>
<script>
  export default {
    props: {
      cards: {
        default: null,
        type: Array
      }
    },
    data() {
      return {
      };
    },
    methods: {
      edit() {

      },
      create() {

      }
    },
    computed: {
    }
  }
</script>
<style scoped>
.member-cards-list{clear: both;}
.member-cards-list .card-item{
  background-color: #63b359;
  height:150px;
  display: inline-block;
  margin: 6px 2%;
  width: 96%;
  border-radius: 2% 2% 0 0;
  color: #fff;
  background-size: cover;
  background-position: 50%;
}
.member-cards-list .card-item .header{padding: 14px;overflow: hidden;height: 82px;}
.member-cards-list .card-item .header h3{line-height: 24px;text-shadow: 0 1px 4px rgba(0,0,0,.2);font-size: 16px;float: left;}
.member-cards-list .card-item .header h4{line-height: 24px;text-shadow: 0 1px 4px rgba(0,0,0,.2);font-size: 12px;float: right;}
.member-cards-list .card-item .detail{height: 30px;background-color: rgba(0,0,0,.3);line-height: 30px;overflow: hidden;padding: 0 14px;}
.member-cards-list .card-item .bottom-area {overflow: hidden;height: 40px;line-height: 40px;padding: 0 14px;background-color: #f8f8f8;font-size: 12px;color:#666}
.member-cards-list .add-card{width:300px;height:150px;text-align: center;display: inline-block;background-color: #f0f0f0;overflow: hidden;}
.member-cards-list .add-card h2{line-height: 100px;font-weight: 100;font-size: 85px;color: #fff;}
.card-item .bottom-area .operate{float:left;display: inline-block;width:180px !important}
.card-item .bottom-area .state{float:right;color:#666;display: inline-block;width:auto}
</style>
