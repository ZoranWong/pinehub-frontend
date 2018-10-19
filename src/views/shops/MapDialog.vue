<template>
  <el-dialog :visible.sync="mapShow"  width="80%" @close="close" :modal="false" style="position: fixed !important;">
  	<el-row :gutter="20" class="map-search-tips clearfix">
  		<el-col :span="11" class="map-search">
  			<div class="search-label">
  				请输入搜索内容：
  			</div>
  			<div class="search-input">
  				<el-form  :inline="true" ref="address">
  					<el-form-item  class="fl">
  						<el-input type="text" class = "address-search-input"
              name="searchAddress"
              placeholder="输入如“合肥，青松集团”"
              v-model="address"></el-input>
  					</el-form-item>
  					<el-form-item class="fl">
  						<el-button class="search-btn" type="primary" size="small" @click="addressSearch()">搜 索</el-button>
  					</el-form-item>
  				</el-form>
  			</div>
  		</el-col>
  		<el-col :span="13" class="map-result">
  			<div class="result-title">
  				坐标获取结果：
  			</div>
  			<div class="result-map-view">
  				<el-form :model="position" :inline="true" ref="position">
  					<el-form-item class="fr">
  						<el-button class="position-btn" type="primary" size="small" @click="submit">确 定</el-button>
  					</el-form-item>
  					<el-form-item style="width:35%">
  						<el-input type="text" name="mapLng" placeholder="经度" v-model="position.lng"></el-input>
  					</el-form-item>
  					<el-form-item style="width:35%">
  						<el-input type="text" name="mapLat" placeholder="纬度" v-model="position.lat"></el-input>
  					</el-form-item>
  				</el-form>
  			</div>
  		</el-col>
  	</el-row>
    <t-map v-model = "position" :address="searchAddress"></t-map>
  	<div slot="footer" class="dialog-footer">
  		<el-button @click.native="mapShow = false" size="small">返回</el-button>
  	</div>
  </el-dialog>
</template>
<script>
import Map from './Map';
export default {
  name: "ShopMapDialog",
  props: {
    show: {
      default: false,
      type: Boolean
    },
    value: {
      default: null,
      type: Object
    }
  },
  watch: {
    show(v) {
      this.mapShow = v;
    },
    value(position) {
      if(position) {
        this.position = position;
      }
    }
  },
  components: {
    't-map': Map
  },
  data() {
    return {
      mapShow: false,
      position: {
        lat: 31.866942,
        lng: 117.282699
      },
      address: null,
      searchAddress: null
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addressSearch() {
      this.searchAddress = this.address
    },
    submit() {
      this.$emit('input', this.position);
      this.close();
    }
  }
}
</script>
<style scoped>
.address-search-input{
  width:103%;
  margin-right:15px
}
</style>
