<template>
  <div class = "create-update-form">
    <el-dialog :visible.sync = "dialogShow" width = "60%" :close-on-click-modal = "false" @close = "close" @open = "open">
      <el-tabs active-name = "first">
        <el-tab-pane :label="config.id ? '修改小城程序配置' : '创建小城程序配置'" name = "first"></el-tab-pane>
      </el-tabs>
      <div class="form-container">
        <el-form :model="config" label-width="180px" ref="mpConfig">
          <el-form-item label="小程序名称：" prop="name">
            <el-input v-model="config['app_name']"></el-input>
          </el-form-item>
          <el-form-item label="小程序APPID：" prop="app_id">
            <el-input v-model="config['app_id']"></el-input>
          </el-form-item>
          <el-form-item label="小程序APPSECRET：" prop="app_secret">
            <el-input v-model="config['app_secret']"></el-input>
          </el-form-item>
          <el-form-item label="小程序AESKEY：" prop="aes_key">
            <el-input v-model="config['aes_key']"></el-input>
          </el-form-item>
          <el-form-item label="小程序TOKEN：" prop="token">
            <el-input v-model="config['token']"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="close" size="small">取消</el-button>
        <el-button type="primary" v-if="config.id" @click.native="update" :loading="saving" size="small">保存</el-button>
        <el-button type="primary" v-else @click.native="create" :loading="saving" size="small">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'mpConfig',
    props: {
      show: {
        default: false,
        type: Boolean
      }
    },
    watch: {
      show(value) {
        this.dialogShow = value
      }
    },
    data() {
      return {
        config: {
          'id': null,
          'app_id': null,
          'app_name': null,
          'aes_key': null,
          'token': null,
          'app_secret': null
        },
        dialogShow: false,
        saving: false
      };
    },
    methods: {
      create() {
        let config = {
          type: 'MINI_PROGRAM'
        }
      },
      update() {

      },
      close() {
        this.$emit('close');
      },
      open() {
        this.$emit('open');
      }
    }
  }
</script>
