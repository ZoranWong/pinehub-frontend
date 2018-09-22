<template>
  <el-col class = "right-form" :span="14">
    <div class="right-form" v-if="edited">
      <div class="form-container">
        <div class="menu-name">
          <el-button type="text" size="small">{{ editedMenu.name }}</el-button>
          <el-button type="text" size="small" v-if="!editedSubMenu">删除菜单</el-button>
          <el-button type="text" size="small" v-else>删除子菜单</el-button>
        </div>
        <div class="menu-form">
          <p v-if="editedSubMenu">已添加子菜单，仅可设置菜单名称。</p>
          <el-form :model="editedMenu" label-position="left" label-width="120px"  ref="menuAddFileds">
            <el-form-item :label="!editedSubMenu ? '菜单名称' : '子菜单名称'" prop="name">
              <el-input v-model="editedMenu.name" :maxlength="4" v-if="menuType" @blur="synchronizeMenuName()"></el-input>
              <el-input v-model="editedMenu.name" :maxlength="8" v-else @blur="synchronizeMenuName()"></el-input>
              <span class="gray-text" v-if="menuType">字数不超过4个汉字或8个字母</span>
              <span class="gray-text" v-else>字数不超过8个汉字或16个字母</span>
            </el-form-item>
            <el-form-item :label="!editedSubMenu ? '菜单内容' :'子菜单内容'" prop="type">
              <el-radio-group v-model="editedMenu.type" @change="synchronizeMenuType">
                <el-radio label="click">发送消息</el-radio>
                <el-radio label="view">跳转网页</el-radio>
                <el-radio label="miniprogram">跳转小程序</el-radio>
               </el-radio-group>
            </el-form-item>

            <message-menu v-if="editedMenu.type === 'click'"></message-menu>

            <h5-menu v-if="editedMenu.type === 'view'" @changeH5Path="h5PathChange" :menu = "editedMenu"></h5-menu>

            <mp-menu v-if="editedMenu.type === 'miniprogram'" :menu = 'editedMenu' @mpAppIdChange="mpAppIdChange" @h5PathChange="h5PathChange"
            @mpPathChange="mpPathChange"></mp-menu>

          </el-form>
        </div>
      </div>
    </div>
    <div class="right-form-none" v-else>点击左侧菜单进行编辑操作</div>
  </el-col>
</template>
<script>
	/* eslint-disable */
  import MessageMenu from './message/Index';
  import H5Menu from './h5/Index';
  import MPMenu from './mp/Index';
	export default {
		name: 'Right',
    props: {
      edited: {
        default: false,
        type: Boolean
      },
      editedMenu: {
        default: null,
        type: Object
      },
      editedSubMenu: {
        default: false,
        type: Boolean
      }
    },
    components: {
      'message-menu': MessageMenu,
      'h5-menu': H5Menu,
      'mp-menu': MPMenu
    },
    data(){
      return {
      };
    },
    methods: {
      async synchronizeMenuName() {

      },
      async synchronizeMenuType(type) {
				this.editedMenu.type = type;
      },
			mpAppIdChange(appId) {
				this.editedMenu['appid'] = appId;
			},
			h5PathChange( path ) {
				this.editedMenu['url'] = path;
			},
			mpPathChange(path) {
				this.editedMenu['pagepath'] = path;
			}
    }
	}
</script>
<style>
.right-form-none{
  text-align: center;
  margin-right:20px;
  height: 609px;
  padding:8px 20px;
  line-height: 609px;
}
.right-form .form-container {
  padding: 0 !important;
}
.right-form .form-container .menu-name{
  border-bottom: 1px solid #dfe6ec;
  overflow: hidden;
}
.right-form .form-container .menu-name button:last-child{
  float: right
}
.right-form .menu-form p{
  margin: 10px 0;
}
</style>
