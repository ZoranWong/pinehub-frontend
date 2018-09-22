<template>
  <div class="voice-message">
    <div v-if="!voice" class="voice-opt">
      <el-button plain size="small" > 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
      <el-button plain size="small" @click.native="addVoiceVisible=true;"> 新建语音 <i class="el-icon-edit el-icon--right"></i> </el-button>
    </div>
    <div v-else>
      <span>{{voice.name}}</span>
      <el-button icon="el-icon-edit" circle size="mini"></el-button>
      <el-button icon="el-icon-delete" circle size="mini"></el-button>
    </div>
    <!--新增音频-->
    <el-dialog :visible.sync="addVoiceVisible" :modal="false" width="64%"  style="position: fixed !important;">
      <el-tabs active-name="first">
        <el-tab-pane label="新建语音" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <el-form :model="voice" label-width="80px" ref="voiceFileds">
          <el-form-item label="标题" prop="title">
            <el-input  :maxlength="21"></el-input>
            <span class="gray-text">填写与音频内容相关的标题用于视频展示，建议填写清晰、准确、生动的标题</span>
          </el-form-item>
          <el-form-item label="语音内容" prop="filePath">
            <el-upload class="upload-voice" :headers="headers" name="voice" :before-upload="beforeUpload"
            :action="url" :on-remove="remove" :data="extData" :on-success="success" :on-error="error" :file-list="files">
                <el-button size="small">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">格式支持mp3、wma、wav、amr，文件大小不超过30M，语音时长不超过30分钟</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
          <el-button @click.native="" size="small" type="success">保存</el-button>
          <el-button @click.native="addVoiceVisible = false" size="small">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      voice: null,
      headers: {},
      files:[],
      url: '',
      extData: {},
      addVoiceVisible: false
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
.voice-opt {
  padding: 117px;
}
</style>
