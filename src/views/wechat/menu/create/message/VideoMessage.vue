<template>
  <div class="video-message">
    <div v-if="!video.mediaId" class="video-opt">
      <el-button plain size="small" @click="selecting=true;"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
      <el-button plain size="small" @click.native="uploading=true;"> 新建视频 <i class="el-icon-edit el-icon--right"></i> </el-button>
    </div>
    <div v-else>
      <el-row>
        <h5>视频标题：{{video.title}}</h5>
        <span>视频简介：{{video.introduction}}</span>
      </el-row>
      <el-button icon="el-icon-delete" circle size="mini"  @click="deleteMaterial()"></el-button>
    </div>
    <!--新增视频-->
    <el-dialog :visible.sync="uploading" :modal="false" width="64%"  style="position: fixed !important;">
      <el-tabs active-name="first">
        <el-tab-pane label="新建视频" name="first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <el-form :model="uploadData" label-width="80px" ref="videoFileds">
          <el-form-item label="标题" prop="title">
            <el-input v-model="uploadData.title" :maxlength="21"></el-input>
            <span class="gray-text">填写与视频内容相关的标题用于视频展示，建议填写清晰、准确、生动的标题</span>
          </el-form-item>
          <el-form-item label="介绍语" prop="description">
            <el-input  v-model="uploadData.introduction" :maxlength="120" type="textarea"></el-input>
            <span class="gray-text">填写与视频主题和内容相关的介绍语，建议填写简洁明确、有信息量的内容</span>
          </el-form-item>
          <el-form-item label="视频内容" prop="filePath">
            <el-upload  class="upload-video" name="video" :http-request="uploadRequest" :show-file-list="false"
            action="" :on-remove="remove"  :on-success="success" :on-error="error" >
                <el-button size="small">{{uploadData.mediaId ? '上传新视频' : '点击上传'}}</el-button>
                <div slot="tip" class="gray-text el-upload__tip">视频不能超过20M，超过20M的视频可至腾讯视频上传后添加，也可通过添加视频详情页链接以及公众号文章链接插入视频，视频时长不少于1秒，不多于10小时，支持大部分主流 视频格式 </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
          <el-button @click.native="" size="small" type="success" @click="createMaterial">保存</el-button>
          <el-button @click.native="uploading = false" size="small">取消</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="selecting" title="选择视频" width="60%" :modal="false" style="position: fixed !important;">
      <div class="form-container" style="position: relative;">
        <div class="left-content">
          <div class="up-content">
            <el-table :data="materials" highlight-current-row v-loading="!materials" v-if="materials && materials.length" @current-change="changeMaterial">
              <el-table-column prop="mediaId" label="ID" min-width="180" header-align="center"></el-table-column>
              <el-table-column prop="title" label="名称" min-width="100" header-align="center"></el-table-column>
              <el-table-column prop="introduction" label="名称" min-width="100" header-align="center"></el-table-column>
              </el-table-column>
            </el-table>
            <paginator :totalNum = "totalNum" :service="service"
            :event="event" :totalPage = "totalPage" :search="query"
            :currentPage="currentPage" :command="command"
            :limit= "12" style="display: flex;"></paginator>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Paginator from '@/components/Paginator';
import MaterialTranformer from '@/models/transformers/Material';
import DataListCommand from '@/commands/DataListCommand';
export default {
  props: {
    value: {
      default: function() {return {}},
      type: Object
    }
  },
  data() {
    return {
      service: 'http.materials',
      event: 'material.video/setList',
      video: {},
      query: {
        page: 0,
        projectId: 0,
        type: 'video'
      },
      uploading: false,
      selecting: false,
      menu: this.value,
      projectId: null,
      uploadData: {mediaId: null, title: null, introduction: null}
    };
  },
  created() {
    this.query.projectId = this.projectId = this.$router.currentRoute.query.projectId;
    let page = this.$router.currentRoute.query.page;
    this.query.page = parseInt(!page ? 1 : page);
  },
  watch: {
    value(value) {
      this.menu = value;
    }
  },
  components: {
    'paginator': Paginator
  },
  computed: {
    totalNum() {
      return this.$store.state['material.video'].totalNum;
    },
    totalPage() {
      return this.$store.state['material.video'].totalPage;
    },
    currentPage() {
      return this.$store.state['material.video'].currentPage ? this.$store.state['material.video'].currentPage : 15;
    },
    materials() {
      console.log(this.$store.getters['material.video/currentPage']);
      return this.$store.getters['material.video/currentPage'];
    },
    command() {
      return DataListCommand.commandName();
    }
  },
  methods: {
    changeMaterial(material) {
      this.menu.editedMenu['media_id'] = material.mediaId;
      this.menu.editedMenu['url'] = null;
      this.video = material;
      this.selecting = false;
      this.$emit('input', this.menu);
    },
    createMaterial() {
      this.menu.editedMenu['media_id'] = this.uploadData.mediaId;
      this.menu.editedMenu['url'] = null;
      this.video = this.uploadData;
      this.uploadData = {mediaId: null, title: null, introduction: null};
      this.uploading = false;
      this.$emit('input', this.menu);
    },
    async uploadRequest({file}) {
      let result = await this.http.materials.uploadMaterial(this.projectId, 'video', 'video', file, this.uploadData.title, this.uploadData.introduction);
      let material =  new MaterialTranformer(result);
      this.success(material);
      return material;
    },
    deleteMaterial() {
      this.menu.editedMenu['media_id'] = null;
      this.video = {};
    },
    remove() {
      this.uploadData = { mediaId: null, title: null, introduction: null};
    },
    success(material) {
      this.menu.editedMenu['media_id'] = material.mediaId;
      this.uploadData.mediaId = material.mediaId;
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
