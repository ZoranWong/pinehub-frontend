<template>
	<div class="content-scroll" style="height: 100% !important;">
		<div class="content-box" style="padding:20px 30px;">
      <el-row class="content-top">
				<el-col class="left-mobile" :span="7">
					<div class="menu-box" ref="menu" >
						<h4 class="title">{{menuName}}</h4>
						<div class="mobile" :style = "{height: height + 'px'}">
							<div class="mobile-header">
								<p>{{headerTitle}}</p>
							</div>
							<div class="mobile-content">
							</div>
							<div class="mobile-footer">
								<menu-button-list :lockAxis="'x'" :axis="'x'"
									v-model="menuData.menus"
									:menus = "menuData.menus"
									class="menus-button"
									:transitionDuration="transitionDuration"
									:lockOffset="'5%'"
									@addSubMenu="addSubMenu"
									@addMenu="menuClick"
									@sort-start="sortStart()">
								</menu-button-list>
							</div>
						</div>
					</div>
				</el-col>
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
								<el-form :model="menuData" label-position="left" label-width="120px"  ref="menuAddFileds">
									<el-form-item :label="!editedSubMenu ? '菜单名称' : '子菜单名称'" prop="name">
										<el-input v-model="editedMenu.name" :maxlength="4" v-if="menuType" @blur="synchronizeMenuName()"></el-input>
										<el-input v-model="editedMenu.name" :maxlength="8" v-else @blur="synchronizeMenuName()"></el-input>
										<span class="gray-text" v-if="menuType">字数不超过4个汉字或8个字母</span>
										<span class="gray-text" v-else>字数不超过8个汉字或16个字母</span>
									</el-form-item>
									<el-form-item :label="!editedSubMenu ? '菜单内容' :'子菜单内容'" prop="type">
										<el-radio-group v-model="menuData.type" @change="synchronizeMenuType">
											<el-radio label="click">发送消息</el-radio>
											<el-radio label="view">跳转网页</el-radio>
											<el-radio label="miniprogram">跳转小程序</el-radio>
										 </el-radio-group>
									</el-form-item>

									<message-menu v-if="menuData.type === 'click'"></message-menu>

									<h5-menu v-if="menuData.type === 'view'" @changeH5Path="h5Path" :menu = "editedMenu"></h5-menu>

									<mp-menu v-if="menuData.type === 'miniprogram'" :menu = 'editedMenu' @mpAppIdChange="mpAppIdChange" @h5PathChange="h5PathChange"
									@mpPathChange="mpPathChange"></mp-menu>

								</el-form>
							</div>
						</div>
					</div>
					<div class="right-form-none" v-else>点击左侧菜单进行编辑操作</div>
				</el-col>
			</el-row>
			<el-row class="content-bottom">
				<div class="footer" v-if="edited">
					<el-button @click.native="saveMenu()" size="small" type="success" v-if="releaseId">保存并发布</el-button>
					<el-button @click.native="saveMenu()" size="small" type="success" v-else>保存</el-button>
				</div>
			</el-row>
      <resize-observer @notify="handleResize" />
		</div>
	</div>
</template>
<script>
	/* eslint-disable */
  import MessageMenu from './message/Index';
  import H5Menu from './h5/Index';
  import MPMenu from './mp/Index';
	import { SlickList } from 'vue-slicksort';
	import MenuButtons from './MenuButtons';
	export default {
		name: 'CreateMenu',
    components: {
      'message-menu': MessageMenu,
      'h5-menu': H5Menu,
      'mp-menu': MPMenu,
			'menu-button-list': MenuButtons,
    },
    data(){
      return {
				transitionDuration: 0,
        height: 0,
        editedSubMenu: false,
        edited: false,
        releaseId: null,
        messageType: 'image',
				editedMenu: null,
				editedIndex: null,
				drag: false,
        menuData: {
          type: 'click',
          menus:[
            {
              addButton: true,
              name: '添加菜单'
            }
          ]
        }
      };
    },
    computed: {
      menus() {
        return this.menuData['menus'];
      },
      headerTitle() {
        return '福年来';
      },
      menuName() {
        return  this.menuData['name'];
      },
      menuType() {
        return this.menuData['type'];
      }
    },
    mounted() {
      this.setHeight();
    },
    methods: {
			addSubMenu(sub, index, subIdex) {
				if(this.menuData.menus[index].sub_button[subIdex])
					this.menuData.menus[index].sub_button[subIdex] = sub;
				else
					this.menuData.menus[index].sub_button.unshift(sub);
				this.editedMenu = sub;
			},
			saveMenu(){

			},
			h5Path(path) {
				this.editedMenu['url'] = path;
			},
      menuClick(menu, index) {
				this.editedIndex = index;
				this.editedMenu = menu;
				if(this.menuData.menus.length === 4) {
					return null;
				}
        if(menu.addButton) {
					this.edited = true;
					this.editedMenu = {name: `菜单${index}`, type: 'click', sub_button: [], url: null, appid: null, pagepath: null};
					this.menuData.menus.unshift(this.editedMenu);
				}
      },
			sortStart() {
				console.log(this.$refs);
			},
      setHeight() {
        this.height = this.$refs['menu'].offsetWidth * 667 / 375;
      },
      handleResize() {
        this.setHeight();
      },
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
    },
    created() {
    }
	}
</script>
<style>
.content-box{
  overflow-y:hidden;
}
.menu-box{
  margin: 24px auto;
  width: 74%;
  overflow-y: auto;
}
.left-mobile{
  min-width: 420px !important;
  max-width: 512px !important;
}
.menu-box .title{
  text-align: center;
  padding-top: 3px;
  padding-bottom: 6px;
  color: #5f5f5f;
}
.menu-box .mobile{
  width: 100%;
  border: 1px solid #f0f0f0;
  height: 356px;
  position: relative;
}
.mobile .mobile-header{
  text-align: center;
  padding-top: 10%;
  position: absolute;
  width: 100%;
  height: 11.2%;
  color: #fff;
  background: url(../../../../assets/bg_mobile_head.png) no-repeat;
  background-size: 100%;
}
.mobile .mobile-content{
  position: absolute;
  height: 79%;
  margin-top: 21.2%;
  width: 100%;
}
.mobile .mobile-footer{
  position: absolute;
  width: 100%;
  height: 9%;
  bottom: 0px;
  background:url(../../../../assets/bg_mobile_foot.png) no-repeat;
  background-size: 100%;
  border: 1px solid #dfe6ec;
}
.menus-button{
  padding-left: 13.5%;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: 1px;
}
.menus-button .menu-button {
  border-right: 1px solid #e8e8e8;
  height: 100%;
  overflow: hidden;
}
.menu-button:last{
  border-right: none !important;
}
.menus-button .el-button{
  height: 100%;
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
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
.menu-name {
  margin-top: 16px;
  margin-bottom: 12px;
}
.menu-name button {
  font-size: 16px;
}
.gray-text{
	color: #999;
}
.footer{
	margin: 12px auto !important;
	transform: translate(50%, 50%) !important;
}
</style>
