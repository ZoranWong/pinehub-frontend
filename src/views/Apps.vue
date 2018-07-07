<template>
	<div class="content-scroll" style="overflow-y: hidden;">
		<div class="content-box">
			<div class="headSearch">
				<el-form :inline="true" :model="filters" label-width="10px" ref="selectFileds" style="float:right;margin-bottom: 0;">
					<el-form-item prop="name">
						<el-input size="mini" v-model="filters.name" placeholder="搜索店铺"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" @click="">搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="success" @click="getUpdate();logoUrl=''">创建店铺</el-button>
					</el-form-item>
				</el-form>
				<el-form label-width="10px" style="float:left;margin-bottom: 0;">
					<el-form-item>
						选择应用
					</el-form-item>
				</el-form>
			</div>
			<div class="cardContent">
				<div class="card" v-for="(item , index) in selectData" :key="index" v-on:click="pathTo(item)">
					<p class="cardName">{{item.name}}</p>
					<img :src="item.logo" alt="" class="cardLabel"/>
					<div class="operatCard">
						<el-button size="mini" type="text" @click.stop="getUpdate(true,item.id)">修改</el-button>
						<el-button size="mini" type="text" @click.stop="delData(item.id)">删除</el-button>
					</div>
				</div>
			</div>
			<div class="cardFooter" v-if="totalNum">
				<p>共{{totalNum}}条，每页48条</p>
			</div>
			<!--创建店铺界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="50%" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="saveType ? '修改应用' : '创建应用'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="120px" :rules="formRules" ref="formFileds">
						<el-form-item label="应用名称：" prop="name">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
						<!--图片上传-->
						<el-form-item label="logo上传：" prop="merchantpic">
							<div v-if="logoUrl" style="padding:2px;width:155px;height:155px;border:1px dashed #ddd">
								<img :src="logoUrl" alt="" style="width:148px;"/>
							</div>
							<el-upload class="upload-demo" name="merchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/app/logo/cloud?token='+tokens" :data="exData" :on-success="handleSuccess" :on-remove="handleRemove" :on-error="handleError" :beforeUpload="beforeUpload" :show-file-list="false">
								<el-button size="small" type="primary" v-if="logoUrl">重新上传</el-button>
								<el-button size="small" type="primary" v-else>点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传png文件,且大小不超过2MB的正方形图片</div>
							</el-upload>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">保存</el-button>
				</div>
			</el-dialog>
			<!--<div class="dialogQrcide" v-show="qrcodeVisible">
				<div id="qrcode"></div>
			</div>	-->
		</div>
	</div>
</template>

<script>
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
			pathTo(data){
				sessionStorage.setItem('appId', data.id);
				sessionStorage.setItem('appInfo', JSON.stringify(data));
				this.$router.push({ path: '/index' });
			},
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
				this.selectData= list;
				this.totalNum=this.meta.total
			}
		},
		created(){
			this.getList(this.fliters)
			this.tokens= TokenService.getToken();
			this.useAppId=false;
		}
	}

</script>

<style scoped>
	.content-box{padding:0}
    .headSearch .el-form-item{margin-bottom: 12px;}
	.headSearch {padding-top:10px;overflow: hidden;border-bottom: 16px solid #eee;} 
	.headSearch .el-form-item__content{line-height: '';}
	.cardContent{clear: both;padding:20px}
	.cardContent .card .operatCard{position: relative;top: 42px;height: 12px;float: right;}
	.cardFooter{float:right;padding:20px}
	.cardFooter p{font-size: 12px;line-height: 16px;}
	.cardContent .card{position:relative;display:inline-block;margin-right:10px;width: 260px;height: 120px;padding: 0 20px;margin-bottom: 20px;border-radius: 2px;border: 1px solid #e5e5e5;border-top: 3px solid #ff6e6e;background: #fff;cursor: pointer;color: #999;}
	.cardContent .card p{height: 22px;line-height: 22px;font-size: 12px;}
	.cardContent .card .cardLabel{border: 1px solid #ff6e6e;color: #ff6e6e;position: absolute;top: 10px;right: 10px;border-radius: 2px;width:64px;height: 64px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;line-height: 12px;padding: 3px;font-size: 12px;}
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