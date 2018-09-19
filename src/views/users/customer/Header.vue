<template>
  <search-header>
    <template slot = "searchInput">
      <el-form-item prop="nickname" label="关键词">
        <el-input size="small" v-model="nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="channel" label="来源渠道">
        <el-select size="small" v-model="channel">
          <el-option v-for="(value, key) in channels" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="ordersCount" label="购次">
        <el-select size="small" v-model="ordersCount">
          <el-option v-for="(value, key) in ordersCountDict" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="isMember" label="客户身份">
        <el-select size="small" v-model="isMember">
          <el-option v-for="(value, key) in userTypes" :value="key" :label="value" :key="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="card" label="会员卡">
        <el-select size="small" v-model="card">
        </el-select>
      </el-form-item>
    </template>
    <template slot="opt">
      <div>
        <el-button size="small" type="primary" icon="el-icon-plus">添加客户</el-button>
        <el-button size="small" plain>批量导入</el-button>
      </div>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  import UserDict from '../UserDict';
  import _ from 'underscore';
  export default {
    props: ['search'],
    components: {
      'search-header': SearchHeader
    },
    data() {
      return _.extend({
        nickname: null,
        channel: 0,
        card: null,
        isMember: 0,
        ordersCount: 0
      }, UserDict);
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
