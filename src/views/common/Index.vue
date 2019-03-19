<template>
	<div class="content-scroll" style="overflow-y: hidden;">
		<div class="content-box">
			<el-row class="el-row--flex" style="margin: 12px;padding-top: 8px;">
				<el-col :span="10" style="max-width: 128px;">
					<img height="auto" width="100%" style="margin: auto" :src="appInfo.logo"/>
				</el-col>
				<el-col style="padding: 8px;">
					<el-row style="padding: 2px;">
						<span style="font-size: 16px;padding-right: 18px;">{{ appInfo.name}}</span>
						<el-tag size="mini">绑定微信</el-tag>
						<el-tag size="mini" type="info">绑定小程序</el-tag>
					</el-row>
					<el-row style="padding: 2px;">
						<label>应用Id:</label><span style="padding-left: 8px;">{{appInfo.id}}</span>
					</el-row>
					<el-row style="padding: 2px;">
						<label>应用secret:</label>
						<span style="padding-left: 8px;" v-if="secretShow">{{appInfo.secret}}</span>
						<el-tag size="small" type="success" v-else>查看</el-tag>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
    import TokenService from '../services/TokenService';
    export default {
        name: 'index',
        data(){
            return {
                secretShow: false
            }
        },
        mounted () {

        },
        computed:{
            appInfo() {
                let info = sessionStorage.getItem('appInfo');
                if (info) {
                    info = JSON.parse(info);
                }
                return info;
            }
        },
        methods: {

        },
        created(){
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
