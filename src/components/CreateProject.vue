<template>
  <!--创建店铺界面-->
	<el-dialog :visible.sync="visible" @close="close" @open="open" :modal="true"  width="36%" :close-on-click-modal="false"  title="创建项目" center>
		<div class="form-container">
			<el-form :model="formData" v-loading="loading" label-width="120px" :rules="rules" ref="createProject">
        <!--图片上传-->
				<el-form-item label="项目logo：" prop="projectLogo">
					<div v-if="formData.logo" style="padding:2px;width:155px;height:155px;border:1px dashed #ddd">
						<img :src="formData.logo" alt="" style="width:148px;"/>
					</div>
					<el-upload class="upload-logo avatar-uploader" name="project_logo" :headers="headers" :action="uploadUrl" :data="extData" :on-success="success"
          :on-remove="remove" :on-error="error" :beforeUpload="beforeUpload"  :show-file-list="false">
            <img v-if="formData.logo" :src="formData.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">只能上传png文件,且大小不超过2MB的正方形图片</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="应用名称：" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
        <el-form-item label="联系人：" prop="contactName">
					<el-input v-model="formData.contact_name"></el-input>
				</el-form-item>
        <el-form-item label="联系人电话：" prop="contactPhoneNum">
					<el-input v-model="formData.contact_phone_num"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="formVisible = false" size="small">取消</el-button>
			<el-button type="primary" @click.native="createProject()" :loading="saving" size="small">保存</el-button>
		</div>
	</el-dialog>
</template>
<script>
import _ from 'underscore';
export default {
  props: {
    show:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { max: 16, message: '最大长度为16', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入项目联系人', trigger: 'blur' },
          { max: 16, message: '最大长度为16', trigger: 'blur' }
        ],
        contactPhoneNum: [
          { required: true, message: '请输入项目联系人电话', trigger: 'blur' },
          { max: 16, message: '最大长度为12', trigger: 'blur' }
        ],
        projectLogo:[
          { required: true, message: '请输入项目联系人电话', trigger: 'blur' }
        ]
      },
      loading: false,
      saving: false,
      formData: {
        name: null,
        logo: null,
        contact_name: null,
        contact_phone_num: null
      },
      extData: {

      },
      headers: {}
    };
  },
  computed: {
    uploadUrl() {
      return '';
    }
  },
  watch:{
    show(newV) {
      this.visible = newV;
    }
  },
  created(){
    this.getHeaders();
  },
  methods:{
    async getHeaders() {
      let headers = this.env.http.headers;
      let token = await this.token.getToken();
      this.headers =  _.extend(headers, {
        Authorization: `Bearer ${token}`
      });
    },
    open() {
      console.log('reset form');
    },
    close() {
      this.$emit('closeDialog', false);
      this.$refs['createProject'].resetFields();
    },
    remove() {

    },
    success() {

    },
    error() {

    },
    beforeUpload() {

    },
    upload() {

    },
    async createProject() {

    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
   }
</style>
<style scoped>
  .upload-logo{
    display: flex;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload__tip {
    font-size: 12px;
    color: #f52e57;
    margin-top: 54px;
    width: 220px;
    margin-left: 12px;
    line-height: 24px;
  }
</style>
