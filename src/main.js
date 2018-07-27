import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import Vue from 'vue';
import router from "./routes";
import App from './App';
import '../static/css/font-awesome.min.css'
import store from './models';
import config from './config';
import tokenService from './services/TokenService';
import authService from './services/AuthService';
import AdminApiService from './services/AdminApiService';
import exception from './exceptions/Exception'
//import { TMap } from 'TMap'
//Vue.use(TMap)

import VueDND from 'awe-dnd'

Vue.use(VueDND)
//富文本编辑器配置
import VueHtml5Editor from 'vue-html5-editor'
Vue.use(VueHtml5Editor, {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
    // global component name
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // 配置图片模块
    // config image module
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: null,
            headers: {},
            params: {},
            fieldName: {}
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    // 自定义语言
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
})
//Vue.use(VueHtml5Editor, {
//	name: "vue-html5-editor",
//	font: {
//		fontNames: ['Microsoft YaHei','SimSun','SimHei','FangSong','KaiTi','NSimSun','MingLiU','YouYuan','STCaiyun','FZShuTi']
//	},
//  language: "zh-cn",
//  // 自定义语言
//  i18n: {
//      "zh-cn": {
//          "subscript": "下标",
//          "superscript": "上标",
//      }
//  },
//});

Vue.config.productionTip = false;
Vue.mixin({
	data() {
		return config
	},
	methods: {
		exceptionInit(){
			return new exception(this.$message,this.$router);
		},
		auth(publicKey){
			tokenService.publicKey = authService.publicKey = publicKey;
			tokenService.accept = authService.accept = this.API_ACCEPT;
			tokenService.host = authService.host = this.AUTH_SERVER_HOST;
			tokenService.exception = authService.exception = this.exceptionInit();
			authService.tokenService = tokenService;
			return authService;
		},
		adminApi(module = null){
			module = module ? module :  AdminApiService;
			tokenService.accept = module.accept = this.API_ACCEPT;
			tokenService.host = module.host = this.ADMIN_SERVER_HOST;
			tokenService.exception = module.exception = this.exceptionInit();
			module.tokenService = tokenService;
			return module;
		},
		token(){
			return tokenService;
		},
		//查询列表重置
		resetForm(name = 'selectFileds') {
			this.$refs[name].resetFields()
		},
		getInquire(obj){
			let searchStr='';
      let searchFields = '';
			for(var key in obj) {
        if(!!obj[key]) {
          searchStr+=key+':'+obj[key]+';';
          searchFields += key + ';';
        }
      }
      return {'search': encodeURI(searchStr), searchFields: searchFields, 'searchJoin': 'and'};
		},
		//删除
		handleDel(row, para,url = this.deleteUrl, fun= this.getSelectData) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.bLoading = true
					this.post(url, this.paraJson(para) , (data) => {
						this.$message({message: data.msg, type: 'success'})
						console.log(fun)
						fun()
					})
				}).catch(() => {

				})
			},
		//批量删除
		del(para,url = this.deleteUrl, fun = this.getSelectData){
			this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.bLoading = true
					this.post(url, this.paraJson(para) , (data) => {
						this.$message({message: data.msg, type: 'success'})
						fun()
					})
				}).catch(() => {
			})
		},
		handleBatch(para, url, fun, item) {
			if(!this[item]) {
				this.$message({
					message: '请先选择删除项',
					type: 'warning'
				})
				return
			}
			this.$confirm('确认删除吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.post(url, this.paraJson(para), (data) => {
					fun()
					this.$message({
						message: data.msg,
						type: 'success'
					})
				})
			}).catch(() => {

			})
		},
		selsChange: function(sels, item, xId = 'id') {
			this[item] = sels.map(item => item[xId]).toString()
		},
		//下拉框联动
		async linkageChange(val, item, para) {
			if(!val) {
				this[item] = []
				return
			}
			if(para=='city'){
				let cities = await this.adminApi(AdminApiService).Areas.getCities(val);
				this[item]=cities
			}else if(para=='area'){
				let county = await this.adminApi(AdminApiService).Areas.getCounty(val);
				this[item]=county
			}
		},
		//获取省，市，区下拉菜单数据
		async getListData(name = 'provinceData'){
			let countries = await this.adminApi(AdminApiService).Areas.getCountries();
			let provinces = await this.adminApi(AdminApiService).Areas.getProvinces(countries[0].id);
			this[name] = provinces
		},
		//获取远程下拉菜单数据
		async getLists(module,moduleType,name){
			console.log(module)
			console.log(moduleType)
			console.log(name)
			let [list, ] = await this.adminApi(module).moduleType.getLists(this.paginator);
			this[name]=list
		},
		//导出
		handleExport(url = this.exportUrl, filter = this.filters) {
			let para = Object.assign({}, filter);
			this.post(url, this.paraJson(para), () => {
				this.$message({ message: 'success', type: 'success' })
			});
		},
		//图片处理逻辑-下面三个方法所有上传组件通用
		handleSuccess(response, file, fileList) {
			var urlArray =[]
			for(var i in fileList){
				var nameArray = fileList[i].response.split(',');
				var num = nameArray[1].split(':');
				var name = num[0];
				name = num[0].substring(0,num[0].length-1);
				urlArray.push(num[1].substring(1))
			}
			this.formData[name] = urlArray.join(",")
			console.log(this.formData[name])
		},
		handleRemove(file) {
      if(!file) return ;
      //let image_namess = file.response.split(',');
      //let image_names = image_namess[1].split(':');
      let para = { image_name: file.url };
			let nameArray = file.url.split('/');
			let num = nameArray.length - 2;
			let name = nameArray[num];
			this.post('/xwmin/index.php/Bckome/goods/goodsImageDelete.html', this.paraJson(para), () => {
				this.$message({
					message: "删除成功",
					type: 'success'
				});
				var fileArray = this.formData[name].split(',');
				var _url = file.url;
				fileArray = fileArray.filter(item => item != _url)
				this.formData[name] = fileArray.join(',')
			})
		},
		formatImg(str) {
			return str ? str.split(',') : [];
		},
		customerImg(str) {
      var picture = [];
      str = str ? str.split(',') : [];
      if(str.length) {
        for(var i in str) {
          picture.push('http://huilong-xw.oss-cn-hangzhou.aliyuncs.com/customer_eng/'+str[i]);
        }
      }
      return picture;
		},
		handleError() {
			this.$notify.error({
				title: '上传失败',
				message: '图片上传失败'
			});
		},
		//图片预览
		viewImg(str) {
			if(!str) return
			this.$store.commit('setViewImgs', str)
		},
		//表格排序
		sortChange(data, filter = this.filters, fun = this.getSelectData) {
			if(!data.column) return
			filter.orderField = data.column.columnKey
			filter.orderDirection = data.column.order == 'descending' ? 'desc' : 'asc'
			fun()
		},
		//分页查询
		handleCurrentChange(val, filters = this.paginator, fun = this.getList) {
			filters.page = val
			fun(filters)
		},
		//密码强度校验
		validatePsd(rule, value, callback) {
			if(value === '') {
				callback()
				return
			}
//			let regular = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
//			if(!regular.test(value)) {
//				callback(new Error('请输入6位以上，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'))
//			} else {
				callback()
//			}
		},
		//数字是整数验证
		validateDis(rule, value, callback) {
				if(value === '') {
					callback()
					return
				}
				let regular = /[\d]?(\.[\d]{0,2})?/;
				if(!regular.test(value)) {
					callback(new Error('折扣必须大于0并且小于10，且小于2位小数'))
				} else {
					callback()
				}
			},
		//数字是整数验证
		validateInt(rule, value, callback) {
				if(value === '') {
					callback()
					return
				}
				let regular = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
				if(!regular.test(value)) {
					callback(new Error('请输入整数数值'))
				} else {
					callback()
				}
			},
			//数字大于0的整数验证
		validateZero(rule, value, callback) {
				if(value === '') {
					callback()
					return
				}
				let regular = /^([1-9][0-9]*)$/;
				if(!regular.test(value)) {
					callback(new Error('请输入大于0的整数数值'))
				} else {
					callback()
				}
			},
			//数字大于0有两位小数的验证
		validateTwo(rule, value, callback) {
				if(value === '') {
					callback()
					return
				}
				let regular = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if(!regular.test(value)) {
					callback(new Error('请输入最多为两位小数的正数数值'))
				} else {
					callback()
				}
			},
		//手机格式校验
		validateTel(rule, value, callback) {
			if(value === '') {
				callback()
				return
			}
			let regular = /^1[3|4|5|7|8]\d{9}$/;
			if(!regular.test(value)) {
				callback(new Error('请输入正确格式手机号'))
			} else {
				callback()
			}
		},
		//邮箱格式校验
		validateEmail(rule, value, callback) {
			if(value === '') {
				callback()
				return
			}
			let regular = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
			if(!regular.test(value)) {
				callback(new Error('请输入正确格式邮箱'))
			} else {
				callback()
			}
		},
		scroll() {
			this.box = document.querySelector('.content-scroll')
			if(this.box) {
				this.scrollTop = this.box.scrollTop + 20 + 'px'
			}
		},
		adapt() {
			let container = document.querySelectorAll('.form-container');
			if(container.length) {
				for(var i = 0; i < container.length; i++) {
					container[i].style.maxHeight = this.box.offsetHeight - 200 + 'px'
					container[i].scrollTop = 0
				}
			}
		},
		dialogClose() {
			if(!this.box) return
			this.box.style.overflowY = 'auto'
			this.$emit('dialogClose')
		},
		dialogOpen() {
			if(!this.box) return
			this.box.style.overflowY = 'hidden'
			this.$emit('dialogOpen')
		},
		onlyNum(ev, item, type = 1) {
			let value = ev.target.value;
			let o = item.split('.');
			let rex = type == 1 ? /[^\d]/g : type == 2 ? /[^\d.]/g : /[^\d.-]/g;
			this[o[0]][o[1]] = value.replace(rex, '')
		},
		formatTime(value, item) {
			let o = item.split('.')
			this[o[0]][o[1]] = value ? value : ''
		},
		paraJson(para){
			return JSON.stringify(para)
		}
	},
	beforeRouteLeave(to, from, next) {
		this.container = document.querySelector('.form-container')
		if(this.container) {
			this.containerTop = this.container.scrollTop
		}
		this.scroll()
		next()
	},
	activated() {
		if(this.box) {
			let top = parseInt(this.scrollTop.replace(/[^0-9]+/g, ''))
			this.box.scrollTop = top - 20
		}
		if(this.container) {
			this.container.scrollTop = this.containerTop
		}
	}
})
//注册通用性组件
Vue.use(VueAxios, axios);
Vue.use(Vuex);
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
console.log(vm);
