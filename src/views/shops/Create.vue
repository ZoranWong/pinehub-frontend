<template>
	<div class="content-scroll">
		<div class="content-box">
    	<el-tabs active-name="first">
      	<el-tab-pane :label="创建店铺" name="first"></el-tab-pane>
    	</el-tabs>
      <div class="form-container">
        <el-form :model="shop" label-width="120px" :rules="formRules" ref="shopForm">
          <el-form-item label="店铺编号：" prop="code">
            <el-input v-model="shop.code" style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址：" prop="province_id" style="display: inline-block;">
            <el-select v-model="shop.province_id">
              <el-option label="请选择省" value="" @click.native="shop.city_id = '';shop.county_id = ''"></el-option>
              <el-option v-for="(province, index) in provinces" :label="province.name" :value="province.id" :key="index"
							@click.native="shop.city_id = '';shop.county_id = ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city_id" label-width="10px" style="display: inline-block;">
            <el-select v-model="shop.city_id">
              <el-option label="请选择市" value="" @click.native="shop.county_id = ''"></el-option>
              <el-option v-for="(city, index) in cities" :label="city.name" :value="city.id" :key="index"
							@click.native="shop.county_id = ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="county_id" label-width="10px" style="display: inline-block;">
            <el-select v-model="shop.county_id">
              <el-option label="请选择区" value=""></el-option>
              <el-option v-for="(county, index) in counties" :label="county.name" :value="county.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺位置：" prop="" label-width="130px">
          </el-form-item>
          <el-form-item label="经度" prop="lng" label-width="130px" style="display:inline-block;">
            <el-input v-model.number="shop.lng" placeholder="请输入经度" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="lat" style="display:inline-block;">
            <el-input v-model.number="shop.lat" placeholder="请输入纬度" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="" label-width="10px" style="display:inline-block;">
            <el-button type="success" size="mini" @click="showMap=true;">设置地图坐标</el-button>
          </el-form-item>
          <el-form-item label="店铺描述："  prop="description">
            <el-input v-model="shop.description" type="textarea" style="width:80%" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="车主姓名：" prop="manager_name">
            <el-input v-model="shop.manager_name" style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="车主电话：" prop="manager_mobile">
            <el-input v-model="shop.manager_mobile" style="width:30%">
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item label="店铺地址：" prop="address">
            <el-input v-model="shop.address" type="textarea" style="width:80%" :rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false" size="small">取消</el-button>
        <el-button type="primary"  size="small">提交</el-button>
      </div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Create',
		data() {
	    return {
	    	showMap: false,
	    	formRules: {
					address: [{ required: true, message: '请输入店铺位置', trigger: 'blur' }],
					manager_name: [{ required: true, message: '请输入餐主姓名', trigger: 'blur' }],
					manager_mobile: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
					lng: [{ required: true, message: '请选择经度', trigger: 'blur' }],
					lat: [{ required: true, message: '请选择纬度', trigger: 'blur' }]
				},
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
					content: ''
				},
	    };
		},
		computed:{
			provinces() {
				return [];
			},
			cities() {
				return [];
			},
			counties() {
				return []
			}
		},
		methods: {
	  	createSubmit(){

	  	},
		},
		created() {
		}
	}
</script>
<style scoped>

</style>
