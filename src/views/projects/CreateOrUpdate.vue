<template>
	<el-dialog :visible.sync="dialogShow" width="45%" :close-on-click-modal="false" @close="close">
		<el-tabs active-name="first">
			<el-tab-pane :label="project.id ? '修改应用' : '创建应用'" name="first"></el-tab-pane>
		</el-tabs>
		<div class="form-container">
			<el-form :model="project" label-width="100px" :rules="rules" ref="fields">
				<el-form-item label="应用名称：" prop="name">
					<el-input v-model="project.name"></el-input>
				</el-form-item>
				<el-form-item label="联系人：" prop="name">
					<el-input v-model="project.contactName"></el-input>
				</el-form-item>
				<el-form-item label="联系电话：" prop="name">
					<el-input v-model="project.contactPhoneNum"></el-input>
				</el-form-item>
				<!--图片上传-->
				<el-form-item label="logo上传：" prop="logo">
					<el-upload
					  action=""
						class="upload-logo"
						name="logo"
						@http-request="uploadRequest"
						:on-success="success"
					 	:on-remove="remove"
						:on-error="error"
						:file-list="files"
						list-type="picture-card"
						:show-file-list="false">
						<img v-if="project.logo" :src="project.logo" class="avatar">
  					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">只能上传png文件,且大小不超过2MB的正方形图片</div>
					</el-upload>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="close" size="small">取消</el-button>
			<el-button type="primary" @click.native="" :loading="saving" size="small">保存</el-button>
		</div>
</el-dialog>
</template>
<script>
	export default {
		name: 'CreateOrUpdate',
		props: {
			value: {
				default: () => {return {};},
				type: Object
			},
			show: {
				default: false,
				type: Boolean
			}
		},
		watch: {
			show(val) {
				this.dialogShow = val;
			},
			value(val) {
				console.log(val);
				if(val) {
					this.project = val;
					this.files= [{
						url: this.project.logo
					}];
				}
			}
		},
		data() {
	    return {
				saving: false,
				dialogShow: this.show,
				project: this.value,
				files: [],
				rules: {}
	    };
		},
		computed:{
		},
		methods: {
			close() {
				this.dialogShow = false;
				this.project = {logo: null};
				this.$emit('close');
			},
			async uploadRequest({file}) {

	    },
	    remove() {
	    },
	    success(material) {

	    },
	    error() {

	    }
		},
		created() {
		}
	}
</script>
<style scoped>
.avatar{
	width: 100%;
	height: auto;
}
</style>
