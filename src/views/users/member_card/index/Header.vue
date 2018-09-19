<template>
  <search-header>
    <template slot="searchInput">
      <el-form-item prop="name" label="会员卡名称">
        <el-input size="small" v-model="name" placeholder="请输入会员卡名称"></el-input>
      </el-form-item>
    </template>
    <template slot="opt">
      <el-button size="small" type="primary" icon="el-icon-plus" >创建会员卡</el-button>
    </template>
  </search-header>
</template>
<script>
  import SearchHeader from '@/components/SearchHeader';
  import _ from 'underscore';
  import UserDict from '../../UserDict';
  export default {
    props: ['search'],
    components:{
      'search-header': SearchHeader
    },
    data() {
      return _.extend({
        name: null
      }, UserDict);
    },
    methods: {
    }
  }
</script>
<style >
  .el-tabs--top .el-tabs__item.is-top:last-child {
    font-size: 14px !important;
  }
</style>
