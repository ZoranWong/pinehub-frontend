<template>
</template>

<script>
/* eslint-disable */
	export default {
		name: 'WechatManage',
	}
</script>

<style scoped>
	#mapContainer{
	    min-width:500px;
	    min-height:500px;
	}
	.layout{
		padding:20px;
	}
	.layout .firstLayout{
		padding-bottom:30px;
		border-bottom: 1px solid #dfe6ec;
		margin-bottom: 30px;
	}
	.grayText{
		color: #999;
	}
	.imgLayoutLeft{
		width:250px;
		padding-top:15px;
		height: 550px;
		border-right: 1px solid #dfe6ec;
	}
	.imgLayoutLeft .upContent{
		height:80%;
		width:100%;
		border-bottom: 1px solid #dfe6ec;
	}
	.imgLayoutLeft .upContent p{
		margin-bottom: 15px;
	}
	.imgLayoutLeft .upContent p span{
		color: #ddd;
	}
	.imgLayoutLeft .downContent{
		text-align: center;
		padding-top:10px;
	}
	.imgLayoutRight{
		height:20%;
		position: absolute;
		top:0;
		width: 70%;
		left:280px;
	}
	.imgLayoutRight .upload{
		padding:20px 15px 15px 0;
		border-bottom: 1px solid #dfe6ec;
	}
	.imgTextContent .el-card{
		width:180px;
		margin-right:10px;
		float: left;
	}
	.stopLayoutText .el-card,.keyLayout .el-card{
		width:180px;
		display: inline-block;
	}
	.imgTextContent{
		padding:10px;
		height: 500px;
		overflow-y: scroll;
		cursor: pointer;
	}
	.imgTextContent .active{
		width:180px;
		height:100%;
		position: absolute;
		top:0;
		left:0;
		background: rgba(0,0,0,0.7);
	}
	.imgLayoutRight .downContent{
		padding:10px;
		height: 500px;
		overflow-y: scroll;
	}
	.imgLayoutRight .downContent>div{
		width:148px;
		height:148px;
		cursor: pointer;
		display: inline-block;
		position: relative;
	}
	.imgLayoutRight .downContent img,.imgTextContent img{
		width:148px;
		height:148px;
		cursor: pointer;
	}
	.imgLayoutRight .downContent .active{
		width:148px;
		height:148px;
		position: absolute;
		top:0;
		left:0;
		background: rgba(0,0,0,0.7);
	}
	.imgLayoutRight .downContent .active p,.imgTextContent .active p{
		width:46px;
		height:46px;
		background: url(../../assets/WeChat.png) 0 -2355px no-repeat;
		position: absolute;
	    top: 35%;
	    left: 35%;
	}
	.el-upload{
		float:right;
	}
	.el-upload__tip {
	    float: right;
	}
	.stopLayoutUp{
		background: #fff;
		border: 1px solid #dfe6ec;
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
	}
	.stopLayoutUp button{
		margin:0 20px;
	}
	.stopLayoutText{
		background: #fff;
		border: 1px solid #dfe6ec;
		border-top: none;
		height:320px;
		padding:10px;
		text-align: center;
	}
	.stopLayoutImg{
		border: 1px solid #dfe6ec;
		border-top: none;
		height:280px;
		overflow: hidden;
	}
	.stopLayoutImg .showImg{
		width:100%;
		float:left;
		height:80%;
		margin:2.5%;
	}
	.stopLayoutImg .kuImg{
		width:45%;
		float:left;
		height:80%;
		margin:2.5%;
		border:2px dashed #dfe6ec;
		text-align: center;
		line-height: 200px;
	}
	.stopLayoutImg .kuImg:hover,.stopLayoutImg .uploadImg:hover{
		border:2px dashed #bbb;
	}
	.stopLayoutImg .uploadImg{
		width:45%;
		height:80%;
		margin:2.5%;
		float:right;
		border:2px dashed #dfe6ec;
		text-align: center;
	}
    .leftMobile{
    	width:320px;
    	position: absolute;
	    margin-left: 20px;
	    left: 20px;
	    top: 65px;
    }
    .rightFormNone{
    	text-align: center;
    	margin-right:20px;
    	height: 609px;
    	padding:8px 20px;
    	margin-left: 400px;
    	line-height: 609px;
    }
    .rightForm{
    	border:1px solid #dfe6ec;
    	background: #eee;
    	margin-right:20px;
    	height: 609px;
    	padding:8px 20px;
    	margin-left: 400px;
    }
    .leftMobile .menuHeader{
    	text-align: center;
    	padding-top: 33px;
    	height: 60px;
    	color:#fff;
    	background:url(../../assets/bg_mobile_head.png) no-repeat;
    }
    .leftMobile .menuContent{
    	height: 500px;
	    border-left: 1px solid #dfe6ec;
	    border-right: 1px solid #dfe6ec;
    }
    .leftMobile .menuFooter{
    	height: 50px;
    	padding-left: 45px;
    	background:url(../../assets/bg_mobile_foot.png) no-repeat;
    	border: 1px solid #dfe6ec;
    }
    .submenu button:not(:last-child){
    	border-bottom: 1px solid #dfe6ec;
    }
    .leftMobile .menuFooter span:not(:last-child){
    	border-right: 1px solid #dfe6ec;
    }
    .leftMobile .menuFooter>span{
    	height: 100%;
    	display: inline-block;
    }
    .leftMobile .menuFooter button{
    	margin: 0 !important;
    }
    .leftMobile .menuFooter button{
    	width:100%;
    	height: 100%;
    }
     .el-popover .bottnLayout{
    	width:100%;
    	height:100%;
    	margin:0 !important;
      }
    .rightForm .form-container {
	    padding: 0 !important;
	}
   .rightForm .form-container .menuName{
	   	border-bottom: 1px solid #dfe6ec;
	   	overflow: hidden;
   }
   .rightForm .form-container .menuName button:last-child{
   		float:right
   }
   .rightForm .menuForm p{
   		margin:10px 0;
   }
   .viewLayout{
	   	height: 750px;
	   	background:url(../../assets/bg_mobile.png) no-repeat;
   }
   .viewLayout .viewHeader{
   		text-align: center;
    	padding-top: 118px;
    	padding-bottom: 30px;
    	height: 60px;
    	color:#fff;
   }
   .viewLayout .viewContent .viewImgText{
	   background:#fff;
	}
   .viewLayout .viewContent{
   		height: 395px;
   		width: 255px;
    	margin-left: 45px;
    	padding: 15px 0;
    	overflow-y: scroll;
   }
   .viewLayout .viewContent>div{
   		margin-bottom: 15px;
   }
   .viewLayout .viewFooter{
   		height: 38px;
    	padding-left: 65px;
   }
   .viewLayout .viewFooter span:not(:last-child){
    	border-right: 1px solid #dfe6ec;
    }
    .viewLayout .viewFooter span:first-child{
    	border-left: 1px solid #dfe6ec;
    }
    .viewLayout .viewFooter span{
    	width:78px;
    	height: 100%;
    	display: inline-block;
    }
    .viewLayout .viewFooter button{
    	margin: 0 !important;
    }
    .viewLayout .viewFooter button{
    	width:100%;
    	height: 100%;
    }
    .rightForm .el-form-layout .el-form-item__content{

    	border:1px solid #ddd;
    }
    .rightForm .el-form-layout .el-form-item__content .el-form-pad{
    	padding:10px;
    	background: #fff !important;
    }
    .material{
    	padding:15px 0 30px;
    	border-bottom:2px solid #dfe6ec;
    	overflow: hidden;
    }
    .materialData{
    	text-align: center;
    	/*line-height: 400px;*/
    	height:400px;
    }
    .upload-demo{
    	display:inline-block
    }
    .layout .el-select{
    	 width: 100px;
    }
    .keyContent{
    	padding: 15px 0 10px;
    	border-bottom: 1px solid #dfe6ec;
    	margin-bottom: 10px;
    }
    .keyDetail{
    	display: inline-block;
    	margin-right:15px;
    }
    .imgTextLeft p{
    	padding:20px 15px 15px 0px;
    }
    .imgTextLeft .imgTextLeftList>div{
    	position: relative;
		z-index: 1;
    }
    .imgTextLeft .imgTextLeftList>div:hover >div.layoutShadow{display:block;}
    .imgTextLeft .imgTextLeftList>div{
    	height:80px;
    	line-height: 65px;
    	padding:8px;
    	border: 1px solid #e7e7eb;
    	border-bottom: none;
    }
	.imgTextLeft .imgTextLeftView:hover >div>div.layoutShadow{display:block;}
    .imgTextLeft .imgTextLeftView{
    	position: relative;
		z-index: 1;
		border: 1px solid #e7e7eb;
		border-bottom: none;
		background-color: #fff;
		color: #8d8d8d;
		height: 134px;
    }
    .imgTextLeft .imgTextLeftAdd{
    	border: 2px dashed #e7e7eb;
    	height: 100px;
    	text-align: center;
    	line-height: 100px;
    }
    .imgTextPopper{
    	background-color: rgba(0,0,0,0.7);
    }
    .imgTextPopper button{
    	border:none;
    }
    .imgTextLeft .imgTextLeftView .layoutShadow,.imgTextLeft .imgTextLeftList>div .layoutShadow{
    	display: none;
    	 height: 40px;
		line-height: 40px;
		width:100%;
		position: absolute;
		left:0;
		bottom: 0;
		background: rgba(0,0,0,0.5) !important;
    }
    .imgTextLeft .imgTextLeftView .layoutShadow button,.imgTextLeft .imgTextLeftList>div .layoutShadow button{
    	display: inline-block;
    	height:25px;
    	width:30px;
    	border:none;
    }
    .imgTextLeft .imgTextLeftList .imgLayout{
    	display: inline-block;
    	height:60px;
    	width:60px;
    	float:right;
    }
    .imgTextLeft .imgTextLeftView .layoutShadow .js_up,.imgTextLeft .imgTextLeftList>div .layoutShadow .js_up{
    	 background: url(../../assets/WeChat.png) 5px -4800px no-repeat;
    }
   .imgTextLeft .imgTextLeftView .layoutShadow .js_down,.imgTextLeft .imgTextLeftList>div .layoutShadow .js_down{
    	 background: url(../../assets/WeChat.png) 5px -4824px no-repeat;
    }
    .imgTextLeft .imgTextLeftView .layoutShadow .js_delete,.imgTextLeft .imgTextLeftList>div .layoutShadow .js_delete{
    	float: right;
    	margin-top:10px;
    	background: url(../../assets/WeChat.png) 5px -4872px no-repeat;
    }
    .imgTextLeft .imgTextLeftView .imgTextActive,.imgTextLeft .imgTextLeftList .imgTextActive{
    	border: 2px solid #43b548;
    }
    .imgTextLeft .imgTextLeftView>div{
    	height:100%;
    	padding:10px;
    	color:#fff;
    }
    .imgTextLeft .imgTextLeftView .layoutTitle>div:first-child{
    	 left: 0px;
	    bottom: 0px;
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    padding: 60px 0 20px 15px;
    }
    .imgTextLeft .imgTextLeftView .layoutTitle{
    	height:100%;
		background-color: #f6f8f9;
		position: relative;
    }
    .imgTextRight p{
    	padding:20px 15px;
    }
    .imgTextRight div{
    	padding:10px;
    	border:1px solid #dfe6ec;
    	text-align: center;
    }
     .imgTextRight div:not(:nth-child(2)){
    	border-top:none;
    }
    .imgTextRight div button{
    	border:none;
    }
