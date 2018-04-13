import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import Vue from 'vue';
import router from "./routes";
import App from './App';
import '../static/css/font-awesome.min.css'
Vue.config.productionTip = false;
Vue.mixin({
	data() {
		return {
			root: '',
			selectData: [],
			curPage: 1, //1列表页 2新增编辑页 3详情页
			saveType: 0, //保存类型 0新增 1编辑
			eformType: 0, //内嵌套弹框保存类型 0新增 1编辑
			totalNum: 0,
			tLoading: false, //表格加载
			fLoading: false, //表单加载
			bLoading: false, //按钮加载
			sels: [], //列表选中列
			formVisible: false, //新增编辑界面是否显示
			detailVisible: false, //详情界面是否显示
			advanced: false, //是否显示高级查询
			detailData: {},
			box: '',
			container: '',
			containerTop: '',
			scrollTop: '20px',
			codeUrl: '/admin/system/sysDict/findAllChildDictForSelect.do', //编码字典接口
			provinceData: [],
			cityData: [],
			areaData: [],
			cxCityData: [],
			cxAreaData: []
		}
	},
	methods: {
		//vue-resource
		post(url, para, callback, errorback) {
			this.$http.post(this.root + url, para, {
				emulateJSON: true
			}).then((res) => {
				if(res.data.requestCode == 0) {
					callback(res.data)
				} else if(res.data.requestCode == -1) {
					this.$router.push({
						path: '/login'
					})
					this.$message({
						message: res.data.msg,
						type: 'warning'
					})
				} else if(!res.data.requestCode){
					if(callback) {
						callback(res.data)
					}
				}else if(res.data.requestCode == 2){
						this.$message({
							message: '暂无数据',
							type: 'success'
						})
						if(callback) {
							callback(res.data)
						}
				}else if(res.data.requestCode == 4){
//						this.$message({
//							message: '暂无数据',
//							type: 'success'
//						})
						if(callback) {
							callback(res.data)
						}
				}else{
					this.$message({
						message: res.data.msg,
						type: 'warning'
					})
					if(errorback) {
						errorback(res.data)
					}
				}
				this.bLoading = false
				this.tLoading = false
				this.fLoading = false
			}, (res) => {
				this.$message.error('请求失败，请稍后再试')
				this.bLoading = false
				this.tLoading = false
				this.fLoading = false
			})
		},
		//获取列表数据
		getSelectData(filters = this.filters, selectUrl = this.selectUrl, selectData = 'selectData', totalNum = 'totalNum', fun,beforeFun) {
			this.tLoading = true
			if(beforeFun){
				beforeFun(filters)
			}
			let para = filters ? Object.assign({}, filters) : {};
			this.post(selectUrl, this.paraJson(para), (data) => {
				if(data.data){
					if(totalNum) {
						this[totalNum] = parseInt(data.data.total)
					}
					this[selectData] = data.data.list
					for(var i in data.data.list) {
						this[selectData][i].sIndex = (data.data.pageNum - 1) * 10 + parseInt(i) + 1
					}
				}else{
					this[totalNum] =0
					this[selectData]=[]
				}
				if(fun) {
					fun(data.data.list)
				}
			})
		},
		getSelectData1(filters = this.filters, selectUrl = this.selectUrl, selectData = 'selectData', totalNum = 'totalNum', fun) {
				let para = filters ? Object.assign({}, filters) : {};
				this.post(selectUrl, this.paraJson(para), (data) => {
					if(totalNum) {
						this[totalNum] = parseInt(data.data.total)
					}
					this[selectData] = data.data.list
					for(var i in data.data.list) {
						this[selectData][i].sIndex =  parseInt(i) +1
					}
					if(fun) {
						fun(data.data.list)
					}
				})
			},
		//查询列表重置
		resetForm(name = 'selectFileds', fun = this.getSelectData) {
			this.$refs[name].resetFields()
			if(fun) {
				fun()
			}
		},
		//显示详情界面
		handleDetail(row, fun, para) {
			this.scroll()
			this.detailVisible = true
			this.$nextTick(() => {
				this.adapt()
				this.fLoading = true
				this.post(this.formUrl, this.paraJson(para) || {
					id: row.id
				}, (data) => {
					this.detailData = Object.assign({}, data.data.list)
					if(fun) {
						fun(data.data.list)
					}
				})
			})
		},
		//显示新增编辑界面
		handleForm(type, row, para,fun) {
			this.scroll()
			this.formVisible = true
			this.$nextTick(() => {
				this.adapt()
				this.$refs.formFileds.resetFields()
				if(type) {
					this.saveType = 1
					if(this.exData) {
						this.exData.affairId = row.id
					}
					this.fLoading = true
					this.post(this.formUrl, this.paraJson(para), (data) => {
						Utils.mergeData(this.formData, data.data.list)
						if(fun) {
							fun(data.data.list)
						}
					})
				} else {
					this.saveType = 0
					if(this.exData) {
						this.exData.affairId = ''
					}
					delete this.formData.id
					if(fun) {
						fun()
					}
				}
			})
		},
		handleForm1(type, row, para,fun) {
			this.scroll()
			this.eformVisible = true
			this.$nextTick(() => {
				this.adapt()
				this.$refs.eformFileds.resetFields()
				if(type) {
					this.eformType = 1
					this.fLoading = true
					this.post(this.ygAddSelectUrl, {}, (data) => {
						this.eSelectData=data.data.list
						if(fun) {
							fun(data.data.list)
						}
					})
				} else {
					this.eformType = 0
					if(this.exData) {
						this.exData.affairId = ''
					}
					delete this.eformData.id
					if(fun) {
						fun()
					}
				}
			})
		},
		//新增编辑保存
		formSubmit(beforeSave, afterSave) {
			if(beforeSave) {
				beforeSave()
			}
			this.$refs.formFileds.validate((valid) => {
				if(valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.formData);
						this.bLoading = true
						this.post(this.saveUrl.length == 2 ? this.saveUrl[this.saveType] : this.saveUrl[0], this.paraJson(para), (data) => {
							this.$message({
								message: data.msg,
								type: 'success'
							})
							if(afterSave) {
								afterSave(data.data)
							}
							this.getSelectData()
							this.formVisible = false
						})
					}).catch(() => {

					})
				}
			})
		},
		eformSubmit(beforeSave, afterSave,type) {
				if(beforeSave) {
					beforeSave()
				}
				this.$refs.eformFileds.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({},this.staffsId);
							this.bLoading = true
							if(type){
								this.post(this.dmygSaveUrl[0], this.paraJson(para), (data) => {
									this.$message({ message: data.msg, type: 'success'})
									if(afterSave) {
										afterSave(data.data.list)
									}
									this.getSelectData(this.employeefilters,this.dmygSelectUrl,this.employeeData,'totalNum1',this.getInformation)
									this.eformVisible = false
								})
							}else{
								this.post(this.ygSaveUrl[0], this.paraJson(para), (data) => {
									this.$message({message: data.msg,type: 'success'})
									if(afterSave) {
										afterSave(data.data.list)
									}
									this.getSelectData(this.employeefilters,this.ygSelectUrl,this.employeeData,'totalNum1',this.getInformation)
									this.eformVisible = false
								})
							}
						}).catch(() => {
	
						})
					}
				})
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
		selsChange: function(sels, item, xId = id) {
			this[item] = sels.map(item => item[xId]).toString()
		},
		//下拉框联动
		linkageChange(val, item, url = this.codeUrl, para) {
			if(!val) {
				this[item] = []
				return
			}
			this.post(url, this.paraJson(para) || this.paraJson({
				id: val
			}), (data) => {
				this[item] = data.data.list
				if(data.data==''){
					this[item] = []
				}
			})
		},
		//获取远程下拉菜单数据
		getListData(url = this.codeUrl, name = 'provinceData', para = {
			id: '101001'
		}) {
			this.post(url, para ? para : {}, (data) => {
				this[name] = data.data.list
			})
		},
		//导出
		handleExport(url = this.exportUrl, filter = this.filters) {
			let para = Object.assign({}, filter);
			this.post(url, this.paraJson(para), (data) => {
				this.$message({ message: 'success', type: 'success' })
			})
//			delete para.pageNum
//			delete para.pagesize
//			let str = '';
//			for(var i in para) {
//				let v = para[i];
//				str += i + '=' + v + '&'
//			}
//			window.open(this.root + url + '?' + str)
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
		handleRemove(file, fileList) {
			if(!file) return
			console.log(file)
			console.log(fileList)
			var image_namess= file.response.split(',')
			var image_names= image_namess[1].split(':')
			let para = {
				image_name: file.url
			};
			let nameArray = file.url.split('/');
			let num = nameArray.length - 2;
			let name = nameArray[num];
			this.post('/xwmin/index.php/Bckome/goods/goodsImageDelete.html', this.paraJson(para), (data) => {
				console.log(data.data)
				this.$message({
					message: "删除成功",
					type: 'success'
				})
				var fileArray = this.formData[name].split(',');
				var _url = file.url;
				fileArray = fileArray.filter(item => item != _url)
				this.formData[name] = fileArray.join(',')
			})
		},
		formatImg(str) {
			return str ? str.split(',') : []
		},
		customerImg(str) {
			var picture=[]
			 str=str ? str.split(',') : []
			 if(str.length){
			 	for(var i in str){
			 		picture.push('http://huilong-xw.oss-cn-hangzhou.aliyuncs.com/customer_eng/'+str[i])
			 	}
			 }
			 return picture
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
		handleCurrentChange(val, filters = this.filters, fun = this.getSelectData) {
			filters.pageNum = val
			fun()
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
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
