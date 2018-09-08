<template>
	<div class="content-scroll">
		<div class="content-box">
			<div class="header-search">
				<el-form :inline="true" :model="searchFields" label-width="10px" ref="searchFields" style="float:right;margin-bottom: 0;">
					<el-form-item prop="name">
						<el-input size="mini" v-model="searchFields.name" placeholder="搜索项目"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="primary" >搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="mini" type="success" @click="createProject()">创建项目</el-button>
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
					<el-col :xl="4.8" :lg="4" :md="6" :sm="8" :xs="12" v-for="(project , index) in currentPageProjects" :key="index">
						<div class="card"  v-on:click="pathTo(project)">
							<el-col :span="12"><img :src="project.logo" alt="" class="project-logo"/></el-col>
							<el-col :span="12"><img :src="project.qrCode" alt="" class="project-logo"/></el-col>
							<p class="project-name">名称：{{ project.name }}</p>
							<p class="project-name">创建时间：{{ project.createdAt }}</p>
							<div class="card-opt">
								<el-button size="mini" type="text" >编辑</el-button>
								<el-button size="mini" type="text" >授权</el-button>
								<el-button size="mini" type="text" >删除</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<create-project :show = "creating" @closeDialog = "closeCreateProjectDialog"></create-project>
	</div>
</template>
<script>
	import GetProjectsCommand from '../../commands/GetProjectsCommand';
	import CreateProject from '../../components/CreateProject';
	export default {
		name: 'Projects',
		components:{
			'create-project': CreateProject
		},
		data(){
			return {
				searchFields: {
					name:''
				},
				creating: false
			};
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
			pathTo(item) {
				this.$router.push({name: 'project-detial',  query: {projectId: item.id}});
			},
			createProject() {
				this.creating = true;
			},
			closeCreateProjectDialog() {
				this.creating = false;
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
	.project-cards .card .card-opt{position: absolute;bottom: -10px;right: 10px;}
	.card-footer{float:right;padding:20px}
	.card-footer p{font-size: 12px;line-height: 16px;}
	.project-cards .card{position:relative;display:inline-block;margin-right:10px;width: 100%;height: auto;padding: 10px 10px 80px;margin-bottom: 20px;border-radius: 2px;border: 1px solid #e5e5e5;background: #fff;cursor: pointer;color: #999;}
	.project-cards .card p{height: 22px;line-height: 22px;font-size: 12px;}
	.project-cards .card div{margin-bottom: 20px;}
	.project-cards .card div:first-child{padding-left:0 !important}
	.project-cards .card div:nth-child(2){padding-right:0 !important}
	.project-cards .card .project-logo{color: #ff6e6e;display: block;
    margin: 0 auto;border-radius: 2px;width:100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;line-height: 12px;padding: 3px;font-size: 12px;}
	.project-cards .card p.project-name{margin-top: 15px;clear: both;font-size: 14px;height: 20px;line-height: 20px;padding-bottom: 5px;color: #111;}
</style>
