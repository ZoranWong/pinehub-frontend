<template>
  <search-header>
    <template slot="searchInput">
      <el-form-item prop="name">
        <el-input size="small" v-model="name" placeholder="搜索关键词/规则名称"></el-input>
      </el-form-item>
      <el-form-item>
    </template>
    <template slot="opt">
      <el-button size="small" type="success" @click="">添加回复</el-button>
    </template>
  </search-header>
</template>

<script>
  import SearchHeader from '@/components/SearchHeader';
  export default {
    components: {
      'search-header': SearchHeader
    },
    data() {
      return {
        name: null
      };
    },
    computed: {
    }
  }
</script>
