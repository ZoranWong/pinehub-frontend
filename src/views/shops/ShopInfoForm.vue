<template>
  <div class = "form-container shop-info">
    <el-form :model="shop" label-width="120px"  ref="shopForm">
      <el-form-item label="店铺编号：" prop="code"
      :rules="[{ pattern: /^[0-9A-Za-z]{6,16}$/, message: '编号有大小写字母与数组组成，长度6-10', trigger: 'blur' }]">
        <el-input v-model="shop.code" style="width:30%" placeholder="输入已有的编号或者系统默认"></el-input>
      </el-form-item>
      <el-form-item label="店铺名称："
      prop="name"
      :rules="[{ required: true, message: '请填写店铺名称', trigger: 'blur' },
      { min: 2, max: 12, message: '店铺名称长度2-12个字符', trigger: 'blur' }]">
        <el-input v-model="shop.name" style="width:30%" placeholder="输入店铺名称"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址："
       prop="province_id"
        style="display: inline-block;"
        :rules="[{required: true, message: '请选择省份'}]">
        <el-select v-model="shop.province_id" @change="provinceChange">
          <el-option label="请选择省" value="" ></el-option>
          <el-option v-for="(province, index) in provinces" :label="province.name" :value="province.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
      prop="city_id"
      label-width="10px"
      style="display: inline-block;"
      :rules="[{required: true, message: '请选择城市', trigger: 'blur'}]">
        <el-select v-model="shop.city_id" @change="cityChange">
          <el-option label="请选择市" value="" ></el-option>
          <el-option v-for="(city, index) in cities" :label="city.name" :value="city.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
      prop="county_id"
      label-width="10px"
      style="display: inline-block;"
      :rules="[{required: true, message: '请选择区县', trigger: 'blur'}]">
        <el-select v-model="shop.county_id" @change="countyChange">
          <el-option label="请选择区" value=""></el-option>
          <el-option v-for="(county, index) in counties" :label="county.name" :value="county.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺位置：" prop="" label-width="130px">
        <el-form-item
        label="经度" prop="lng"
        label-width="64px"
        style="display:inline-block;"
        :rules="[{required: true, message: '请选择定位', trigger: 'blur'}]">
          <el-input v-model.number="shop.lng" placeholder="请输入经度" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="lat"
        label-width="64px" style="display:inline-block;"
        :rules="[{required: true, message: '请选择定位', trigger: 'blur'}]">
          <el-input v-model.number="shop.lat" placeholder="请输入纬度" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="" label-width="10px" style="display:inline-block;">
          <el-button type="success" size="mini" @click="mapDialogOpen">设置地图坐标</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item label="店铺描述："  prop="description">
        <el-input v-model="shop.description" type="textarea" style="width:80%" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="车主姓名：" prop="manager_name" :rules="[{ required: true, message: '请输入餐主姓名', trigger: 'blur' }]">
        <el-input v-model="shop.manager_name" style="width:30%" placeholder="输入车主姓名"></el-input>
      </el-form-item>
      <el-form-item label="车主电话：" prop="manager_mobile" :rules="[{ required: true, message: '请输入联系方式', trigger: 'blur' },
      {pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/, message: '手机号码非法格式', trigger: 'blur'}]">
        <el-input v-model.number="shop.manager_mobile" style="width:30%" placeholder="输入手机号码">
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>
      <el-form-item label="店铺地址：" prop="address" :rules="[{ required: true, message: '请输入店铺位置', trigger: 'blur'}]">
        <el-input v-model="shop.address"  style="width:80%" ></el-input>
      </el-form-item>
    </el-form>
    <map-dialog :show="mapShow" @close = "mapDialogClose" v-model="position"></map-dialog>
  </div>
</template>
<script>
import ShopMapDialog from './MapDialog';
export default {
  props: {
    value: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  components: {
    'map-dialog': ShopMapDialog
  },
  watch: {
    value: {
      deep: true,
      handler: function(shop) {
        if(shop) {
            this.shop = shop;
            if(this.shop['province_id']) {
              this.$store.dispatch({
                type: 'regions/setCurrentProvince',
                provinceId: this.shop['province_id']
              });
              if(this.cities.length === 0){
                this.$command('LOAD_CITIES', this.shop['province_id']);
              }
            }
            if(this.shop['city_id']) {
              this.$store.dispatch({
                type: 'regions/setCurrentCity',
                cityId: this.shop['city_id']
              });
              if(this.counties.length === 0) {
                this.$command('LOAD_COUNTIES', this.shop['city_id']);
              }
            }
        }
      }
    },
    shop: {
      deep: true,
      handler:function(nv) {
        this.$emit('input', nv);
      }
    },
    position: {
      deep: true,
      handler: function({lat, lng}) {
        this.shop.lat =lat;
        this.shop.lng = lng;
      }
    }
  },
  data() {
    return {
      mapShow: false,
      position: null,
      shop: {
        manager_name: '',
        code: '',
        address: '',
        lat: '',
        lng: '',
        description:'',
        manager_mobile: '',
        city_id: '',
        country_id: '1',
        province_id: '',
        county_id: '',
        content: '',
        name: ''
      }
    };
  },
  computed:{
    provinces() {
      return this.$store.getters['regions/provinces'];
    },
    cities() {
      return this.$store.getters['regions/cities'];
    },
    counties() {
      return this.$store.getters['regions/counties'];
    }
  },
  created() {
      this.$command('LOAD_PROVINCES');
  },
  methods: {
    mapDialogClose() {
      this.mapShow = false;
    },
    mapDialogOpen() {
      this.mapShow = true;
    },
    provinceChange() {
      this.shop['city_id'] = null;
      this.shop['county_id'] = null;
    },
    cityChange() {
      this.shop['county_id'] = null;
    },
    countyChange() {
      this.$store.dispatch({
        type: 'regions/setCurrentCounty',
        cityId: this.shop['county_id']
      });
    }
  }
}
</script>