</style>
<style>
	.imgText .el-tabs__header{
		margin:0 !important
	}
	.imgTextLayout{
		padding:20px 0 0 0;
		border-right: 1px solid #dfe6ec;
		border-left: 1px solid #dfe6ec;
	}
	.el-upload__tip{
		float:none !important;
	}
	.stopLayoutText .el-textarea__inner {
    	border: none !important;
    }
	.el-popover{
    	min-width:auto !important;
    	overflow: hidden;
    }
     .addPopperClass1{
    	top:624px !important;
    }
    .addPopperClass2{
    	top:584px !important;
    }
    .addPopperClass3{
    	top:544px !important;
    }
    .addPopperClass4{
    	top:504px !important;
    }
    .addPopperClass5{
    	top:504px !important;
    }
    .addPopperClass0{
    	top:664px !important;
    }
    #viewId .el-dialog{
	   	background:none !important;
	   	box-shadow:none !important;
   }
   .el-upload--picture-card{
    	background-color:none !important;
		border:none !important;
		width: auto !important;
		height: auto !important;
		line-height: 0px !important;
		vertical-align: bottom;
    }
    .el-upload--picture-card i {
	    font-size: 12px !important;
	}
	.imgLayoutRight .upload .el-upload-list--picture-card{
		display: none !important;
	}


	.gzhinfo{background: #f5fffe;border: 1px solid #9dd9d7;border-radius: 5px;padding: 30px 0;}
	.titleLabel {margin: 20px 0;font-weight: bold;}
	.gzhPic{float:left;width:50%;text-align: center;}
	.gzhPic p{margin-top:20px;}
	.gzhCaozuo button{font-size:14px;width: 15%;margin-right: 50px;text-align: center;height: 50px;background: #f5f5f5;margin-bottom: 20px;border:none;border-radius: 5px;color:#000}
	.unbind {width: 100%;background: #fdfbfc;border: 1px solid #e6e6e6;border-radius: 5px;padding: 30px 0;}
	.unbind .unbindleft h4 {font-size: 20px;color: #333;}
	.unbind .unbindleft a{display: block;width: 400px;height: 50px;line-height: 50px;margin: 0 auto;background: #03b8b1;border-radius: 5px;color: #fff;font-size: 20px;}
	.unbind .unbindleft p {font-size: 16px;margin: 30px 0;color: #343434;}
	.unbind .unbindright {width: 340px;}
	.unbind .unbindleft {text-align: center;width: 830px;border-right: 1px solid #e6e6e6;}
	.unbind .unbindright h3 {color: #999;margin-left: 20px;margin-bottom: 10px;}
	.unbind .unbindright p {list-style: disc;color: #999;margin-left: 50px;line-height: 25px;}
	.unbind .unbindright p span {width: 8px;   display: inline-block;   height: 8px; margin-right:2px;     background-color:#999;      border-radius: 50%}
</style>
