<template>
  <div class="image-message">
    <div v-if="!image" class="upload-image-opt">
      <el-button plain size="small" @click.native="selecting=true;"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
      <el-upload class="upload-menu-image" name="menuPic" :headers="headers" action="" :on-remove="remove" :data="extData" :on-success="success" :on-error="error" list-type="picture">
        <el-button plain size="small"> 上传图片 <i class="el-icon-edit el-icon--right"></i> </el-button>
      </el-upload>
    </div>
    <div v-else>
      <img :src="image" alt="" style="width:220px"/>
      <el-button icon="el-icon-edit" circle size="mini"></el-button>
      <el-button icon="el-icon-delete" circle size="mini"></el-button>
    </div>
    <!--选择图片-->
    <el-dialog :visible.sync="selecting" title="选择图片" width="80%" :modal="false" style="position: fixed !important;">
      <div class="form-container" style="position: relative;">
        <div class="left-content">
          <div class="up-content">
            <el-menu default-active="2" class="el-menu-vertical">
                <el-menu-item >
                </el-menu-item>
              </el-menu>
          </div>
          <div class="down-content">
            <el-popover placement="bottom" width="280">
              <div style="margin: 0;text-align: center;">
                <el-form  label-width="120px" ref="groupFileds">
                  <el-form-item label="创建分组" prop="group" :rules="{required: true, message: '分组名字为1-6个字符', trigger: 'blur'}">
                    <el-input  :maxlength="6"></el-input>
                  </el-form-item>
                </el-form>
                  <el-button type="primary" size="mini" >确定</el-button>
                  <el-button size="mini" >取消</el-button>
              </div>
              <el-button slot="reference" @click.native="" size="small" type="text">新建分组</el-button>
            </el-popover>
          </div>
        </div>
        <div class="right-content">
          <div class="up-content upload">
            <el-upload class="upload-image" name="uplaodImage" :headers="headers" action="url" :on-remove="remove" :data="extData" :on-success="success"
            :on-error="error" list-type="picture-card">
              <el-button plain size="small">点击上传 <i class="el-icon-edit el-icon--right"></i> </el-button>
              <div slot="tip" class="el-upload__tip">大小不超过5M， 已开启图片水印 </div>
            </el-upload>
          </div>
          <div class="down-content" >
            <div  >
              <div class="active">
                <p></p>
              </div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
          <el-button  size="small" type="success">确定</el-button>
          <el-button  size="small">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: null,
      extData: {},
      headers: {},
      selecting: false
    };
  },
  methods: {
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
.upload-image-opt{
  display: -webkit-box;
  padding: 117px;
}
</style>
