<template>
	<div>
  		<el-dialog :visible.sync="formVisible" @close="$dialogClose" @open="$dialogOpen" :modal="false" :top="$store.state.scrollTop" width="50%" :close-on-click-modal="false">
			<el-tabs active-name="first">
				<el-tab-pane :label="$store.state.saveType ? '修改应用' : '创建应用'" name="first"></el-tab-pane>
			</el-tabs>
			<div class="form-container">
				<el-form :model="formData" v-loading="isLoading" label-width="120px" :rules="formRules" ref="formFileds">
					<el-form-item label="应用名称：" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<!--图片上传-->
					<el-form-item label="logo上传：" prop="merchantpic">
						<div v-if="logoUrl" style="padding:2px;width:155px;height:155px;border:1px dashed #ddd">
							<img :src="logoUrl" alt="" style="width:148px;"/>
						</div>
						<el-upload class="upload-demo" name="merchantpic" @http-request="$command(UpLoadCommand.commandName(), 1)" :headers="headers" :data="exData" :on-success="handleSuccess" :on-remove="handleRemove" :on-error="$uploadFailed" :beforeUpload="beforeUpload" :show-file-list="false">
							<el-button size="small" type="primary" v-if="logoUrl">重新上传</el-button>
							<el-button size="small" type="primary" v-else>点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传png文件,且大小不超过2MB的正方形图片</div>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="formVisible = false" size="small">取消</el-button>
				<el-button type="primary" @click.native="createSubmit()" :loading="isLoading" size="small">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'CreateOrUpdate',
		props:['formVisible'],
		data() {
		    return {
		    	headers:{
					Accept: 'application/vnd.pinehub.v0.0.1+json'
				},
				logoUrl:'',
		    	isLoading: false,
		    	exData: {
					file_field: 'merchantpic',
					affairId: '',
					needStorage: true
				},
				formData: {
					name: '',
					logo: ''
				},
				formRules:{}
		    }
		},
		computed:{
		    username() {
		    	
				console.log(this.formVisible)
		    }
		},
		methods: {
		  	createSubmit(){

		  	},
		  	handleSuccess(response, file, fileList) {
				if(response.status_code){
					this.$message({ message: '图片类型或规格错误', type: 'warning' })
				}else{
					this.logoUrl=response.data.src
				}
			},
			handleRemove(file, fileList) {
				if(!file) return;
			},
			//图片上传组件 before-upload 所对应的方法 可限制图片的格式大小数量等
			beforeUpload(file) {
				const isJPG = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传logo图片只能是 PNG格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传logo图片大小不能超过 2MB!');
		        }
        		return isJPG && isLt2M;
			}
		},
		created() {
			console.log(this.formVisible)
		}
	}
</script>
<style scoped>

</style>
