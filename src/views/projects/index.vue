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
				<div class="card" v-for="(project , index) in projects" :key="index" v-on:click="pathTo(item)">
					<p class="project-name">{{ project.name }}</p>
					<img :src="project.logo" alt="" class="project-logo"/>
					<div class="card-opt">
						<el-button size="mini" type="text" >修改</el-button>
						<el-button size="mini" type="text" >删除</el-button>
					</div>
				</div>
			</div>
			<div class="card-footer" v-if="totalNum">
				<p>共{{ totalNum }}条，每页48条</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Projects',
		data(){
			return {
        searchFields: {

        }
			}
		},
		mounted () {

		},
		computed:{

		},
		methods:{
		},
		created(){
		}
	}

</script>
<style scoped>
	.content-box{padding:0}
  .header-search .el-form-item{margin-bottom: 12px;}
	.header-search {padding-top:10px;overflow: hidden;border-bottom: 16px solid #eee;}
	.header-search .el-form-item__content{line-height: '';}
	.project-cards{clear: both;padding:20px}
	.project-cards .card .card-opt{position: relative;top: 42px;height: 12px;float: right;}
	.card-footer{float:right;padding:20px}
	.card-footer p{font-size: 12px;line-height: 16px;}
	.project-cards .card{position:relative;display:inline-block;margin-right:10px;width: 260px;height: 120px;padding: 0 20px;margin-bottom: 20px;border-radius: 2px;border: 1px solid #e5e5e5;border-top: 3px solid #ff6e6e;background: #fff;cursor: pointer;color: #999;}
	.project-cards .card p{height: 22px;line-height: 22px;font-size: 12px;}
	.project-cards .card .project-logo{border: 1px solid #ff6e6e;color: #ff6e6e;position: absolute;top: 10px;right: 10px;border-radius: 2px;width:64px;height: 64px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;line-height: 12px;padding: 3px;font-size: 12px;}
	.project-cards .card p.project-name{margin-top: 18px;font-size: 14px;height: 20px;line-height: 20px;padding-bottom: 5px;color: #111;}
</style>
