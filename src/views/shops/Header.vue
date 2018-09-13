<template>
  <search-header>
    <template slot="searchInput">
      <el-form-item prop="code">
        <el-input size="small" v-model="shopCode" placeholder="输入店铺编号"></el-input>
      </el-form-item>
      <el-form-item prop="province">
        <el-select size="small" v-model="provinceName">
          <el-option label="请选择省" value="" @click.native="cityName = '';countyName = ''"></el-option>
          <el-option v-for="(province, index) in provinces" :label="province.name" :value="province.id" :key="index"
          @click.native="cityName = '';countyName = ''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="city">
        <el-select size="small" v-model="cityName">
          <el-option label="请选择市" value="" @click.native="countyName = ''"></el-option>
          <el-option v-for="(city, index) in cities" :label="city.name" :value="city.id" :key="index" @click.native="countyName = ''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="area">
        <el-select size="small" v-model="countyName">
          <el-option label="请选择区" value=""></el-option>
          <el-option v-for="(county, index) in counties" :label="county.name" :value="county.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot="opt">
      <div>
        <el-button size="small" type="primary" icon="el-icon-plus" >新增</el-button>
        <el-button size="small"  >导出</el-button>
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
        shopCode: null,
        provinceName: null,
        cityName: null,
        countyName: null
      };
    },
    computed: {
      provinces() {
        return [];
      },
      cities() {
        return [];
      },
      counties() {
        return [];
      }
    }
  }
</script>
