<template>
  <search-header @search = "search">
    <template slot="searchInput">
      <el-form-item prop="code">
        <el-input size="small" v-model="shopCode" placeholder="输入店铺编号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input size="small" v-model="shopName" placeholder="输入店铺名称"></el-input>
      </el-form-item>
      <el-form-item prop="province">
        <el-select size="small" v-model="provinceId">
          <el-option label="请选择省" value="" @click.native="cityId = '';countyId = ''"></el-option>
          <el-option v-for="(province, index) in provinces" :label="province.name" :value="province.id" :key="index"
          @click.native="cityId = '';countyId = ''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="city">
        <el-select size="small" v-model="cityId">
          <el-option label="请选择市" value="" @click.native="countyId = ''"></el-option>
          <el-option v-for="(city, index) in cities" :label="city.name" :value="city.id" :key="index" @click.native="countyId = ''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="area">
        <el-select size="small" v-model="countyId">
          <el-option label="请选择区" value=""></el-option>
          <el-option v-for="(county, index) in counties" :label="county.name" :value="county.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template slot="opt">
      <div>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="create">新增</el-button>
        <el-button size="small"  >导出</el-button>
      </div>
    </template>
  </search-header>
</template>

<script>
  import SearchHeader from '@/components/SearchHeader';
  export default {
    props: {
      value: {
        default: null,
        type: Object
      }
    },
    components: {
      'search-header': SearchHeader
    },
    watch: {
      value(search) {
        if(search) {
          this.shopName = search['name'];
          this.shopCode = search['code'];
          this.provinceId = search['province_id'];
          this.cityId = search['city_id'];
          this.countyId = search['county_id'];
        }
      }
    },
    created() {
      let search = this.value;
      if(search) {
        this.shopName = search['name'];
        this.shopCode = search['code'];
        this.provinceId = search['province_id'];
        this.cityId = search['city_id'];
        this.countyId = search['county_id'];
      }
    },
    data() {
      return {
        shopName: null,
        shopCode: null,
        provinceId: null,
        cityId: null,
        countyId: null
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
    },
    methods: {
      search() {
        let search = this.value;
        if(this.shopCode) {
          search['code'] = this.shopCode;
        } else {
          delete search['code'];
        }

        if(this.shopName) {
          search['name'] = this.shopName;
        }else{
          delete search['name'];
        }

        if(this.provinceId) {
          if(this.cityId) {
            if(this.countyId) {
              search['county_id'] = this.countyId;
            } else {
              search['city_id'] = this.cityId;
              delete search['county_id'];
            }
          }else {
            search['province_id'] = this.provinceId;
            delete search['city_id'];
          }
        } else {
          delete search['province_id'];
        }
        this.$emit('search', search);
      },
      create() {
        let params = {};
        params['projectId'] = this.$requestInput('projectId');
        this.$router.push({name: 'shop-menuForm',  params: params});
      }
    }
  }
</script>
