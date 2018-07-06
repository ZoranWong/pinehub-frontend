<template>
	<el-row class="container">
		<div class="header">
			<div class="left_nav" :class="{ 'toogleNav': toogleMenu}" v-if="shops">
				<div class="logo" >
					<img src="../../src/assets/logo_scale.png" v-if="toogleMenu" style="width:70%;margin-top:5px"/>
					<img src="../../src/assets/logo_white.svg" v-else/>
				</div>
				<aside>
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="toogleMenu">
						<template v-for="(item,index) in menuList">
							<el-submenu v-if="item.menu_name != '首页'" :index="index+''">
								<template slot="title">
									<el-tooltip effect="dark" :disabled="!toogleMenu" :content="item.menu_name" placement="right">
										<div class="tipbox">
											<img :src="formatSrc('menu_' + item.id)" style="width:50%"/>
										</div>
									</el-tooltip>
									<span>{{item.menu_name}}</span>
								</template>
								<el-menu-item @click="getRouter(child.href)" :class="{ 'is-active': checkActive('/' + child.href) }" v-for="(child,index) in item.childMenus" :index="'/' + child.href" :key="index">
									<el-tooltip :disabled="!toogleMenu" effect="dark" :content="child.menu_name" placement="right">
										<div class="tipbox">
											<!--<img :src="formatSrc('menu_' + child.id)" />-->
										</div>
									</el-tooltip>
									<span>{{child.menu_name}}</span>
								</el-menu-item>
							</el-submenu>
						</template>
					</el-menu>
				</aside>
			</div>
			<div :class="['right_content',{ 'toogleContent' : toogleMenu }]" :style="shops?'left: 180px;':'left: 0px;'">
				<div class="contentHeader">
					<div :class="['menu-top',{ 'txt-center' : !toogleMenu }]" v-if="shops">
						<div @click.active="toogleMenu = !toogleMenu;" class="tipbox">
							<img src="../../src/assets/icon_close.png" v-if="toogleMenu"/>
							<img src="../../src/assets/icon_open.png" v-else/>
						</div>
					</div>
					<div class="logos fl" v-else>
						<img src="../../src/assets/f-logo.png"style="width:120px;opacity: 1;margin: 0px 20px;display: inline-block;margin-top: 4px;cursor: pointer;" />
					</div>
					<img @click="logout" src="../../src/assets/icon_switch.png" class="fr"/>
					<el-dropdown trigger="click" class="fr">
						<img class="el-dropdown-link" src="../../src/assets/icon_setting.png"/>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="handleForm()">修改密码</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<img @click="" src="../../src/assets/icon_bell.png" class="fr"/>
					<!--<img @click="" src="../../src/assets/icon_search.png" class="fr"/>-->
					<span class="userinfo-inner">{{sysUserName}}</span>
				</div>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<!--<el-col :span="24" class="tabs-toogle">
							<el-tabs v-model="editableTabsValue" @contextmenu.native.prevent="contextmenu" type="card" @tab-click="toogleTabs" @tab-remove="removeTab">
								<el-tab-pane v-for="(item, index) in editableTabs" :closable="item.title !== '首页'" :key="index" :label="item.title" :name="item.name">
								</el-tab-pane>
							</el-tabs>
						</el-col>-->
						<el-col :span="24" class="breadcrumb-container">
							<!--<img src="" @click="refresh" alt="refresh" width="24" height="24" class="refresh" />-->
							<el-breadcrumb separator="/" class="breadcrumb-inner" v-if="shops">
								<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<keep-alive :include="includedComponents">
								<router-view :style="contentBox"></router-view>
							</keep-alive>
						</el-col>
					</div>
				</section>
			</div>
		</div>
		<el-dialog :visible.sync="formVisible" :close-on-click-modal="false">
			<el-tabs active-name="first">
				<el-tab-pane :label="sysUserName+'-修改密码'" name="first"></el-tab-pane>
			</el-tabs>
			<el-form :model="formData" :rules="formRules" ref="formFileds" label-width="120px">
				<el-form-item label="旧密码" prop="oldPassword">
					<el-input type="password" v-model="formData.oldPassword" :maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPassword">
					<el-input type="password" v-model="formData.newPassword" :maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="doPsd">
					<el-input type="password" v-model="formData.doPsd" :maxlength="20"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="formVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="formSubmit()" size="small">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="viewVisible" @close="dialogClose">
			<el-tabs active-name="first">
				<el-tab-pane label="图片预览" name="first"></el-tab-pane>
			</el-tabs>
			<el-carousel height="450px" :autoplay="false">
				<el-carousel-item v-for="(item,index) in imgList" :key="index">
					<img :src="item" />
				</el-carousel-item>
			</el-carousel>
		</el-dialog>
	</el-row>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				formVisible:false,
				menuListUrl: '/xwmin/index.php/Bckome/index.html',
				saveUrl: ['/admin/system/sysUser/modifyPwd.do'],
				menuList: [
//					{childMenus:[
//						{href:"fxy",id:"0",menu_name:"分析页",parent_id:"0"},
//						{href:"jky",id:"0",menu_name:"监控页",parent_id:"0"}
//					],href:"sy",id:"0",menu_name:"首页数据",parent_id:"0"},
					{childMenus:[
						{href:"gzhlb",id:"0",menu_name:"公众号列表",parent_id:"0"}
					],href:"gzhgl",id:"1",menu_name:"公众号管理",parent_id:"1"},
					{childMenus:[
						{href:"ccgl",id:"0",menu_name:"餐车管理",parent_id:"0"},
						{href:"ddgl",id:"0",menu_name:"订单管理",parent_id:"0"},
						{href:"plgl",id:"0",menu_name:"品类管理",parent_id:"0"}
					],href:"zcc",id:"1",menu_name:"店铺管理",parent_id:"1"},
					{childMenus:[],href:"sc",id:"2",menu_name:"商品管理",parent_id:"2"},
					{childMenus:[
						{href:"yhq",id:"0",menu_name:"优惠券",parent_id:"0"}
					],href:"kqxt",id:"3",menu_name:"卡券管理",parent_id:"3"},
					{childMenus:[
						{href:"hygl",id:"0",menu_name:"会员管理",parent_id:"0"},
						{href:"khgl",id:"0",menu_name:"客户管理",parent_id:"0"},
						{href:"jfgl",id:"0",menu_name:"积分管理",parent_id:"0"},
						{href:"hyk",id:"0",menu_name:"会员卡",parent_id:"0"}
					],href:"yhtj",id:"4",menu_name:"用户统计",parent_id:"4"}
				],
				imgList: [],
				toogleMenu: false,
				viewVisible: false,
				navHeight: {
					height: document.documentElement.clientHeight - 50 + 'px'
				},
				contentBox: {
					height: document.documentElement.clientHeight - 158 + 'px',
					width: '100%'
				},
				formData: {
					oldPassword: '',
					newPassword: '',
					doPsd: ''
				},
				formRules: {
					oldPassword: [{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						},
						{
							validator: this.limitPsd,
							trigger: 'blur'
						}
					],
					newPassword: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							validator: this.limitPsd,
							trigger: 'blur'
						}
					],
					doPsd: [{
							required: true,
							message: '请输入确认密码',
							trigger: 'blur'
						},
						{
							validator: this.confirmPass,
							trigger: 'blur'
						}
					]
				},
				editableTabsValue: '/main',
				editableTabs: [{
					title: '首页',
					name: '/main'
				}],
				includedComponents: 'main'
			}
		},
		computed: {
//			...mapGetters(['viewImgs', 'config']),
//			handleLogo() {
//				return this.config.logo || require('../../src/assets/bg.png')
//			}
			shops(){
				if(this.$route.path){
					return sessionStorage.getItem('shop') || ''
				}
			},
			contentWight(){
				return "width:"+(document.documentElement.clientWidth - 180) + 'px'
			}
		},
		watch: {
//			'$route': 'fetchData',
//			viewImgs(str) {
//				if(!str) return
//				this.viewVisible = true
//				this.imgList = str.split(',')
//			},
			editableTabs(tabs) {
				this.includedComponents = tabs.map(item => item.name.substr(1)).toString()
			}
		},
		methods: {
			contextmenu(name) {
				//				if(this.editableTabs.length < 3) return
				//				this.$confirm('确认关闭其它标签吗？', '提示', {}).then(() => {
				//					let title = name.target.innerText;
				//					this.editableTabs = this.editableTabs.filter(tab => tab.title == title || tab.title == '首页')
				//					let curName = this.editableTabs[1].name;
				//					this.editableTabsValue = curName
				//					this.$router.push(curName)
				//				}).catch(()=>{
				//					
				//				})
			},
			handleForm() {
				this.formVisible = true
				this.$nextTick(() => {
					this.$refs.formFileds.resetFields()
				})
			},
			getRouter(href) {
				if(this.$route.path.substring(1).split('/')[0] == href) return
				this.$router.push('/' + href)
			},
			formSubmit() {
				this.$refs.formFileds.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.formData);
							this.bLoading = true
							this.post(this.saveUrl.length == 2 ? this.saveUrl[this.saveType] : this.saveUrl[0], para, (data) => {
								this.$message({
									message: data.msg,
									type: 'success'
								})
								this.formVisible = false
							})
						}).catch(() => {

						})
					}
				})
			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if(activeName === targetName) {
					tabs.forEach((tab, index) => {
						if(tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.name;
								this.$router.push(activeName)
							}
						}
					})
				}
				this.editableTabsValue = activeName
				this.editableTabs = tabs.filter(tab => tab.name !== targetName)
			},
			checkActive(name) {
				return this.editableTabs.some(item => item.name == name)
			},
			fetchData() {
				var title = this.$route.name
				var name = this.$route.path
				if(name == '/reload') {
					this.$router.go(-1)
					return
				}
				if(name == '/largeScreen/html/index.html') {
					window.open(this.root + '/largeScreen/html/index.html')
					this.$router.go(-1)
				} else {
					let o = this.$route.path.substring(1).split('/');
					this.$store.commit('setOA', o[0])
					if(o.length > 1) {
						title = this.$route.matched[1].name
						name = this.$route.matched[1].path
					}
					this.editableTabsValue = name
					let ar = this.includedComponents.split(',');
					if(this.includedComponents.indexOf(name.substr(1)) == -1) {
						ar.push(name.substr(1))
						this.includedComponents = ar.toString()
					}
					if(!this.editableTabs.some(item => item.name == name)) {
						this.editableTabs.push({
							title: title,
							name: name
						})
					}
				}
			},
			toogleTabs(item) {
				if('/' + this.$route.path.substring(1).split('/')[0] == item.name) return
				this.$router.push(item.name)
			},
			getMenuList(user) {
				let para = {
					parent_id: 0
				};
				para=JSON.stringify(para)
				this.post(this.menuListUrl, para, (data) => {
					this.menuList = data.data.list
					this.formatPermissions(data.data)
				})
			},
			formatPermissions(list) {
				var obj = new Object();
				for(var i = 0; i < list.length; i++) {
					if(list[i].childMenus) {
						if(list[i].name == '首页') {
							obj['main'] = list[i].childMenus
						} else {
							let child = list[i].childMenus;
							for(var m = 0; m < child.length; m++) {
								obj[child[m].href] = child[m].childMenus
							}
						}
					}
				}
				this.$store.commit('setPermissions', obj)
			},
			//退出登录
			async logout() {
			    let self = this;
				await this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				});
				
				let result = await this.auth().logout();
				if(result){
					this.$router.push('/login')
				}
			},
			refresh() {
				let name = this.$route.path;
				let str = this.includedComponents;
				if(name.split('/').length == 3) {
					name = name.split('/')[2]
					let time = new Date();
					this.$store.commit('setRefresh', {
						name: name,
						time: time.getTime()
					})

				} else {
					this.includedComponents = str.split(',').filter(item => item !== name.substr(1)).toString()
					this.$router.push('/reload')
				}
			},
			limitPsd(rule, value, callback) {
				if(value === '') {
					callback()
					return
				}
				let regular = /^[a-zA-Z0-9]+$/;
				if(!regular.test(value)) {
					callback(new Error('只允许数字和字母'))
				} else {
					callback()
				}
			},
			confirmPass(rule, value, callback) {
				if(value === '') {
					callback()
					return
				}
				if(value !== this.formData.newPassword) {
					callback(new Error('两次输入密码不一致'))
				} else {
					callback()
				}
			},
			dialogClose() {
				this.$store.commit('setViewImgs', '')
			},
			formatSrc(name, type = 'png') {
				try {
					return require('../../src/assets/' + name + '.' + type)
				} catch(e) {
//					console.log('缺少' + name + '.' + type)
					return ''
				}
			}
		},
		created() {
			var user = sessionStorage.getItem('user');
			if(user) {
//				user = JSON.parse(user)
				this.sysUserName = user || ''
//				this.getMenuList(user)
			}
		},
		mounted() {
//			this.$store.commit('setLoaded', true)
		}
	}
