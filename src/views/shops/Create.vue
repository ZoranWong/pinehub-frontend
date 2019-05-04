<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-tabs active-name="first">
				<el-tab-pane label="创建店铺" name="first"></el-tab-pane>
			</el-tabs>
			<shop-form v-model="shop" ref="shopInfo"></shop-form>
			<div class="dialog-footer">
				<el-button class = "submit-button" type="primary"  size="small" @click="submit">提交</el-button>
			</div>
		</div>
	</div>
</template>
<script>
    import ShopForm from './ShopInfoForm';
    export default {
        name: 'Create',
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
                    this.$command('CREATE_SHOP', this.$requestInput('projectId'), this.shop, this);
                }
            }
        },
        created() {
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
