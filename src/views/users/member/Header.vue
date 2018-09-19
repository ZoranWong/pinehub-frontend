<template>
  <search-header>
    <template slot="searchInput">
      <el-form-item prop="mobile" label="手机号码">
        <el-input size="small" v-model="mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input size="small" v-model="nickname" placeholder=""></el-input>
      </el-form-item>
      <el-form-item prop="channel" label="来源渠道">
        <el-select size="small" v-model="channel">
          <el-option v-for="(value, key) in channels" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="ordersCount" label="购次">
        <el-select size="small" v-model="channel">
          <el-option v-for="(value, key) in ordersCountDict" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="registerChannel" label="注册方式">
        <el-select size="small" v-model="registerChannel">
          <el-option v-for="(value, key) in registerChannels" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot="opt">
      <el-button size="small" type="primary" @click="memberCards">会员卡管理</el-button>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  import _ from 'underscore';
  import UserDict from '../UserDict';
  export default {
    props: ['search'],
    components:{
      'search-header': SearchHeader
    },
    data() {
      return _.extend({
        mobile: null,
        nickname: null,
        channel: 0,
        ordersCount: 0,
        registerChannel: 0
      }, UserDict);
    },
    methods: {
      memberCards() {
        this.$router.push({name: 'member-cards',  query: {projectId: this.$router.currentRoute.query.projectId}});
      }
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
