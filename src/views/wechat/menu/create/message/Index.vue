<template>
  <el-form-item label="" prop="key" class="el-form-layout">
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="图片" name="image">
        <image-message v-model="menu"></image-message>
      </el-tab-pane>
      <el-tab-pane label="图文" name="news">
        <news-message></news-message>
      </el-tab-pane>
      <el-tab-pane label="视频" name="video">
        <video-message></video-message>
      </el-tab-pane>
      <el-tab-pane label="音频" name="voice">
        <voice-message></voice-message>
      </el-tab-pane>
    </el-tabs>
  </el-form-item>
</template>
<script>
import ImageMessage from './ImageMessage';
import NewsMessage from './NewsMessage';
import VideoMessage from './VideoMessage';
import VoiceMessage from './VoiceMessage';
export default{
  props:{
    value:{
      default: function() {return {}},
      type: Object
    }
  },
  data(){
    return {
      active: 'image',
      menu: this.value
    };
  },
  watch: {
    value: function(val) {
      this.menu = val;
    }
  },
  components: {
    'image-message': ImageMessage,
    'news-message': NewsMessage,
    'video-message': VideoMessage,
    'voice-message': VoiceMessage
  }
}
</script>
