<template>
	<el-row class="container">
		<div class="layout-content">
			<layout-nav :toogleMenu="toogleMenu" :show="showLeftSide"></layout-nav>
			<div :class="['right-content',{ 'toogle-content' : toogleMenu }, {'left-content': showLeftSide}]">
				<c-header @toogle="toogle" :selected = "showLeftSide" :toogleMenu = "toogleMenu"></c-header>
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="header-bottom"  v-if="showLeftSide">
							<el-col :span="16" class="breadcrumb-container">
								<el-breadcrumb separator="/" class="breadcrumb-inner">
									<el-breadcrumb-item v-for="(item, index) in routes" :key="index">
										{{ item.tag }}
									</el-breadcrumb-item>
								</el-breadcrumb>
							</el-col>
							<el-col :span="8" style="text-align:right"><router-link style = "margin-right:26px;" :to="{name: 'projects'}">返回首页</router-link></el-col>
						</el-col>
						<el-col :span="24" class="content-wrapper">
							<router-view class = "page-content" :style="pageContentStyle" :key="activeDate"></router-view>
						</el-col>
					</div>
				</section>
			</div>
		</div>
		<reset-password></reset-password>
	</el-row>
</template>
<script>
    /* eslint-disable */
    import NavComponent from '@/components/NavComponent';
    import HeaderComponent from '@/components/HeaderComponent';
    import ResetPasswordComponent from '@/components/ResetPasswordComponent';
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                toogleMenu: false,
                pageContentStyle: {
                    height: document.documentElement.clientHeight - 115 + 'px',
                    width: '100%'
                },
            };
        },
        components: {
            'layout-nav': NavComponent,
            'reset-password': ResetPasswordComponent,
            'c-header': HeaderComponent
        },
        computed: {
            routes() {
                let route = this.routeMap[this.$route.name];
                console.log('route', this.$route.name, this.$route, route);
                return [route.parent, route];
            },
            showLeftSide() {
                return !this.routeMap[this.$router.currentRoute.name]['menuHide'];
            },
            contentWight(){
                return "width:"+(document.documentElement.clientWidth - 180) + 'px'
            },
            pageContentHeight() {
                return document.documentElement.clientHeight - 158;
            },
            includedComponents() {
                return 'Index';
            },
            activeDate() {
                console.log(this.$store.state.common.activeDate);
                return this.$store.state.common.activeDate;
            }
        },
        watch: {
        },
        methods: {
            toogle(){
                this.toogleMenu=!this.toogleMenu
            }
        },
        created() {

        },
        mounted() {
        }
    }
</script>
<style scoped>
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		overflow: hidden;
	}

	.container .toogle-content {
		left: 40px !important;
	}
	.right-content{
		position: absolute;
		right: 0px;
		left: 0px;
		top: 0px;
		bottom: 0px;
		overflow: hidden;
	}

	.container .loayout-content .logo {
		height: 60px;
		width:100%;
		background: #00284d;
		padding-top: 8px;
	}
	.container .loayout-content .logo img{
		display: inline-block; margin:0px 10%;width: 80%;line-height: 60px;
	}
	.right-content .header-bottom, .right-content .el-breadcrumb{
		font-size: 14px;
		height: 40px;
		font-color: #606266;
		line-height: 40px !important;
		background: #fff;
		padding-left:10px;
		border-bottom: 1px solid #e9e9e9;
	}
	.left-content{
		left: 120px !important;
	}
</style>
<style>
	.content-box{
		margin:16px 14px 0;
		background: #fff;
		border-radius: 6px;
	}
	.content-wrapper{
		height: inherit;
	}
</style>
