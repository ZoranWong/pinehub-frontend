<template>
  <div class="news-message">
    <div v-if = "!news" class="news-opt">
      <el-button plain size="small" @click.native="newsVisible=true;"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
        <!-- <el-button plain size="small" > 自建图文 <i class="el-icon-edit el-icon--right"></i> </el-button>
        <el-button plain size="small" > 分享图文 <i class="el-icon-share el-icon--right"></i> </el-button> -->
    </div>
    <div v-else>
      <el-card :body-style="{ padding: '0px',display:'inline-block' }">
        <div style="padding: 10px;">
          <time class="time">{{ news.updatedAt }}</time>
        </div>
        <img src="" style="width:148px" class="image">
        <div style="padding: 10px;"><span></span></div>
      </el-card>
      <el-button icon="el-icon-edit" circle size="mini"></el-button>
      <el-button icon="el-icon-delete" circle size="mini"></el-button>
    </div>
    <!--选择-->
    <el-dialog :visible.sync="newsVisible" title="选择素材" width="64%" :modal="false" style="position: fixed !important;">
      <div class="form-container">
        <el-form :inline="true"  label-width="10px" ref="imgTextFileds">
          <el-form-item prop="title">
            <el-input size="small"  placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button size="small" type="success" >新建</el-button>
          </el-form-item>
        </el-form>
        <div class="news-content">
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="newsSubmit()" size="small" type="success">确定</el-button>
          <el-button @click.native="newsVisible = false;" size="small">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      news: null,
      newsVisible: false
    };
  },
  methods: {
    newsSubmit() {

    }
  }
}
</script>
<style scoped>
.news-opt {
  padding: 117px;
}
.dialog-footer{
  text-align: center;
  margin-top:50px;
}
</style>
