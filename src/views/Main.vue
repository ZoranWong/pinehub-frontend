<template>
	<div class="content-scroll" style="overflow-y: hidden;">
		<div class="content-box">
			
			<el-col :span="24" class="toolbar">
				<el-form v-loading="fLoading" label-width="180px">
					<el-form-item label="应用名称：">
						<span v-text="detailData.name"></span>
					</el-form-item>
					<el-form-item label="应用编号：">
						<span v-text="detailData.app_id"></span>
					</el-form-item>
					<el-form-item label="主体信息：">
						<span v-text="detailData.app_secret"></span>
					</el-form-item>
					<el-form-item label="店铺认证：">
						<span v-if="detailData.mode=='editor'">编辑者模式</span>
						<span v-if="detailData.mode=='developer'">开发者模式</span>
					</el-form-item>
					<el-form-item label="主营类目：">
						<span v-if="detailData.type=='wechat_mini_program'">小程序</span>
						<span v-if="detailData.type=='wechat_official_account'">公众号</span>
						<span v-if="detailData.type=='wechat_open_platform'">微信三方应用</span>
					</el-form-item>
					<el-form-item label="创建日期：" v-if='detailData.mode=="developer"'>
						<span v-text="detailData.token"></span>
					</el-form-item>
					<el-form-item label="有效期至：" v-if='detailData.mode=="developer"'>
						<span v-text="detailData.aes_key"></span>
					</el-form-item>
					<el-form-item label="店铺logo：">
						<img :src="detailData.logo" alt="" style="width:100px"/>
					</el-form-item>
					<el-form-item label="店铺简介：">
						<span v-text="detailData.wechat_bind_app"></span>
					</el-form-item>
					<el-form-item label="店长姓名：">
						<span v-text="detailData.wechat_bind_app"></span>
					</el-form-item>
					<el-form-item label="店长QQ：">
						<span v-text="detailData.wechat_bind_app"></span>
					</el-form-item>
					<el-form-item label="店长手机号：">
						<span v-text="detailData.wechat_bind_app"></span>
					</el-form-item>
				</el-form>
			</el-col>	
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	import QRCode from 'qrcodejs2'
	import MainService from '../services/MainService';
	import TokenService from '../services/TokenService';
//	import IEcharts from 'vue-echarts-v3'
	import { mapGetters } from 'vuex'
	export default {
		name: 'main',
//		components: {
//			IEcharts
//		},
		data(){
			return {
				headers:{
					Accept: 'application/vnd.pinehub.v0.0.1+json'
				},
				filters: {
					name: ''
				},
				logoUrl:'',
				tokens:'',
				qrcodeVisible:false,
				autofocus:true,
				exData: {
					file_field: 'merchantpic',
					affairId: '',
					needStorage: true
				},
				formData: {
					name: '',
					logo: ''
				},
				formRules:{}
			}
		},
		mounted () {
			
		},
		computed:{
			
		},
		methods:{
			async createSubmit(beforeSave,afterSave) {
				if(beforeSave) {
					beforeSave()
				}
				let self = this;
				let valid = await this.$refs.formFileds.validate();
				if(valid){
					let result = await this.$confirm('确认提交吗？', '提示', {})
					if(result) {
						if(this.saveType){
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(MainService).updateData(this.formData.id,para);
							console.log(data)
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
							}
						}else{
							this.formData.logo=this.logoUrl
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(MainService).createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
								this.getList(this.filters)
								this.formVisible = false
								window.open(this.WEB_HOST+'/open-platform/auth?app_id='+data.id+'&token='+this.tokens,'_blank')
//								this.qrcodeVisible=true
//								this.qrcode(data.id)
							}
						}
					}
				}
			},
			async getUpdate(type, id, para,fun) {
				this.formVisible = true
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.formFileds.resetFields();
			    	if(type) {
						this.saveType = 1
						if(this.exData) {
							this.exData.affairId = id
						}
						let list = await this.adminApi(MainService).detailData(id);
						this.formData=Object.assign(this.formData, list)
						this.logoUrl=this.formData.logo
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
				}
			},
			handleSuccess(response, file, fileList) {
				if(response.status_code){
					this.$message({ message: '图片类型或规格错误', type: 'warning' })
				}else{
					this.logoUrl=response.data.src
				}
			},
			handleRemove(file, fileList) {
				if(!file) return
				
			},
			//图片上传组件 before-upload 所对应的方法 可限制图片的格式大小数量等
			beforeUpload(file) {
				const isJPG = file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传logo图片只能是 PNG格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传logo图片大小不能超过 2MB!');
		        }
        		return isJPG && isLt2M;
			},
			qrcode (id) {
			    let qrcode = new QRCode('qrcode', {
			        width: 300,
			        height: 300, 
			        text: this.WEB_HOST+'/open-platform/auth?app_id='+id+'&token='+this.token // 二维码内容
			        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
			        // background: '#f0f'
			        // foreground: '#ff0'
			      })
			      console.log(qrcode)
			},
			 async delData(id){
		    	let result = await this.$confirm('确认删除该应用吗？', '提示', {})
				if(result) {
		    		let list = await this.adminApi(MainService).deleteData(id);
		    		if(list) {
						this.$message({message:"删除成功",type: 'success'})
					}
		    		this.getList(this.filters)
		    	}
		    },
			async getList(fliters, search){
				let [list, meta] = await this.adminApi(MainService).getLists(fliters, search);
				this.meta = meta;
				this.detailData= list[0];
				this.totalNum=this.meta.total
			}
		},
		created(){
			this.getList(this.fliters)
			this.tokens= TokenService.getToken();
			this.useAppId=true
		}
	}

