<template>
  <div class="video-message">
    <div v-if="!video" class="video-opt">
      <el-button plain size="small"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
        <el-button plain size="small" @click.native="addVideoVisible=true;"> 新建视频 <i class="el-icon-edit el-icon--right"></i> </el-button>
    </div>
    <div v-else>
      <span>{{video.name}}</span>
      <el-button icon="el-icon-edit" circle size="mini"></el-button>
        <el-button icon="el-icon-delete" circle size="mini"></el-button>
    </div>
    <!--新增视频-->
    <el-dialog :visible.sync="addVideoVisible" :modal="false" width="64%"  style="position: fixed !important;">
      <el-tabs active-name="first">
        <el-tab-pane label="新建视频" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <el-form :model="video" label-width="80px" ref="videoFileds">
          <el-form-item label="标题" prop="title">
            <el-input  :maxlength="21"></el-input>
            <span class="gray-text">填写与视频内容相关的标题用于视频展示，建议填写清晰、准确、生动的标题</span>
          </el-form-item>
          <el-form-item label="介绍语" prop="description">
            <el-input  :maxlength="120" type="textarea"></el-input>
            <span class="gray-text">填写与视频主题和内容相关的介绍语，建议填写简洁明确、有信息量的内容</span>
          </el-form-item>
          <el-form-item label="视频内容" prop="filePath">
            <el-upload class="upload-video" :headers="headers" name="video" :before-upload="beforeUpload"
            :action="url" :on-remove="remove" :data="extData" :on-success="success" :on-error="error" :file-list="files">
                <el-button size="small">点击上传</el-button>
                <div slot="tip" class="gray-text el-upload__tip">视频不能超过20M，超过20M的视频可至腾讯视频上传后添加，也可通过添加视频详情页链接以及公众号文章链接插入视频，视频时长不少于1秒，不多于10小时，支持大部分主流 视频格式 </div>

            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
          <el-button @click.native="" size="small" type="success">保存</el-button>
          <el-button @click.native="addVideoVisible = false" size="small">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      video: null,
      headers: {},
      files:[],
      url: '',
      extData: {},
      addVideoVisible: false
    };
  },
  methods: {
    beforeUpload() {

    },
    remove() {

    },
    success() {

    },
    error() {

    }
  }
}
</script>
<style scoped>
.video-opt {
  padding: 117px;
}
</style>