</script>

<style>
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		overflow: hidden;
		}
	.container .header .left_nav{
		width: 180px;
		height:100vh;
		float:left;
		background: #001529;
		color: rgba(255,255,255,0.65);
	}
	.container .toogleContent {
	    left: 40px !important;
	}
	.container .toogleNav {
	    width: 40px !important;
	}
	.container .header .right_content{
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		
		overflow: hidden;
	}
	.container .header .right_content .contentHeader .menu-top{
		float:left;line-height:60px;padding-left: 5px;cursor: pointer;
	}
	.container .header .right_content .contentHeader img{
		width:26px;opacity: 0.65;margin:17px 5px;display: inline-block;margin-top:10px;cursor:pointer
	}
	.container .header .right_content .contentHeader{
		padding-right:20px;
		padding-top:5px;
		overflow: hidden;
	}
	.container .header .right_content .contentHeader .userinfo-inner{
		 float: right;
    	line-height: 47px;
    	margin-right:10px;
	}
	   
	.container .header .logo {
		height: 60px;
		width:100%;
		background: #00284d;
		padding-top: 8px;
	}
	.container .header .left_nav .el-menu{
		background: #000c17;
		border:none !important
	}
	.container .header .left_nav .el-menu .el-submenu{
		background:#001529 ;
	}
	.container .header .left_nav .el-menu .el-submenu .el-menu-item{
		padding:0;
		min-width: 0px;
		padding-left:10px !important;
		color: rgba(255,255,255,0.65);
	}
	.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;}
	.container .header .left_nav .el-menu .el-submenu .is-active{
		background:#409EFF;
		color:rgba(255,255,255,1);
	}
	.container .header .left_nav .el-menu .el-submenu .el-submenu__title:hover {
    	background: #002243;
		color: rgba(255,255,255,1);
	}
	.container .header .left_nav .el-menu .el-submenu .el-menu-item:focus, .el-menu-item:hover{
		background: #002243;
		color: rgba(255,255,255,1);
	}
	.container .header .left_nav .el-menu .el-submenu div span{
		color: rgba(255,255,255,0.65);
	}
	.container .header .logo img{
		display: inline-block; margin:0px 10%;width: 80%;line-height: 60px;
	}
	.container .header .right_content .contentHeader{
		height:60px;
		border-bottom: 1px solid #e9e9e9;
		background-color: #fff;
	}
	.el-menu--collapse {
	    width: 40px;
	}
	.container .header .right_content .el-breadcrumb {
	    font-size: 14px;
	    line-height: 1;
	    height: 40px;
	    line-height: 40px;
	    background: #fff;
	    padding-left:10px;
	    border-bottom: 1px solid #e9e9e9;
	}
	.container .content-box{
		margin:16px 14px 0;
		background: #fff;
		border-radius: 6px;
	}
	.container .left_nav aside .tipbox {
					width: 40px;
					height: 40px;
					line-height: 38px;
					display: inline-block;
					text-align: center;
					cursor: pointer;
				}
				.el-submenu__title{
					padding:0 !important
				}
				.el-dropdown{
					float:right
				}
</style>