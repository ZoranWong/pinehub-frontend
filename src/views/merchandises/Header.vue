<template>
  <search-header>
    <template slot = "searchInput">
      <el-form-item prop="name" label="">
        <el-input size="small" v-model.lazy ="shopName" placeholder="商店名称"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="">
        <el-input size="small" v-model.lazy ="merchandiseName" placeholder="商品名"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="">
        <el-input size="small" v-model.lazy ="category" placeholder="品类"></el-input>
      </el-form-item>
      <el-form-item prop="begin_at" label="">
        <el-input size="small" v-model.number="minSellNum"  placeholder="最低销量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="" label-width="0px">
        -
      </el-form-item>
      <el-form-item prop="end_at" label="" label-width="0px">
        <el-input size="small" v-model.number="maxSellNum" placeholder="最高销量" type="number"></el-input>
      </el-form-item>
      <el-form-item prop="begin_at" label="">
        <el-input size="small" v-model.number="minPrice" placeholder="最低价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="" label-width="0px">
        -
      </el-form-item>
      <el-form-item prop="end_at" label="" label-width="0px">
        <el-input size="small" v-model.number="maxPrice" placeholder="最高价格" type="number"></el-input>
      </el-form-item>
    </template>
    <template slot="opt">
      <div>
        <el-button size="small" type="primary" icon="el-icon-plus" @click = "create">发布商品</el-button>
        <el-button size="small"  >导出报表</el-button>
        <el-button size="small"  >查看已生成报表</el-button>
      </div>
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
        shopName: null,
        merchandiseName: null,
        minSellNum: null,
        maxSellNum: null,
        minPrice: null,
        maxPrice: null,
        category: null
      };
    },
    methods: {
      create() {
        this.$router.push({
          name: 'merchandise-create',
          params: {
            projectId: this.$requestInput('projectId')
          }
        });
      }
    }
  }
</script>