</script>

<style scoped>
	.headSearch {padding-top:10px;overflow: hidden;} 
	.headSearch .el-form-item__content{line-height: '';}
	.cardContent{clear: both;}
	.cardContent .card:hover >.operatCard{visibility:visible;}
	.cardContent .card .operatCard{visibility:hidden;height: 12px;}
	.cardFooter{float:right;}
	.cardFooter p{font-size: 12px;line-height: 16px;}
	.cardContent .card{position:relative;display:inline-block;margin-right:10px;width: 260px;height: 120px;padding: 0 20px;margin-bottom: 20px;border-radius: 2px;border: 1px solid #e5e5e5;border-top: 3px solid #ff6e6e;background: #fff;cursor: pointer;color: #999;}
	.cardContent .card p{height: 22px;line-height: 22px;font-size: 12px;}
	.cardContent .card .cardLabel{border: 1px solid #ff6e6e;color: #ff6e6e;position: absolute;top: 10px;right: 10px;border-radius: 2px;width:40px;height: 40px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;line-height: 12px;padding: 3px;font-size: 12px;}	
	.cardContent .card p.cardName{margin-top: 18px;font-size: 14px;height: 20px;line-height: 20px;padding-bottom: 5px;color: #111;}
	
	
	.boxItem { margin-top:15px; }
	.box { background:#fff; box-shadow:0 0 7px #ccc; border-radius:5px; }
	.box .hd { padding:20px 10px; line-height:30px; border-bottom:#ddd 1px solid; overflow: hidden;}
	.box .hd span { color:#000; font-weight:bold;font-size:25px;float:right}
	
	.box .hd .el-button { margin-top:2px; }
	.box .bd { padding:10px; }
	.czxx dl { float:left; width:48%; height:130px; margin:1%; padding:15px; border-radius:5px; color:#fff; }
	.czxx dl:nth-of-type(1) { background:#2CCEFF; }
	.czxx dl:nth-of-type(2) { background:#FFC562; }
	.czxx dl:nth-of-type(3) { background:#54D7BF; }
	.czxx dl:nth-of-type(4) { background:#FF7295; }
	.czxx dd { margin-top:20px; text-align:center; font-size:18px; }
	.czxx dd span { font-size:36px; }

	.jrgj dl { display:inline-block;font-size:25px; width:100%; height:80px; margin:10px 0; box-shadow: 0 0 7px 0 rgba(191,215,224,0.50); border-radius:5px; overflow:hidden; text-align:center; }
	.jrgj dt { background:#D4ECFF; line-height:30px; }
	.jrgj dd { line-height:50px; font-size:18px; }
	.jrgj .hd span{ font-size:15px;font-weight: normal; }

	.charging dl { box-shadow:0 0 7px rgba(191,215,224,0.50); border-radius:5px; overflow:hidden; }
	.charging dt { padding:0 15px; background:#54D7BF; line-height:60px; color:#fff; font-size:20px; }
	.charging dd { padding:15px; line-height:40px; font-size:16px; }
	.charging dd p { display:block; padding:15px 2px 0; border-bottom:#ddd 1px solid; }
	
	.zxgj .bd { min-height:330px; max-height:330px; overflow:hidden; }
	.zxgj ul { position:relative; }
	.zxgj ul:before { position:absolute; left:150px; display:block; content:''; width:2px; height:100%; background:#3E4547; }

	.stakeUsage .el-button.on { background:#54D7BF; border-color:#54D7BF; color:#fff; }

</style>
<style>
	.dialogQrcide{position: absolute;top:0;left:0;background: rgba(0,0,0,0.7);width: 100%;height: 100%;}
	#qrcode img{margin:0 auto;display: inline-block;margin-top: 200px;}
	.zxgj li { position:relative; height:40px; line-height:40px; overflow:hidden; }
	.zxgj li:after { position:absolute; left:147px; top:17px; display:block; content:''; width:8px; height:8px; border-radius:8px; background:#3E4547; }
	.zxgj li em { display:inline-block; width:140px; text-align:right; margin-right:20px;  }
</style>