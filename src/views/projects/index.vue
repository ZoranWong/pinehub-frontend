<template>
	<div class="content-scroll">
		<div class="content-box">
			<div class="header-search">
				<el-form :inline="true" :model="searchFields" label-width="10px" ref="searchFields" style="float:right;margin-bottom: 0;">
					<el-form-item prop="name">
						<el-input size="mini" v-model="searchFields.name" placeholder="搜索项目"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" @click="">搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="success" @click="getUpdate();logoUrl=''">创建项目</el-button>
					</el-form-item>
				</el-form>
				<el-form label-width="10px" style="float:left;margin-bottom: 0;">
					<el-form-item>
						选择项目
					</el-form-item>
				</el-form>
			</div>
			<div class="project-cards">
				<el-row :gutter="20">
				  	<el-col :span="6" v-for="(project , index) in currentPageProjects" :key="index">
				  		<div class="card"  v-on:click="pathTo(item)">
				  			<el-col :span="12" style="margin-bottom: 20px;"><img :src="project.logo" alt="" class="project-logo"/></el-col>
				  			<el-col :span="12"><img :src="project.logo" alt="" class="project-logo"/></el-col>
							<p class="project-name">名称：{{ project.name }}</p>
							<p class="project-name">创建时间：{{ project.updata }}</p>
							<div class="card-opt">
								<el-button size="mini" type="text">编辑</el-button>
								<el-button size="mini" type="text">授权</el-button>
								<el-button size="mini" type="text">删除</el-button>
							</div>
						</div>
				  	</el-col>
				</el-row>
			</div>
			<div class="card-footer" v-if="totalNum">
				<p>共{{ totalNum }}条，每页48条</p>
			</div>
		</div>
		<createOrUpdate :formVisible="$store.state.formVisible"></createOrUpdate>
	</div>
</template>

<script>
	import GetProjectsCommand from '../../commands/GetProjectsCommand';
	import CreateOrUpdate from './CreateOrUpdate.vue';
	export default {
		name: 'Projects',
		components: {
			'createOrUpdate': CreateOrUpdate
		},
		data(){
			return {
		        searchFields: {
					name:''
		        }
			}
		},
		mounted () {
			
		},
		computed:{
			totalNum() {
				return this.$store.state.projects.totalNum;
			},
			currentPageProjects(){
				return this.$store.getters['projects/currentPage'];
			}
		},
		methods:{
			pathTo(data){
//				sessionStorage.setItem('appId', data.id);
//				sessionStorage.setItem('appInfo', JSON.stringify(data));
				this.$router.push({ path: '/main' });
			},
			async getUpdate(type, id, para,fun) {
				this.$store.state.projects.formVisible = true
//				let result = await this.$nextTick();
//				if( result ) {
//				    this.$refs.formFileds.resetFields();
//			    	if(type) {
//						this.saveType = 1
//						if(this.exData) {
//							this.exData.affairId = id
//						}
//						let list = await this.adminApi(MainService).detailData(id);
//						this.formData=Object.assign(this.formData, list)
//						this.logoUrl=this.formData.logo
//					} else {
//						this.saveType = 0
//						if(this.exData) {
//							this.exData.affairId = ''
//						}
//						delete this.formData.id
//						if(fun) {
//							fun()
//						}
//					}
//				}
			}
		},
		created(){
			this.$command(GetProjectsCommand.commandName(), 1, this.searchFields);
		}
	}
</script>
<style scoped>
	.content-box{padding:0}
  	.header-search .el-form-item{margin-bottom: 12px;}
	.header-search {padding-top:10px;overflow: hidden;border-bottom: 16px solid #eee;}
	.header-search .el-form-item__content{line-height: '';}
	.project-cards{clear: both;padding:20px}
	.project-cards .card .card-opt{position: absolute;bottom: 10px;right: 10px;}
	.card-footer{float:right;padding:20px}
	.card-footer p{font-size: 12px;line-height: 16px;}
	.project-cards .card{position:relative;display:inline-block;margin-right:10px;width: 100%;height: auto;padding: 10px 0px 80px;margin-bottom: 20px;border-radius: 2px;border: 1px solid #e5e5e5;border-top: 3px solid #ff6e6e;background: #fff;cursor: pointer;color: #999;}
	.project-cards .card p{height: 22px;line-height: 22px;font-size: 12px;}
	.project-cards .card .project-logo{border: 1px solid #ff6e6e;color: #ff6e6e;display: block;
    margin: 0 auto;border-radius: 2px;width:104px;height: 104px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;line-height: 12px;padding: 3px;font-size: 12px;}
	.project-cards .card p.project-name{margin-top: 15px;margin-left: 10%;clear: both;font-size: 14px;height: 20px;line-height: 20px;padding-bottom: 5px;color: #111;}
</style>
