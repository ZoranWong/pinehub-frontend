<template>
	<div class = "create-update-form">
		<el-dialog :visible.sync = "dialogShow" width = "45%" :close-on-click-modal = "false" @close = "close" @open = "open">
			<el-tabs active-name = "first">
				<el-tab-pane :label="project.id ? '修改应用' : '创建应用'" name = "first"></el-tab-pane>
			</el-tabs>
			<div class="form-container">
				<el-form :model="newData" label-width="100px" ref="projectForm">
					<el-form-item label="应用名称：" prop="name" :rules = "[
						{ required: true, message: '请输入项目名称', trigger: 'blur' },
						{ min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
					]">
						<el-input v-model="newData.name"></el-input>
					</el-form-item>
					<el-form-item label="联系人：" prop="contactName" :rules = "[
						{ required: true, message: '请输入项目联系人姓名', trigger: 'blur'},
						{ min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
					]">
						<el-input v-model="newData.contactName"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop="contactPhoneNum" :rules = "[
						{ required: true, message: '请输入项目联系人手机', trigger: 'blur'},
						{ pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '手机号码格式错误', trigger: 'blur'},
						{ min: 11, max: 11, message: '长度11数字', trigger: 'blur'}
					]">
						<el-input v-model="newData.contactPhoneNum"></el-input>
					</el-form-item>
					<!--图片上传-->
					<el-form-item label="logo上传：" prop="logo" :rules="[{ required: true, message: '请上传图片', trigger: 'blur'}]">
						<el-upload
								action=""
								class="upload-logo"
								name="logo"
								:http-request="uploadRequest"
								:on-success="success"
								:on-remove="remove"
								:on-error="error"
								list-type="picture-card"
								:show-file-list="false">
							<img v-if="newData.logo" :src="newData.logo" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">只能上传png文件,且大小不超过2MB的正方形图片</div>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="close" size="small">取消</el-button>
				<el-button type="primary" v-if="project.id" @click.native="update" :loading="saving" size="small">保存</el-button>
				<el-button type="primary" v-else @click.native="save" :loading="saving" size="small">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import _ from 'underscore';
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
				if(val) {
					this.project = val;
				}
			}
		},
		data() {
			return {
				saving: false,
				dialogShow: this.show,
				project: this.value,
				newData: {}
			};
		},
		computed:{
		},
		methods: {
			async update () {
				let result = await this.$refs['projectForm'].validate();

				if(result) {
					this.saving = true;
					//上传服务
					this.$command('UPDATE_PROJECT', this.project.id, this.newData.name, this.newData.logo, this.newData.contactName, this.newData.contactPhoneNum, this);
				}
			},
			async save () {
				let result = await this.$refs['projectForm'].validate();

				if(result) {
					this.saving = true;
					//上传服务
					this.$command('CREATE_PROJECT', this.newData.name, this.newData.logo, this.newData.contactName, this.newData.contactPhoneNum, this);
				}
			},
			open() {
				this.$set(this, 'newData', _.clone(this.project));
			},
			close() {
				this.dialogShow = false;
				this.saving = false;
				//this.project = {logo: null};
				this.$refs['projectForm'].resetFields();
				this.$emit('close');
			},
			async uploadRequest({file}) {
				let result = await this.$command('UPLOAD_FILE', file, 'logo', 'projectLogoUpload');
				if(result) {
					console.log(result);
					this.newData.logo = result.src;
				}
			},
			remove() {
			},
			success() {

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
	height: 100%;
}
</style>
