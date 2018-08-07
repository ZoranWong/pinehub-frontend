<template>
	<div class="content-scroll">
		<div class="content-box">
			<el-dialog :visible.sync="detailVisible" @close="$dialogClose" @open="$dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="$store.state.common.scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="店铺信息" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="$store.state.common.fLoading" label-width="120px">
						<el-form-item label="店铺编号：">
							<span v-text="detailData.number"></span>
						</el-form-item>
						<el-form-item label="店铺地址：">
							<span v-text="detailData.address"></span>
						</el-form-item>
						<el-form-item label="店铺车主：">
							<span v-text="detailData.manager.user_name"></span>
						</el-form-item>
						<el-form-item label="联系电话：">
							<span v-text="detailData.manager.mobile"></span>
						</el-form-item>
					</el-form>
				</div>
				<el-tabs active-name="first">
					<el-tab-pane label="店铺订单：(78单)" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="$store.state.common.fLoading" label-width="120px">
						<el-form-item label="" label-width="10px" >
							<el-table :data="detailData.orderData" highlight-current-row v-loading="$store.state.common.tLoading">
								<el-table-column prop="sIndex" label="序号" width="60"></el-table-column>
								<el-table-column prop="name" label="编号" min-width="80"></el-table-column>
								<el-table-column prop="phone" label="车主" min-width="100"></el-table-column>
								<el-table-column prop="integral" label="地理位置" min-width="150"></el-table-column>
								<el-table-column prop="num" label="订单数" min-width="60"></el-table-column>
								<el-table-column prop="money" label="销售金额" min-width="100"></el-table-column>
								<el-table-column prop="time" label="联系方式" min-width="150"></el-table-column>
							</el-table>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="detailVisible = false" size="small">返回</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
export default {
		name: 'DingCarDetailComponent',
		props: [
		    'detailVisible'
		],
		data() {
		    return {
		    	detailData: {
					country:{ name: '' },
					province: { name: '' },
					city: { name: '' },
					county: { name: '' },
					manager: {
						mobile: '',
						user_name: '',
						nickname: '',
						realname: ''
					}
				}
		    }
		},
		computed:{
		    username() {
		    	if(this.detailVisible)
				console.log(this.detailVisible)
		    }
		},
		methods: {
		  	
		},
		created() {
			console.log(this.detailVisible)
		}
	}
</script>

<style scoped>

</style>