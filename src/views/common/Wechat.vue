<template>
	<div class="content-box">
		<div class="page-container">
			<el-form v-loading="fLoading" label-width="120px">
				<el-form-item label="公众微信号：">
					<span v-text="detailData.name"></span>
				</el-form-item>
				<el-form-item label="公众号昵称：">
					<span v-text="detailData.name"></span>
				</el-form-item>
				<el-form-item label="微信帐号类型：">
					<span v-text="detailData.name"></span>
				</el-form-item>
				<el-form-item label="授权状态：">
					<span v-text="detailData.name"></span>
				</el-form-item>
			</el-form>
			<div class="qrcodeImg">
				<img src="../assets/wximg.jpeg" alt="" style="width:200px;"/>
				<p>公众号二维码</p>
				<p></p>
			</div>
		</div>
		<div class="page-button">
			<el-button type="success" size="mini" @click="getReply(true, scope.row)">自动回复</el-button>
			<el-button type="success" size="mini" @click="getMenu(true, scope.row)">自定义菜单</el-button>
		</div>
	</div>
</template>
<script>
	
</script>
<style scoped>
	.page-container {
		padding:20px 20px 0;
		position: relative;
		border-bottom: 1px solid #dfe6ec;;
	}
	.page-container .qrcodeImg {
		position: absolute;
		top:10px;
		right:20px;
		text-align: center;
	}
	.page-button{
		padding:20px;
	}
</style>