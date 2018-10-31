<template>
	<div class="content-scroll">
		<div class="content-box">
    	<el-tabs active-name="first">
      	<el-tab-pane label="修改店铺" name="first"></el-tab-pane>
    	</el-tabs>
			<shop-form v-model="shop" ref="shopInfo"></shop-form>
      <div slot="footer" class="dialog-footer">
        <el-button class = "submit-button" type="primary"  size="small" @click="submit">提交</el-button>
      </div>
		</div>
	</div>
</template>
<script>
import ShopForm from './ShopInfoForm';
export default {
		name: 'Edit',
		components: {
			'shop-form': ShopForm
		},
		data() {
	    return {
				shop: null,
				mapShow: false
	    };
		},
		methods: {
	  	async submit(){
				let result = await this.$refs['shopInfo'].$refs['shopForm'].validate();
				if(!result) {
					console.log('validate fail');
				} else {
					let shop = {
						name: this.shop['name'],
						manager_name: this.shop['manager_name'],
						code: this.shop['code'],
						address: this.shop['address'],
						lat: this.shop['lat'],
						lng: this.shop['lng'],
						description: this.shop['description'],
						manager_mobile: this.shop['manager_mobile'],
						city_id: this.shop['city_id'],
						country_id: this.shop['country_id'],
						province_id: this.shop['province_id'],
						county_id: this.shop['county_id'],
					};
					this.$command('UPDATE_SHOP', this.$requestInput('projectId'), this.$requestInput('shopId'), shop);
				}
	  	},
			async getShop() {
				let shop = await this.http.shops.show(this.$requestInput('projectId'), this.$requestInput('shopId'));
				this.shop = shop;
			}
		},
		created() {
			this.getShop();
		}
	}
</script>
<style scoped>
.submit-button{
	margin: auto !important;
	width: 64px;
	display: block;
}
</style>
