<template>
	<div class="content-scroll">
		<div class="content-box" style="padding:20px 30px">
			<div v-if="verify">
				<p class="titleLabel">公众号授权信息</p>
				<el-row :gutter="20" class="toolbar gzhinfo">
					<el-col :span="12">
						<el-form v-loading="fLoading" label-width="120px">
							<el-form-item label="公众号名称：">
								<span v-text="detailData.name"></span>
							</el-form-item>
							<el-form-item label="公众号类型：">
								<span v-text="detailData.code"></span>
							</el-form-item>
							<el-form-item label="认证信息：">
								<span v-text="detailData.managers"></span>
							</el-form-item>
							<el-form-item label="APPID：">
								<span v-text="detailData.phone"></span>
							</el-form-item>
							<el-form-item label="授权状态：">
								<span v-text="detailData.bphone"></span>
							</el-form-item>
							<el-form-item label="">
								<span>您的商城已获得该公众号的所有接口权限，可以正常对接微信。 如果使用中发现接口有异常，请重新授权</span>
							</el-form-item>
						</el-form>
					</el-col>
				  	<el-col :span="11">
				  		<div class="gzhPic">
							<img src="../../../src/assets/logo_scale.png" style="height:144px;width:144px" alt="" />
							<p>公众号logo</p>
						</div>
						<div class="gzhPic">
							<img src="../../../src/assets/logo_scale.png" style="height:144px;width:144px" alt="" />
							<p>公众号二维码</p>
						</div>
				  	</el-col>
				</el-row>	
				<p class="titleLabel">公众号设置</p>
				<el-row :gutter="20">
					<div class="gzhCaozuo">
						<el-button type="success" size="mini" @click="getReply(true, 1)">自动回复</el-button>
						<el-button type="success" size="mini" @click="getMenu(true, 1)">自定义菜单</el-button>
					</div>
				</el-row>
			</div>
			<div class="unbind" v-else>
				<div class="unbindleft">
					<h4>绑定微信公众号，把商城和微信打通</h4>
					<p>建议您授权绑定认证服务号，以方便使用微信公众平台的所有功能</p>
					<a :href="authUrl" target="_blank" v-on:click="polling()">微信公众号登录授权</a>
				</div>
				<div class="unbindright">
					<h3>温馨提示</h3>
					<p><span></span>一个微信公众号只能和一个店铺绑定</p>
					<p><span></span>为保证系统功能正常使用，授权时请保持默认选择，勾选所有权限，且小程序账号没有授权给其他系统使用。</p>
				</div>
			</div>
				<!--<el-form :inline="true" :model="filters" label-width="10px" ref="selectFileds">
					<el-form-item prop="app_id">
						<el-input size="small" v-model="filters.app_id" placeholder="公众号appid"></el-input>
					</el-form-item>
					<el-form-item prop="mode">
						<el-select size="small" v-model="filters.mode">
							<el-option label="请选择公众号模式" value=""></el-option>
							<el-option label="编辑者模式" value="editor"></el-option>
							<el-option label="开发者模式" value="developer"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="type">
						<el-select size="small" v-model="filters.type">
							<el-option label="请选择公众号类型" value=""></el-option>
							<el-option label="小程序" value="wechat_mini_program"></el-option>
							<el-option label="公众号" value="wechat_official_account"></el-option>
							<el-option label="微信三方应用" value="wechat_open_platform"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="wechat_bind_app">
						<el-input size="small" v-model="filters.wechat_bind_app" placeholder="公众号绑定应用"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetForm()">重置</el-button>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="getList(filters)">查询</el-button>
					</el-form-item>
				</el-form>
				<div>
					<el-button size="small" type="primary" icon="el-icon-plus" @click.native="getUpdate(false)">新增</el-button>
					<el-button size="small" type="danger" icon="el-icon-delete" @click.native="batchDelData()">批量删除</el-button>
				</div>-->
			
			<!--列表-->
			<!--<el-table :data="selectData" highlight-current-row v-loading="tLoading" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="app_name" label="公众号名称" min-width="80"></el-table-column>
				<el-table-column prop="app_id" label="公众号appid" min-width="100"></el-table-column>
				<el-table-column prop="app_secret" label="公众号app_secret" min-width="150"></el-table-column>
				<el-table-column prop="mode" label="公众号模式" min-width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.mode=='editor'">编辑者模式</span>
						<span v-if="scope.row.mode=='developer'">开发者模式</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="公众号类型" min-width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.type=='wechat_mini_program'">小程序</span>
						<span v-if="scope.row.type=='wechat_official_account'">公众号</span>
						<span v-if="scope.row.type=='wechat_open_platform'">微信三方应用</span>
					</template>
				</el-table-column>
				<el-table-column prop="wechat_bind_app" label="公众号绑定应用" min-width="100"></el-table-column>
				<el-table-column label="操作" width="260">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="getDetail(scope.row)">查看</el-button>
						<el-button type="primary" size="mini" @click="getUpdate(true, scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="delData(scope.row)">删除</el-button>
						<el-popover placement="top">
							<el-button type="success" size="mini" @click="getReply(true, scope.row)">自动回复</el-button>
							<el-button type="success" size="mini" @click="getMenu(true, scope.row)">自定义菜单</el-button>
							<el-button slot="reference" title="更多" icon="el-icon-more" size="mini"></el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>-->
			<!--工具条-->
			<!--<div class="toolbar" style="text-align: right;">
				<el-pagination layout="prev, pager, next, ->, total, jumper" @current-change="handleCurrentChange" background :total="totalNum"></el-pagination>
			</div>-->
			<!--新增编辑界面-->
			<el-dialog :visible.sync="formVisible" @close="dialogClose" @open="dialogOpen" :modal="false" :top="scrollTop" width="100%" :fullscreen="true" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane :label="saveType ? '公众号编辑' : '公众号新增'" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="formData" v-loading="fLoading" label-width="180px" :rules="formRules" ref="formFileds">
						<el-form-item label="公众号名称：" prop="app_name">
							<el-input v-model="formData.app_name" style="width:50%"></el-input>
						</el-form-item>
						<el-form-item label="公众号appid：" prop="app_id">
							<el-input v-model="formData.app_id" style="width:50%" :maxlength="18"></el-input>
						</el-form-item>
						<el-form-item label="公众号app_secret：" prop="app_secret">
							<el-input v-model="formData.app_secret" style="width:80%" :maxlength="32"></el-input>
						</el-form-item>
						<el-form-item label="公众号模式：" prop="mode">
							<el-radio-group v-model="formData.mode">
							    <el-radio label="editor">编辑者模式</el-radio>
							    <el-radio label="developer">开发者模式</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="公众号类型：" prop="type">
							<el-radio-group v-model="formData.type">
							    <el-radio label="wechat_mini_program">小程序</el-radio>
							    <el-radio label="wechat_official_account">公众号</el-radio>
							    <el-radio label="wechat_open_platform">微信三方应用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="公众号token：" prop="token" v-if='formData.mode=="developer"'>
							<el-input v-model="formData.token" style="width:80%" :maxlength="32"></el-input>
						</el-form-item>
						<el-form-item label="公众号aes_key：" prop="aes_key" v-if='formData.mode=="developer"'>
							<el-input v-model="formData.aes_key" style="width:80%" :maxlength="43"></el-input>
						</el-form-item>
						<el-form-item label="公众号wechat_bind_app：" prop="wechat_bind_app">
							<el-input v-model="formData.wechat_bind_app" style="width:50%"></el-input>
						</el-form-item>
						<!--<el-form-item label="描述：" prop="address">
							<el-input v-model="formData.address" type="textarea" style="width:80%" :rows="4"></el-input>
						</el-form-item>-->
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="formVisible = false" size="small">取消</el-button>
					<el-button type="primary" @click.native="createSubmit()" :loading="bLoading" size="small">提交</el-button>
				</div>
			</el-dialog>
			<!--详情界面-->
			<el-dialog :visible.sync="detailVisible" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="公众号信息" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form v-loading="fLoading" label-width="180px">
						<el-form-item label="公众号名称：">
							<span v-text="detailData.app_name"></span>
						</el-form-item>
						<el-form-item label="公众号appid：">
							<span v-text="detailData.app_id"></span>
						</el-form-item>
						<el-form-item label="公众号app_secret：">
							<span v-text="detailData.app_secret"></span>
						</el-form-item>
						<el-form-item label="公众号模式：">
							<span v-if="detailData.mode=='editor'">编辑者模式</span>
							<span v-if="detailData.mode=='developer'">开发者模式</span>
						</el-form-item>
						<el-form-item label="公众号类型：">
							<span v-if="detailData.type=='wechat_mini_program'">小程序</span>
							<span v-if="detailData.type=='wechat_official_account'">公众号</span>
							<span v-if="detailData.type=='wechat_open_platform'">微信三方应用</span>
						</el-form-item>
						<el-form-item label="公众号token：" v-if='detailData.mode=="developer"'>
							<span v-text="detailData.token"></span>
						</el-form-item>
						<el-form-item label="公众号aes_key：" v-if='detailData.mode=="developer"'>
							<span v-text="detailData.aes_key"></span>
						</el-form-item>
						<el-form-item label="公众号wechat_bind_app：">
							<span v-text="detailData.wechat_bind_app"></span>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="detailVisible = false" size="small">返回</el-button>
				</div>
			</el-dialog>
			<!--自动回复-->
			<el-dialog :visible.sync="replyVisible" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first" @tab-click="replyClick()">
				    <el-tab-pane label="关键词回复" name="first" class="layout">
				    	<el-row :gutter="10" type="flex" align="middle" class="firstLayout">
							<el-col :span="24">
								<el-col :span="21">
								  	<h3>自动回复</h3>
								  	<p class="grayText">关闭自动回复之后，将立即对所有用户生效。</p>
								</el-col>
								<el-col :span="3">
								  	<el-switch v-model="keyValue" active-color="#13ce66" inactive-color="#dfe6ec"> </el-switch>
								</el-col>
							</el-col>
						</el-row>
				    	<div class="form-container" v-if="keyValue && !addRule">
							<el-form :inline="true" :model="keyfilters" label-width="10px" ref="keyFileds">
								<el-form-item prop="name">
									<el-input size="small" v-model="filters.name" placeholder="搜索关键词/规则名称"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button size="small" type="primary" @click="">查询</el-button>
								</el-form-item>
								<el-form-item style="float:right">
									<el-button size="small" type="success" @click="keyListEdit(false)">添加回复</el-button>
								</el-form-item>
							</el-form>
							<el-table :data="keyList" highlight-current-row v-loading="tLoading" v-if="!keyDetail">
								<el-table-column prop="name" label="规则名称" min-width="120" header="center"></el-table-column>
								<el-table-column prop="keyWords" label="关键词" min-width="200" header="center"></el-table-column>
								<el-table-column prop="content" label="回复内容" min-width="120" header="center"></el-table-column>
								<el-table-column label="操作" width="120" header="center">
									<template slot-scope="scope">
										<el-button type="text" size="mini" icon="search" @click="keyDetail=true;keyLists=keyList[scope.$index]">详情</el-button>
										<el-button type="text" size="mini" icon="search" @click="keyListEdit(true,scope.$index)">编辑</el-button>
										<el-button type="text" size="mini" icon="search" @click="keyList.splice(scope.$index, 1)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-form v-loading="fLoading" label-width="100px" v-else style="border:1px solid #dfe6ec;border-radius: 5px;">
								<el-form-item label="规则名称：">
									<span v-text="keyLists.name"></span>
								</el-form-item>
								<el-form-item label="关键词：">
									<p class="keyDetail" v-for="(prefectKey, index) in keyLists.prefect_match_keywords" >{{prefectKey}} <span class="grayText">(全匹配)</span></p>
									<p class="keyDetail" v-for="(semiKey, index) in keyLists.semi_match_keywords">{{semiKey}} <span class="grayText">(半匹配)</span></p>
								</el-form-item>
								<el-form-item label="回复内容：">
									<span v-text="keyLists.content"></span>
								</el-form-item>
								<el-form-item style="float:right">
									<el-button size="small" @click="keyDetail=false">返回</el-button>
								</el-form-item>
							</el-form>
						</div>
						<div class="form-container" v-if="keyValue && addRule">
							<el-form :model="keyAddData" v-loading="fLoading" label-width="120px" ref="keyAddFileds">
								<el-form-item label="规则名称：" prop="name" :rules="{ required: true, message: '规则名不能为空且最多60个字', trigger: 'blur' }">
									<el-input v-model="keyAddData.name" :maxlength="60"></el-input>
									<span class="grayText">规则名最多60个字</span>
								</el-form-item>
								<el-form-item :label="!index?'关键词：':''" v-for="(keyMain, index) in keyAddData.keyMains" :key="index" :prop="'keyMains.' + index + '.value'" :rules="{required: true, message: '关键词不能为空且最多30个字', trigger: 'blur'}">
									<el-input placeholder="请输入关键词" v-model="keyMain.value" class="input-with-select">
									    <el-select v-model="keyMain.selectName" slot="prepend" >
									      <el-option label="半匹配" value="1"></el-option>
									      <el-option label="全匹配" value="2"></el-option>
									    </el-select>
									    <el-tooltip content="添加" placement="top" slot="append" v-if="index==keyAddData.keyMains.length-1">
										  <el-button icon="el-icon-circle-plus-outline" size="small" @click="addKeyMain()"></el-button>
										</el-tooltip>
										<el-tooltip content="删除" placement="top" slot="append" v-if="keyAddData.keyMains.length>1">
										  <el-button icon="el-icon-remove-outline" size="small" @click.prevent="removeKeyMain(keyMain)"></el-button>
										</el-tooltip>
									</el-input>
								</el-form-item>
								<el-form-item label="回复内容：" prop="content" :rules="{required: true, message: '回复内容不能为空', trigger: 'blur'}">
									<div class="keyLayout">
										<div v-if="keyImgTextUrl && keyAllContent" class="keyContent">
											<el-card :body-style="{ padding: '0px',display:'inline-block' }">
											 	<div style="padding: 10px;"><time class="time">{{ keyImgTextUrl.update_time }}</time></div>
										        <img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+keyImgTextUrl.content.news_item[0].thumb_url" style="width:148px" class="image">
											    <div style="padding: 10px;"><span>{{keyImgTextUrl.content.news_item[0].title}}</span></div>
										    </el-card>
											<el-button icon="el-icon-edit" circle  @click="imgTextVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle  @click="keyImgTextUrl=''"></el-button>
										</div>
										<div v-if="keyImgUrl && keyAllContent" class="keyContent">
											<img :src="keyImgUrl" alt="" />
											<el-button icon="el-icon-edit" circle size="mini" @click="imgVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="keyImgUrl=''"></el-button>
										</div>
										<div v-if="keyText && keyAllContent" class="keyContent">
											<span>{{keyText}}</span>
											<el-button icon="el-icon-edit" circle size="mini" @click="textVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="keyText=''"></el-button>
										</div>
										<div v-if="keyVoiceName && keyAllContent" class="keyContent">
											<span>{{keyVoiceName}}</span>
											<el-button icon="el-icon-edit" circle size="mini" @click="voiceVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="keyVoiceName=''"></el-button>
										</div>
										<div v-if="keyVideoName && keyAllContent" class="keyContent">
											<span>{{keyVideoName}}</span>
											<el-button icon="el-icon-edit" circle size="mini" @click="videoVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="keyVideoName=''"></el-button>
										</div>
									</div>
									<el-popover placement="right" width="250" trigger="hover">
										<div>
											<el-button type="text" size="small" @click.native="getImgTextMaterials('key')"> 图文消息 </el-button>
						  					<el-button type="text" size="small" @click.native="textVisible=true;textData.content=''"> 文字 </el-button>
						  					<el-button type="text" size="small" @click.native="getImgMaterials('key')"> 图片 </el-button>
								  			<el-button type="text" size="small" @click.native="getVoiceMaterials('key')"> 语音 </el-button>
								  			<el-button type="text" size="small" @click.native="getVideoMaterials('key')"> 视频</el-button>
										</div>
									  <el-button slot="reference" icon="el-icon-circle-plus-outline" size="small"></el-button>
									</el-popover>
								</el-form-item>
								<!--<el-form-item label="回复方式：" prop="type">
									<el-radio-group v-model="keyAddData.type">
									    <el-radio :label="0">回复全部</el-radio>
									    <el-radio :label="1">随机回复一条</el-radio>
									 </el-radio-group>
								</el-form-item>-->
							</el-form>
							<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:20px;">
								<el-button type="success" size="small" @click.native="ruleSubmit(keyAddData)">保存</el-button>
								<el-button @click.native="keyValue = true;addRule=false" size="small" plain>取消</el-button>
							</div>
						</div>
				    </el-tab-pane>
				    <el-tab-pane label="收到消息回复" name="second" class="layout">
				    	<el-row :gutter="10" type="flex" align="middle" class="firstLayout">
							<el-col :span="24">
								<el-col :span="21">
								  	<h3>自动回复</h3>
								  	<p class="grayText">关闭自动回复之后，将立即对所有用户生效。</p>
								</el-col>
								<el-col :span="3">
								  	<el-switch v-model="stopValue" active-color="#13ce66" inactive-color="#dfe6ec"> </el-switch>
								</el-col>
							</el-col>
						</el-row>
						<div class="form-container" v-if="stopValue">
							<div class="stopLayoutUp">
			  					<el-button plain size="small" @click.native="stopAddData.type='text'"> 文字 </el-button>
			  					<el-button plain size="small" @click.native="stopAddData.type='image'"> 图片 </el-button>
					  			<el-button plain size="small" @click.native="stopAddData.type='voice'"> 语音 </el-button>
					  			<el-button plain size="small" @click.native="stopAddData.type='video'"> 视频 </el-button>
							</div>
							<div class="stopLayoutText" v-if="stopAddData.type=='text'">
								<el-form :model="stopAddData" v-loading="fLoading">
									<el-form-item label="" prop="content" :rules="{required: true, message: '请输入文字', trigger: 'blur'}">
										<el-input v-model="stopAddData.content" type="textarea" autosize :maxlength="600"></el-input>
									</el-form-item>
								</el-form>
							</div>
							<div class="stopLayoutImg" v-else>
								<div class="kuImg" v-if="stopAddData.type=='image' && stopImgShow">
									<el-button plain size="small" @click.native="getImgMaterials('news')"> 从素材库中选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
								</div>
								<div class="kuImg" v-if="stopAddData.type=='voice' && stopVoiceShow">
									<el-button plain size="small" @click.native="getVoiceMaterials('news')"> 从素材库中选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
								</div>
								<div class="kuImg" v-if="stopAddData.type=='video' && stopVideoShow">
									<el-button plain size="small" @click.native="getVideoMaterials('news')"> 从素材库中选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
								</div>
								<div class="uploadImg" v-if="stopAddData.type=='image' && stopImgShow">
									<el-form :model="stopAddData" v-loading="fLoading" style="margin-top:90px;">
										<el-form-item label="" prop="content" v-if="stopAddData.type=='image'" :rules="{required: true, message: '请添加素材', trigger: 'blur'}">
											<el-upload class="upload-demo" name="stopMerchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/wechat/image/material?app_id='+appId" :on-remove="stopHandleRemove" :data="stopExData" :on-success="stopHandleSuccess" :on-error="handleError" list-type="picture-card">
											  <el-button plain size="small"> 上传图片  </el-button>
											</el-upload>
										</el-form-item>
									</el-form>
								</div>
								<div class="uploadImg" v-if="stopAddData.type=='voice' && stopVoiceShow">
									<el-form :model="stopAddData" v-loading="fLoading" style="margin-top:90px;">
										<el-form-item label="" prop="content" :rules="{required: true, message: '请添加素材', trigger: 'blur'}">
											  <el-button plain size="small" @click.native="addVoice()"> 新建语音 <i class="el-icon-edit el-icon--right"></i> </el-button>
										</el-form-item>
									</el-form>
								</div>
								<div class="uploadImg" v-if="stopAddData.type=='video' && stopVideoShow">
									<el-form :model="stopAddData" v-loading="fLoading" style="margin-top:90px;">
										<el-form-item label="" prop="content" :rules="{required: true, message: '请添加素材', trigger: 'blur'}">
											  <el-button plain size="small" @click.native="addVideo()"> 新建视频 <i class="el-icon-edit el-icon--right"></i> </el-button>
										</el-form-item>
									</el-form>
								</div>
								<div class="showImg" v-if="stopAddData.type=='image' && !stopImgShow">
									<img :src="stopImgUrl" alt="" />
									<el-button icon="el-icon-edit" circle size="mini" @click="imgVisible=true"></el-button>
								    <el-button icon="el-icon-delete" circle size="mini" @click="stopImgShow=true"></el-button>
								</div>
								<div class="showImg" v-if="stopAddData.type=='voice' && !stopVoiceShow">
									<span>{{stopVoiceName}}</span>
									<el-button icon="el-icon-edit" circle size="mini" @click="voiceVisible=true"></el-button>
								    <el-button icon="el-icon-delete" circle size="mini" @click="stopVoiceShow=true"></el-button>
								</div>
								<div class="showImg" v-if="stopAddData.type=='video' && !stopVideoShow">
									<span>{{stopVideoName}}</span>
									<el-button icon="el-icon-edit" circle size="mini" @click="videoVisible=true"></el-button>
								    <el-button icon="el-icon-delete" circle size="mini" @click="stopVideoShow=true"></el-button>
								</div>
							</div>
							<div slot="footer" class="dialog-footer" style="margin-top:20px;">
								<el-button type="success" size="small" @click="newsReply(stopAddData)">保存</el-button>
								<el-popover placement="bottom-end" width="220" v-model="deleteNewsReply">
								  <p>删除后，关注该公众号的用户将不再接收该回复，确定删除？</p>
								  <div style="text-align: right; margin: 0">
								    <el-button size="mini" plain @click="deleteNewsReply = false">取消</el-button>
								    <el-button type="success" size="mini" @click="stopAddData.content='';modifyReply(stopAddData)">确定</el-button>
								  </div>
								  <el-button slot="reference"size="small" plain :disabled="!(stopAddData.content || !stopImgShow || !stopVoiceShow || !stopVideoShow)">删除回复</el-button>
								</el-popover>
							</div>
						</div>
				    </el-tab-pane>
				    <el-tab-pane label="被关注回复" name="third" class="layout">
				    	<el-row :gutter="10" type="flex" align="middle" class="firstLayout">
							<el-col :span="24">
								<el-col :span="21">
								  	<h3>自动回复</h3>
								  	<p class="grayText">关闭自动回复之后，将立即对所有用户生效。</p>
								</el-col>
								<el-col :span="3">
								  	<el-switch v-model="followValue" active-color="#13ce66" inactive-color="#dfe6ec"> </el-switch>
								</el-col>
							</el-col>
						</el-row>
						<div class="form-container" v-if="followValue">
							<div class="stopLayoutUp">
			  					<el-button plain size="small" @click.native="followAddData.type='text'"> 文字 </el-button>
			  					<el-button plain size="small" @click.native="followAddData.type='image'"> 图片 </el-button>
					  			<el-button plain size="small" @click.native="followAddData.type='voice'"> 语音 </el-button>
					  			<el-button plain size="small" @click.native="followAddData.type='video'"> 视频 </el-button>
							</div>
							<div class="stopLayoutText" v-if="followAddData.type=='text'">
								<el-form :model="followAddData" v-loading="fLoading" :rules="followAddRules" ref="followAddFileds">
									<el-form-item label="" prop="content" :rules="{required: true, message: '请输入文字', trigger: 'blur'}">
										<el-input v-model="followAddData.content" type="textarea" autosize :maxlength="600"></el-input>
									</el-form-item>
								</el-form>
							</div>
							<div class="stopLayoutImg" v-else>
								<div class="kuImg" v-if="followAddData.type=='image' && followImgShow">
									<el-button plain size="small" @click.native="getImgMaterials('followed')"> 从素材库中选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
								</div>
								<div class="kuImg" v-if="followAddData.type=='voice' && followVoiceShow">
									<el-button plain size="small" @click.native="getVoiceMaterials('followed')"> 从素材库中选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
								</div>
								<div class="kuImg" v-if="followAddData.type=='video' && followVideoShow">
									<el-button plain size="small"  @click.native="getVideoMaterials('followed')"> 从素材库中选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
								</div>
								<div class="uploadImg" v-if="followAddData.type=='image' && followImgShow">
									<el-form :model="followAddData" v-loading="fLoading" :rules="followAddRules" ref="followAddFileds"  style="margin-top:90px;">
										<el-form-item label="" prop="content" :rules="{required: true, message: '请添加素材', trigger: 'blur'}">
											<el-upload class="upload-demo" name="followMerchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/wechat/image/material?app_id='+appId" :on-remove="followHandleRemove" :data="followExData" :on-success="followHandleSuccess" :on-error="handleError" list-type="picture-card">
											  <el-button plain size="small"> 上传图片  </el-button>
											</el-upload>
										</el-form-item>
									</el-form>
								</div>
								<div class="uploadImg" v-if="followAddData.type=='voice' && followVoiceShow">
									<el-form :model="followAddData" v-loading="fLoading" :rules="followAddRules" ref="followAddFileds"  style="margin-top:90px;">
										<el-form-item label="" prop="content" :rules="{required: true, message: '请添加素材', trigger: 'blur'}">
											<el-button plain size="small" @click.native="addVoice()"> 新建语音 <i class="el-icon-edit el-icon--right"></i> </el-button>
										</el-form-item>
									</el-form>
								</div>
								<div class="uploadImg" v-if="followAddData.type=='video' && followVideoShow">
									<el-form :model="followAddData" v-loading="fLoading" :rules="followAddRules" ref="followAddFileds"  style="margin-top:90px;">
										<el-form-item label="" prop="content" :rules="{required: true, message: '请添加素材', trigger: 'blur'}">
											<el-button plain size="small" @click.native="addVideo()"> 新建视频 <i class="el-icon-edit el-icon--right"></i> </el-button>
										</el-form-item>
									</el-form>
								</div>
								<div class="showImg" v-if="followAddData.type=='image' && !followImgShow">
									<img :src="followImgUrl" alt="" />
									<el-button icon="el-icon-edit" circle size="mini" @click="imgVisible=true"></el-button>
								    <el-button icon="el-icon-delete" circle size="mini" @click="followImgShow=true"></el-button>
								</div>
								<div class="showImg" v-if="followAddData.type=='voice' && !followVoiceShow">
									<span>{{followVoiceName}}</span>
									<el-button icon="el-icon-edit" circle size="mini" @click="voiceVisible=true"></el-button>
								    <el-button icon="el-icon-delete" circle size="mini" @click="followVoiceShow=true"></el-button>
								</div>
								<div class="showImg" v-if="followAddData.type=='video' && !followVideoShow">
									<span>{{followVideoName}}</span>
									<el-button icon="el-icon-edit" circle size="mini" @click="voiceVisible=true"></el-button>
								    <el-button icon="el-icon-delete" circle size="mini" @click="followVideoShow=true"></el-button>
								</div>
							</div>
							<div slot="footer" class="dialog-footer" style="margin-top:20px;">
								<el-button type="success" size="small" @click="attentionReply(followAddData)">保存</el-button>
								<el-popover placement="bottom-end" width="220" v-model="deleteAttentionReply">
								  <p>删除后，关注该公众号的用户将不再接收该回复，确定删除？</p>
								  <div style="text-align: right; margin: 0">
								    <el-button size="mini" plain @click="deleteAttentionReply = false">取消</el-button>
								    <el-button type="success" size="mini" @click="followAddData.content='';modifyReply(followAddData)">确定</el-button>
								  </div>
								  <el-button slot="reference"size="small" plain :disabled="!(followAddData.content || !followVideoShow || !followVoiceShow || !followImgShow)">删除回复</el-button>
								</el-popover>
							</div>
						</div>
				    </el-tab-pane>
				</el-tabs>
			</el-dialog>
			<!--自定义菜单-->
			<el-dialog :visible.sync="menuVisible" title="自定义菜单" style="overflow: hidden;" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<div class="leftMobile">
					<div class="menuHeader">
						<p>{{publicName}}</p>
					</div>
					<div class="menuContent"></div>
					<div class="menuFooter" v-if="menuDragg">
						<el-popover placement="top" :width="popoverMenu.width" v-for="(popoverMenu, index) in button" :key="index" v-dragging="{ item: popoverMenu, list: button, group: 'menuValue' }">
							<div class="submenu">
								<el-button type="text" class="bottnLayout" v-for="(item, indexs) in button[index].sub_button" :key="indexs">{{item.name}}</el-button>
							</div>
							<el-button type="text" :style="'width:'+popoverMenu.width+'px'" icon="el-icon-plus" slot="reference" v-if="button.length==1">{{popoverMenu.name}}</el-button>
							<el-button type="text" :style="'width:'+popoverMenu.width+'px'" slot="reference" v-if="popoverMenu.name && button.length!=1">{{popoverMenu.name}}</el-button>
							<el-button type="text" :style="'width:'+popoverMenu.width+'px'" icon="el-icon-plus" slot="reference" v-if="!popoverMenu.name && button.length!=1"></el-button>
						</el-popover>
					</div>
					<div class="menuFooter" v-else>
						<el-popover placement="top" :disabled="addMenuDisabled" :popper-class="'addPopperClass'+button[index].sub_button.length" :width="popoverMenu.width" v-for="(popoverMenu, index) in button" :key="index">
							<div class="submenu">
								<el-button type="text" class="bottnLayout" @click.native="modifySubmenu(item.name,indexs,false)" v-for="(item, indexs) in button[index].sub_button" :key="indexs">{{item.name}}</el-button>
								<el-button type="text" icon="el-icon-plus" class="bottnLayout" @click.native="addSubmenu(popoverMenu.name,index)" v-if="button[index].sub_button.length<5"></el-button>
							</div>
							<el-button type="text" :style="'width:'+popoverMenu.width+'px'" icon="el-icon-plus" slot="reference" @click.native="addMenu()" v-if="button.length==1">{{popoverMenu.name}}</el-button>
							<el-button type="text" :style="'width:'+popoverMenu.width+'px'" slot="reference" @click.native="addMenu(popoverMenu.name,index,true)" v-if="popoverMenu.name && button.length!=1">{{popoverMenu.name}}</el-button>
							<el-button type="text" :style="'width:'+popoverMenu.width+'px'" icon="el-icon-plus" slot="reference" @click.native="addMenu(popoverMenu.name,index)" v-if="!popoverMenu.name && button.length!=1"></el-button>
						</el-popover>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:30px" v-if="menuFormType">
						<el-button @click.native="menuDragg?menuDragg=false:menuDragg=true" size="small">{{menuDragg?"完成":"菜单排序"}}</el-button>
					</div>
				</div>
				<div class="rightForm" v-if="menuFormType">
				  	<div class="form-container">
				  		<div class="menuName">
				  			<el-button type="text" size="small">{{menuAddName}}</el-button>
				  			<el-button type="text" size="small" @click.native="deleteMenu">删除{{menuType?"菜单":"子菜单"}}</el-button>
				  		</div>
				  		<div class="menuForm">
				  			<p v-if="submenuType">已添加子菜单，仅可设置菜单名称。</p>
				  			<el-form :model="menuAddData" label-position="left" v-loading="fLoading" label-width="120px" :rules="menuAddRules" ref="menuAddFileds">
								<el-form-item :label="menuType?'菜单名称：':'子菜单名称：'" prop="name">
									<el-input v-model="menuAddData.name" :maxlength="4" v-if="menuType" @blur="synchronizeMenuName()"></el-input>
									<el-input v-model="menuAddData.name" :maxlength="8" v-else @blur="synchronizeMenuName()"></el-input>
									<span class="grayText" v-if="menuType">字数不超过4个汉字或8个字母</span>
									<span class="grayText" v-else>字数不超过8个汉字或16个字母</span>
								</el-form-item>
								<el-form-item :label="menuType?'菜单内容：':'子菜单内容：'" prop="type" v-if="!submenuType">
									<el-radio-group v-model="menuAddData.type" @change="synchronizeMenuType()">
									    <el-radio label="click">发送消息</el-radio>
									    <el-radio label="view">跳转网页</el-radio>
									    <el-radio label="miniprogram">跳转小程序</el-radio>
									 </el-radio-group>
								</el-form-item>
								<el-form-item label="" prop="key" v-if="menuAddData.type=='click' && !submenuType" class="el-form-layout">
									<div class="stopLayoutUp">
					  					<el-button plain size="small" @click.native="stopTextValue=1;"> 图文消息 </el-button>
					  					<el-button plain size="small" @click.native="stopTextValue=2;"> 图片 </el-button>
							  			<el-button plain size="small" @click.native="stopTextValue=3;"> 语音 </el-button>
							  			<el-button plain size="small" @click.native="stopTextValue=4;"> 视频  </el-button>
									</div>
									<div class="stopLayoutText" :style="!menuImgText?'':stopTextValue!=1?'line-height:280px;':''">
										<div v-if="stopTextValue==1 && menuImgText" style="line-height: 280px;">
											<el-button plain size="small" @click.native="getImgTextMaterials('menus')"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
						  					<el-button plain size="small" @click.native="addImgTextVisible=true"> 自建图文 <i class="el-icon-edit el-icon--right"></i> </el-button>
								  			<el-button plain size="small" @click.native=""> 分享图文 <i class="el-icon-share el-icon--right"></i> </el-button>
										</div>
										<div v-if="stopTextValue==1 && !menuImgText">
											<el-card :body-style="{ padding: '0px',display:'inline-block' }">
											 	<div style="padding: 10px;"><time class="time">{{ menuImgTextUrl.update_time }}</time></div>
										        <img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+menuImgTextUrl.content.news_item[0].thumb_url" style="width:148px" class="image">
											    <div style="padding: 10px;"><span>{{menuImgTextUrl.content.news_item[0].title}}</span></div>
										    </el-card>
										    <el-button icon="el-icon-edit" circle size="mini" @click="imgTextVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="menuImgText=true"></el-button>
										</div>
										<div v-if="stopTextValue==2 && menuImg">
											<el-button plain size="small" @click.native="getImgMaterials('menus')"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
											<el-upload class="upload-demo" name="menuMerchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/wechat/image/material?app_id='+appId" :on-remove="menuHandleRemove" :data="menuExData" :on-success="menuHandleSuccess" :on-error="handleError" list-type="picture">
											  <el-button plain size="small"> 上传图片 <i class="el-icon-edit el-icon--right"></i> </el-button>
											</el-upload>
										</div>
										<div v-if="stopTextValue==2 && !menuImg">
											<img :src="menuImgUrl" alt="" style="width:220px"/>
											<el-button icon="el-icon-edit" circle size="mini" @click="imgVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="menuImg=true"></el-button>
										</div>
										<div v-if="stopTextValue==3 && menuVoice">
											<el-button plain size="small" @click.native="getVoiceMaterials('menus')"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
						  					<el-button plain size="small" @click.native="addVoice()"> 新建语音 <i class="el-icon-edit el-icon--right"></i> </el-button>
										</div>
										<div v-if="stopTextValue==3 && !menuVoice">
											<span>{{menuVoiceName}}</span>
											<el-button icon="el-icon-edit" circle size="mini" @click="voiceVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="menuVoice=true"></el-button>
										</div>
										<div v-if="stopTextValue==4 && menuVideo">
											<el-button plain size="small" @click.native="getVideoMaterials('menus')"> 从素材库选择 <i class="el-icon-upload el-icon--right"></i>  </el-button>
						  					<el-button plain size="small" @click.native="addVideo()"> 新建视频 <i class="el-icon-edit el-icon--right"></i> </el-button>
										</div>
										<div v-if="stopTextValue==4 && !menuVideo">
											<span>{{menuVideoName}}</span>
											<el-button icon="el-icon-edit" circle size="mini" @click="videoVisible=true"></el-button>
										    <el-button icon="el-icon-delete" circle size="mini" @click="menuVideo=true"></el-button>
										</div>
									</div>
								</el-form-item>
								<el-form-item label="" prop="url" class="el-form-layout" v-if="menuAddData.type!='click' && !submenuType">
									<div v-if="menuAddData.type=='miniprogram'" class="el-form-pad">
										<p style="text-align: center;">自定义菜单可跳转已绑定的小程序，本公众号尚未绑定小程序。</p>
									</div>
									<div v-if="menuAddData.type=='view'" class="el-form-pad">
										<p style="color:#999">订阅者点击该菜单会跳到以下链接</p>
										<span>页面地址 </span><el-input v-model="menuAddData.url" placeholder="认证后才可手动输入地址" @blur="synchronizeMenuUrl()" style="width:80%"></el-input>
										<p style="margin-left:15%"><a>从公众号图文消息中选中</a></p>
									</div>
								</el-form-item>
							</el-form>
				  		</div>
					</div>
					<div slot="footer" class="dialog-footer" style="position: absolute;bottom: 66px;">
						<el-button @click.native="saveMenu()" size="small" type="success" v-if="releaseId">保存并发布</el-button>
						<el-button @click.native="saveMenu()" size="small" type="success" v-else>保存</el-button>
						<el-button @click.native="viewVisible=true;viwShow=''" size="small">预览</el-button>
					</div>
				</div>
				<div class="rightFormNone" v-else>点击左侧菜单进行编辑操作</div>
			</el-dialog>
			<!--选择图文-->
			<el-dialog :visible.sync="imgTextVisible" title="选择素材" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<div class="form-container">
					<el-form :inline="true" :model="imgTextFilters" label-width="10px" ref="imgTextFileds">
						<el-form-item prop="title">
							<el-input size="small" v-model="imgTextFilters.title" placeholder="标题"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button size="small" type="primary" @click="">查询</el-button>
						</el-form-item>
						<el-form-item style="float:right">
							<el-button size="small" type="success" @click="addImgTextVisible=true">新建</el-button>
						</el-form-item>
					</el-form>
					<div class="imgTextContent">
						 <el-card :body-style="{ padding: '0px',position:'relative',display:'inline-block' }" v-for="(imgText, index) in imgTextDatas" :key="index" @click.native="chooseImgText(index,imgText)">
						 	<div v-if="imgText.className==1" class="active"><p></p></div>
						 	<div style="padding: 10px;"><time class="time">{{ imgText.update_time }}</time></div>
					        <img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+imgText.content.news_item[0].thumb_url" class="image">
						    <div style="padding: 10px;"><span>{{imgText.content.news_item[0].title}}</span></div>
					    </el-card>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="imgTextSubmit()" size="small" type="success">确定</el-button>
						<el-button @click.native="imgTextVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--新建图文-->
			<el-dialog class="imgText" :visible.sync="addImgTextVisible" @close="dialogClose" @open="dialogOpen" width="100%" :fullscreen="true" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="素材库" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-row :gutter="10">
						 <el-col :span="5" class="imgTextLeft">
							<p>图文列表</p>
							<div class="imgTextLeftView">
								<div v-on:click="showImgTextData()" :class="showShadow?'imgTextActive':''">
									<div class="layoutTitle" :style="addImgTextLists.thumb_media_url?'':'background:#aaa'">
										<div :style="addImgTextLists.thumb_media_url?'background-color: rgba(0,0,0,0.3);':'' ">{{addImgTextLists.title?addImgTextLists.title:'标题'}}</div>
										<div><img :src="addImgTextLists.thumb_media_url" style="width:100%;height:110px" alt="" /></div>
									</div>
									<div class="layoutShadow">
										<el-button class="js_down" v-if="addImgTextList.length" @click.stop="downImgTextData(false)"></el-button>
									</div>
								</div>
							</div>
							<div class="imgTextLeftList">
								<div v-for="(item, index) in addImgTextList" :key="index" :class="item.showShadow?'imgTextActive':''" v-on:click="showImgTextData(index,true)"> 
									<div style="float:left">{{item.title?item.title:'标题'}}</div>
									<div class="imgLayout" :style="item.thumb_media_url?'':'background:#f6f8f9'" ><img :src="item.thumb_media_url" alt="" style="width:100%"/></div>
									<div class="layoutShadow">
										<el-button class="js_up" @click.stop="upImgTextData(index)"></el-button>
										<el-button class="js_down" v-if="index!=addImgTextList.length-1" @click.stop="downImgTextData(index)"></el-button>
										<el-button class="js_delete" @click.stop="delImgTextData(index)"></el-button>
									</div>
								</div>
							</div>
							<div class="imgTextLeftAdd">
								<el-popover placement="bottom" width="150" trigger="hover" popper-class="imgTextPopper">
									<div class="submenu">
										<el-button icon="el-icon-tickets" @click.native="addImgTextData()">图文消息</el-button>
										<el-button icon="el-icon-bell" @click.native="videoVisible=true">视频消息</el-button>
										<el-button icon="el-icon-service" @click.native="voiceVisible=true">音频消息</el-button>
										<el-button icon="el-icon-printer" @click.native="imgVisible=true">图片消息</el-button>
										<el-button icon="el-icon-share" @click.native="">分享</el-button>
									</div>
									<el-button type="text" icon="el-icon-plus" slot="reference" ></el-button>
								</el-popover>
							</div>
						  </el-col>
						  <el-col :span="14" class="imgTextLayout">
							<el-form :model="addImgTextFilters" label-width="150px" ref="addImgTextFileds">
								<el-form-item prop="title" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
									<el-input size="small" v-model="addImgTextFilters.title" placeholder="请在这里输入标题" @change="addImgTextValue('title')" :maxlength="64"></el-input>
								</el-form-item>
								<el-form-item prop="author">
									<el-input size="small" v-model="addImgTextFilters.author" placeholder="请输入作者" @change="addImgTextValue('author')" :maxlength="8"></el-input>
								</el-form-item>
								<el-form-item prop="content" :rules="{required: true, message: '内容不能为空', trigger: 'blur'}">
									<el-input size="small" v-model="addImgTextFilters.content" type="textarea" :rows="3" placeholder="从这里开始写正文" @change="addImgTextValue('content')"></el-input>
									<!--<vue-html5-editor @change="addImgTextFilters.content = $event" :content="addImgTextFilters.content" :height="250"></vue-html5-editor>-->
								</el-form-item>
								<el-form-item prop="type">
									<el-checkbox v-model="addImgTextFilters.type">原文链接 </el-checkbox>
								</el-form-item>
								<el-form-item prop="content_source_url" v-if="addImgTextFilters.type" :rules="{required: true, message: '原文链接地址不能为空', trigger: 'blur'}">
									<el-input size="small" v-model="addImgTextFilters.content_source_url" @change="addImgTextValue('content_source_url')"></el-input>
								</el-form-item>
								<div style="border:1px solid #dfe6ec;background: #eee;">
									<p style="padding:15px 0 15px 20px"> 发布样式编辑 </p>
									<el-form-item prop="thumb_media_id" label="封面：" :rules="{required: true, message: '必须插入一张图片', trigger: 'blur'}">
										<el-button @click.native="">从正文选择</el-button>
										<el-button @click.native="getImgMaterials('imgText')">从图片库选择</el-button>
									</el-form-item>
									<div style="margin-left:150px;">
										<img :src="addImgTextFilters.thumb_media_url" :style="addImgTextFilters.thumb_media_url?'width:200px':''" alt="" />
									</div>
									<el-form-item prop="digest" label="摘要：">
										<el-input size="small" @change="addImgTextValue('digest')" v-model="addImgTextFilters.digest" type="textarea" :rows="3" placeholder="选填，如果不填写会默认抓取正文前54个字"></el-input>
									</el-form-item>
								</div>
								<!--<div style="border:1px solid #dfe6ec;background: #eee;">
									<p style="padding:15px 0 15px 20px"> 发布样式编辑 </p>
									<el-form-item prop="show_cover_pic" label="是否显示封面：">
										<el-radio-group v-model="addImgTextFilters.show_cover_pic">
										    <el-radio label="0">不显示封面 </el-radio>
										     <el-radio label="1">显示封面 </el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item prop="need_open_comment" label="是否打开评论：">
										<el-radio-group v-model="addImgTextFilters.need_open_comment">
										    <el-radio label="0">不打开 </el-radio>
										     <el-radio label="1">打开 </el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item prop="only_fans_can_comment" label="是否粉丝才可评论：">
										<el-radio-group v-model="addImgTextFilters.only_fans_can_comment">
										    <el-radio label="0">所有人可评论 </el-radio>
										     <el-radio label="1">粉丝才可评论 </el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item prop="digest" label="摘要：">
										<el-input size="small" v-model="addImgTextFilters.digest" type="textarea" :rows="3" placeholder="选填，如果不填写会默认抓取正文前54个字"></el-input>
									</el-form-item>
								</div>-->
							</el-form>
						  </el-col>
						  <el-col :span="5" class="imgTextRight">
							<p>多媒体</p>
							<div><el-button icon="el-icon-printer" @click.native="imgVisible=true">图片</el-button></div>
							<div><el-button icon="el-icon-bell" @click.native="videoVisible=true">视频</el-button></div>
							<div><el-button icon="el-icon-service" @click.native="voiceVisible=true">音频</el-button></div>
							<div><el-button icon="el-icon-edit-outline" @click.native="">投票</el-button></div>
							<div><el-button icon="el-icon-news" @click.native="">小程序</el-button></div>
						  </el-col>
					</el-row>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="imgTextSave()" size="small" type="success">保存</el-button>
						<el-button @click.native="addImgTextVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--选择文字-->
			<el-dialog :visible.sync="textVisible" title="添加回复文字" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<div class="form-container" style="margin-top:50px;">
					<el-form :model="textData" v-loading="fLoading" label-width="120px" :rules="textRules" ref="textFileds">
						<el-form-item label="回复内容：" prop="content">
							<el-input v-model="textData.content" type="textarea" :rows="6"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="textSubmit()" size="small" type="success">确定</el-button>
						<el-button @click.native="textVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--选择图片-->
			<el-dialog :visible.sync="imgVisible" title="选择图片" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<div class="form-container" style="position: relative;">
					<div class="imgLayoutLeft">
						<div class="upContent">
							<el-menu default-active="2" class="el-menu-vertical-demo" @select="groupClick">
						      <el-menu-item :index="index.toString()" v-for="(item, index) in groupList" :key="index">
						        <span>{{item.name}}</span> <span>({{item.num}})</span>
						      </el-menu-item>
						    </el-menu>
							<!--<p v-for="(item, index) in groupList" :key="index" @click.native="groupClick(item.name)">{{item.name}} <span>({{item.num}})</span></p>-->
						</div>
						<div class="downContent">
							<el-popover placement="bottom" width="280" v-model="visible2"> 
								<div style="margin: 0;text-align: center;">
								    <el-form :model="groupData" v-loading="fLoading" label-width="120px" ref="groupFileds">
										<el-form-item label="创建分组" prop="group" :rules="{required: true, message: '分组名字为1-6个字符', trigger: 'blur'}">
											<el-input v-model="groupData.group" :maxlength="6"></el-input>
										</el-form-item>
									</el-form>
								    <el-button type="primary" size="mini" @click.native="groupSubmit()">确定</el-button>
								    <el-button size="mini" @click.native="visible2 = false">取消</el-button>
								</div>
								<el-button slot="reference" @click.native="" size="small" type="text">新建分组</el-button>
							</el-popover>
						</div>
					</div>
					<div class="imgLayoutRight">
						<div class="upload">
							<!--<el-form :model="imgData" v-loading="fLoading" label-width="120px">
								<el-form-item label="" prop="content">-->
									<el-upload class="upload-demo" name="updateMerchantpic" :headers="headers" :action="ADMIN_SERVER_HOST+'/wechat/image/material?app_id='+appId" :on-remove="updateHandleRemove" :data="updateExData" :on-success="updateHandleSuccess" :on-error="handleError" list-type="picture-card">
									  <el-button plain size="small">点击上传 <i class="el-icon-edit el-icon--right"></i> </el-button>
									  <div slot="tip" class="el-upload__tip">大小不超过5M， 已开启图片水印 </div>
									</el-upload>
								<!--</el-form-item>
							</el-form>-->
						</div>
						<div class="downContent" v-if="groupImgShow">
							<div v-for="(item, index) in groupImgList" :key="index" v-on:click="chooseImg(index,item)">
								<div v-if="item.className==1" class="active">
									<p></p>
								</div>
								<img :src="IMAGE_SERVER_HOST+'/material/view?material_src='+item.url" alt="" />
							</div>
							<!--<img v-for="(item, index) in groupImgList" :class="item.className==1?'active':''" :key="index"  v-on:click="chooseImg(index)" :src="IMAGE_SERVER_HOST+'/material/view?material_src='+item.url" alt="" />-->
						</div>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="imgSubmit()" size="small" type="success">确定</el-button>
						<el-button @click.native="imgVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--选择音频-->
			<el-dialog :visible.sync="voiceVisible" title="选择音频" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="素材库" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container" style="padding:0">
					<div class="material">
						<p class="grayText" style="float:left">由于版本兼容的原因,你暂时只可以选择60秒内的语音发送</p>
						<el-button size="small" type="success" @click.native="addVoice()" style="float:right">新建语音</el-button>
					</div>
					<div class="materialData">
						<el-table :data="voiceList" highlight-current-row v-loading="tLoading" v-if="voiceList.length" @current-change="voiceCurrentChange">
							<el-table-column prop="name" label="名称" min-width="100" header-align="center"></el-table-column>
							<el-table-column prop="media_id" label="ID" min-width="180" header-align="center"></el-table-column>
						</el-table>
						<p v-else style="line-height: 400px;">暂无素材</p>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="voiceSubmit()" size="small" type="success">确定</el-button>
						<el-button @click.native="voiceVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--新增音频-->
			<el-dialog :visible.sync="addVoiceVisible" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="新建语音" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="voiceData" v-loading="fLoading" label-width="120px" ref="voiceFileds">
						<el-form-item label="语音内容：" prop="file_path">
							<el-upload class="upload-demo" :headers="headers" name="voiceMerchantpic" :before-upload="voiceBeforeUpload" :action="ADMIN_SERVER_HOST+'/wechat/voice/material?app_id='+appId" :on-remove="voiceHandleRemove" :data="voiceExData" :on-success="voiceHandleSuccess" :on-error="handleError" :file-list="voiceFileList">
	  							<el-button size="small">点击上传</el-button>
	  							<div slot="tip" class="el-upload__tip">格式支持mp3、wma、wav、amr，文件大小不超过30M，语音时长不超过30分钟</div>
							</el-upload>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="voiceSave()" size="small" type="success">保存</el-button>
						<el-button @click.native="addVoiceVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--选择视频-->
			<el-dialog :visible.sync="videoVisible" title="选择视频" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="素材库" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container" style="padding:0">
					<div class="material">
						<el-button size="small" type="success" @click.native="addVideo()" style="float:right">新建视频</el-button>
					</div>
					<div class="materialData">
						<el-table :data="videoList" highlight-current-row v-loading="tLoading" v-if="videoList.length" @current-change="videoCurrentChange">
							<el-table-column prop="name" label="名称" min-width="100" header-align="center"></el-table-column>
							<el-table-column prop="media_id" label="ID" min-width="180" header-align="center"></el-table-column>
							</el-table-column>
						</el-table>
						<p v-else style="line-height: 400px;">暂无素材</p>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="videoSubmit()" size="small" type="success">确定</el-button>
						<el-button @click.native="videoVisible = false" size="small">取消</el-button>
					</div>
				</div>				
			</el-dialog>
			<!--新增视频-->
			<el-dialog :visible.sync="addVideoVisible" @close="dialogClose" @open="dialogOpen" width="80%" :modal="false" :top="scrollTop" :close-on-click-modal="false">
				<el-tabs active-name="first">
					<el-tab-pane label="新建视频" name="first"></el-tab-pane>
				</el-tabs>
				<div class="form-container">
					<el-form :model="videoData" v-loading="fLoading" label-width="120px" ref="videoFileds">
						<el-form-item label="标题：" prop="title">
							<el-input v-model="videoData.title" :maxlength="21"></el-input>
							<span class="grayText">填写与视频内容相关的标题用于视频展示，建议填写清晰、准确、生动的标题</span>
						</el-form-item>
						<el-form-item label="介绍语：" prop="description">
							<el-input v-model="videoData.description" :maxlength="120" type="textarea"></el-input>
							<span class="grayText">填写与视频主题和内容相关的介绍语，建议填写简洁明确、有信息量的内容</span>
						</el-form-item>
						<el-form-item label="上传视频：" prop="file_field">
							<el-upload class="upload-demo" :headers="headers" name="videoMerchantpic" :before-upload="videoBeforeUpload" :action="ADMIN_SERVER_HOST+'/wechat/video/material?app_id='+appId" :on-remove="videoHandleRemove" :data="videoExData" :on-success="videoHandleSuccess" :on-error="handleError" :file-list="videoFileList">
	  							<el-button size="small">上传视频</el-button>
	  							<div slot="tip" class="el-upload__tip">视频不能超过20M，超过20M的视频可至腾讯视频上传后添加，也可通过添加视频详情页链接以及公众号文章链接插入视频，视频时长不少于1秒，不多于10小时，支持大部分主流 视频格式 </div>
							</el-upload>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="videoSave()" size="small" type="success">保存</el-button>
						<el-button @click.native="addVideoVisible = false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--预览-->
			<el-dialog id="viewId" :visible.sync="viewVisible" @close="dialogClose" @open="dialogOpen" width="360px" append-to-body :modal="false" :top="scrollTop" :close-on-click-modal="false" :show-close="false">
				<div class="viewLayout">
					<div class="viewHeader">
						<p>{{publicName}}</p>
					</div>
					<div class="viewContent" v-html="viwShow">
						{{viwShow}}
						
					</div>
					<div class="viewFooter">
						<el-popover placement="top" :disabled="!button[index].sub_button.length" :width="popoverMenu.width-12" v-for="(popoverMenu, index) in button" :key="index">
							<div class="submenu">
								<el-button type="text" @click.active="viewSubmenuShow(item)" class="bottnLayout" v-for="(item, indexs) in button[index].sub_button" :key="indexs">{{item.name}}</el-button>
								<!--<el-button type="text" icon="el-icon-plus" class="bottnLayout" v-if="button[index].sub_button.length<5"></el-button>-->
							</div>
							<el-button type="text" :style="'width:'+popoverMenu.width-12+'px'" icon="el-icon-plus" @click="viewMenuShow(popoverMenu)" slot="reference" v-if="button.length==1">{{popoverMenu.name}}</el-button>
							<el-button type="text" :style="'width:'+popoverMenu.width-12+'px'" slot="reference" @click="viewMenuShow(popoverMenu)" v-if="popoverMenu.name && button.length!=1">{{popoverMenu.name}}</el-button>
							<el-button type="text" :style="'width:'+popoverMenu.width-12+'px'" icon="el-icon-plus" @click="viewMenuShow(popoverMenu)" slot="reference" v-if="!popoverMenu.name && button.length!=1"></el-button>
						</el-popover>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 110px;">
						<el-button @click.native="viewVisible = false" size="small">退出预览</el-button>
					</div>
				</div>	
			</el-dialog>
			<!--保存发布操作选择-->
			<el-dialog :visible.sync="releaseVisible" @close="dialogClose" @open="dialogOpen" width="50%" :modal="false" :top="scrollTop" center :close-on-click-modal="false">
				<div class="form-container">
					<p>是否发布？</p>
					<div slot="footer" class="dialog-footer" style="text-align: center;margin-top:50px;">
						<el-button @click.native="releaseMenu()" size="small" type="success">发布</el-button>
						<el-button @click.native="releaseVisible=false" size="small">取消</el-button>
					</div>
				</div>	
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import NoPublicService from '../../services/NoPublicService';
	import tokenService from '../../services/TokenService';
	import { mapGetters } from 'vuex'
	export default {
		name: 'gzhlb',
		data() {
			return {
			    verify: false,
				interval:'',
				viwShow:'',
				releaseId:'',
				imgTextDatas:'',
				imgTextShowUrl:'',
				showShadow:true,
				imgTextNum:'',
				addImgTextLists:{
					title:'',
					thumb_media_id:'',
					content_source_url:'',
					thumb_media_url:'',
				},
				addImgTextList:[],
				voiceFileList:[],
				videoFileList:[],
				menuImgText:true,
				menuImg:true,
				menuVoice:true,
				menuVideo:true,
				menuVideoName:'',
				menuVoiceName:'',
				menuImgUrl:'',
				menuImgTextUrl:'',
				keyDetail:false,
				keyLists:{},
				
				keyAllContent:false,
				keyImgTextUrl:false,
				keyImgUrl:false,
				keyText:false,
				keyVoiceName:false,
				keyVideoName:false,
				
				imgSaveTo:'',
				imgTextSaveTo:'',
				vioceSaveTo:'',
				videoSaveTo:'',
				stopImgShow:true,
				stopVoiceShow:true,
				stopVideoShow:true,
				stopImgUrl:'',
				stopVideoName:'',
				stopVoiceName:'',
				followImgShow:true,
				followVoiceShow:true,
				followVideoShow:true,
				followImgUrl:'',
				followVideoName:'',
				followVoiceName:'',
				headers:{
					Accept: 'application/vnd.pinehub.v0.0.1+json'
				},
				menuExData: {
					file_field: 'menuMerchantpic'
				},
				voiceExData: {
					file_field: 'voiceMerchantpic'
				},
				videoExData: {
					file_field: 'videoMerchantpic'
				},
				updateExData: {
					file_field: 'updateMerchantpic'
				},
				followExData: {
					file_field: 'followMerchantpic'
				},
				stopExData: {
					file_field: 'stopMerchantpic'
				},
				submitType:'',
				appId:'',
				deleteNewsReply:'',
				deleteAttentionReply:'',
				addImgTextVisible:false,
				releaseVisible:false,
				voiceVisible:false,
				addVoiceVisible:false,
				addVideoVisible:false,
				videoVisible:false,
				voiceData:{
					app_id:'',
					file_path:'',
					file_field:'voiceMerchantpic'
				},
				deleteVideo:false,
				videoFileList:[],
				voiceFileList:[],
				videoList:[],
				voiceList:[],
				videoData:{
					app_id:'',
					file_path:'',
					description:'',
					title:'',
					file_field:'videoMerchantpic'
				},
				
				publicName:'',
				menuAddName:'',
				menuNum:'',
				subMenuNum:'',
				
				publicIds:[],
				listDisabled:true,
				addMenuDisabled:false,
				addPopperClass:'addPopperClass0',
				menuDragg:false,
				submenuType:'',
				menuFormType:'',
				menuType:'',
				button:[{
					width:273,
					sub_button:[],
					type:'click',
					name:'添加菜单'
				}],
				stopTextValue:1,
				visible2:false,
				viewVisible:false,
				groupImgShow:false,
				groupImgList:[],
				groupList:[{ name:"全部图片", num:"0" },
						   { name:"文章配图", num:"0" }],
				//列表查询字段
				filters: {
					page: 1,
					limit: 15,
					selected_appid: this.selectedAppid,
					wechat_app_id: this.wechatAppId
				},
				addImgTextFilters: {
					title: '',
					author: '',
					thumb_media_id: '',
					thumb_media_url: '',
					digest: '',
					type:'',
					show_cover: '0',
					content: '',
					content_source_url: '',
					need_open_comment: '0',
					only_fans_can_comment: '0'
				},
				imgTextFilters: {
					title: ''
				},
				keyfilters:{
					pageNum: 1,
					pagesize: 10,
					name: ''
				},
				followValue:true,
				keyValue:true,
				stopValue:true,
				textVisible:false,
				replyVisible:false,
				imgVisible:false,
				menuVisible:false,
				imgTextVisible:false,
				addRule:false,
				keyList:[],
				groupData: {
					group: ''
				},
				imgData: {
					content: ''
				},
				textData: {
					content: ''
				},
				textRules:{},
				keyAddData: {
					name: '',
					keyMains: [{
			            value: '',
			            selectName:'1'
			          }],
					content: '',
					type:''
				},
				followAddData: {
					content: '',
					type: 'text'
				},
				stopAddData: {
					content: '',
					type: 'text'
				},
				menuAddData: {
					name: '',
					type: 'click',
					url: '',
					key: ''
				},
				menuAddRules:{},
				followAddRules:{},
				stopAddRules:{},
				
				formRules: {
					app_id: [{required: true, message: '请输入公众号app_id', trigger: 'blur' }],
					app_secret: [{required: true, message: '请输入公众号app_secret', trigger: 'blur' }],
					mode: [{required: true, message: '请选择公众号模式', trigger: 'blur' }],
					type: [{required: true, message: '请输入公众号类型', trigger: 'blur' }],
					token: [{required: true, message: '请选择公众号token', trigger: 'blur' }],
					aes_key: [{required: true, message: '请输入公众号aes_key', trigger: 'blur' }]
				},
				//新增编辑界面数据
				formData: {
					app_name:'',
					wechat_bind_app: '',
					aes_key: '',
					type: '',
					token:'',
					mode: '',
					app_secret: '',
					app_id: ''
				},
				meta:{},
				detailData: {
					country:{
						name: ''
					},
					province: {
						name: ''
					},
					city: {
						name: ''
					},
					county: {
						name: ''
					},
					manager: {
						mobile: '',
						user_name: '',
						nickname: '',
						realname: ''
					}
				}
			};
		},
		mounted() {
			 this.$dragging.$on('dragged', ({ value }) => {
	          console.log(value.item)
	          console.log(value.list)
	          console.log(value.group)
	        })
		},
		computed: {
			authUrl(){
				let app_id=sessionStorage.getItem('shop') || '',token=tokenService.getToken();
				return this.WEB_HOST+'/open-platform/auth?app_id='+app_id+'&token='+token
			},
			appInfo() {
			    return JSON.parse(sessionStorage.getItem('appInfo'));
			},
			selectedAppid() {
			    return this.appInfo? this.appInfo.id : null;
			},
			wechatAppId() {
			    return this.appInfo? this.appInfo.wechat_app_id : null;
			}
		},
		watch: {

		},
		methods: {
			viewMenuShow(data){
				if(!data.sub_button.length){
					if(data.types=='image'){
						this.viwShow+='<div><img src="'+data.imgUrl+'" alt="" style="width:100%"/></div>'
					}else if(data.types=='news'){
						this.viwShow+='<div style="background:#fff"><div style="padding: 10px;"><time class="time"> '+data.imgTextUrl.update_time+' </time></div><img src="'+this.IMAGE_SERVER_HOST+'/material/view?material_src='+data.imgTextUrl.content.news_item[0].thumb_url+'" style="width:148px" class="image"><div style="padding: 10px;"><span>'+data.imgTextUrl.content.news_item[0].title+'</span></div></div>'
					}else if(data.types=='voice'){
						this.viwShow+='<div><span>'+data.voiceName+'</span></div>'
					}else{
						this.viwShow+='<div><span>'+data.videoName+'</span></div>'
					}
				}
				console.log(data)
			},
			viewSubmenuShow(data){
				if(data.types=='image'){
						this.viwShow+='<div><img src="'+data.imgUrl+'" alt="" style="width:100%"/></div>'
					}else if(data.types=='news'){
						this.viwShow+='<div style="background:#fff"><div style="padding: 10px;"><time class="time"> '+data.imgTextUrl.update_time+' </time></div><img src="'+this.IMAGE_SERVER_HOST+'/material/view?material_src='+data.imgTextUrl.content.news_item[0].thumb_url+'" style="width:148px" class="image"><div style="padding: 10px;"><span>'+data.imgTextUrl.content.news_item[0].title+'</span></div></div>'
					}else if(data.types=='voice'){
						this.viwShow+='<div><span>'+data.voiceName+'</span></div>'
					}else{
						this.viwShow+='<div><span>'+data.videoName+'</span></div>'
					}
			},
			addImgTextValue(value){
				if((this.imgTextNum || this.imgTextNum===0)&&(this.addImgTextList.length)){
					this.addImgTextList[this.imgTextNum][value]=this.addImgTextFilters[value]
				}else{
					this.addImgTextLists[value]=this.addImgTextFilters[value]
				}
				console.log(this.addImgTextLists)
			},
			async showImgTextData(index,type){
				for(var i in this.addImgTextList){
					delete this.addImgTextList[i].showShadow
				}
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.addImgTextFileds.resetFields();
					if(type){
						this.imgTextNum=index
						this.showShadow=false
						this.addImgTextList[index].showShadow=true
						this.addImgTextFilters=Object.assign(this.addImgTextFilters, this.addImgTextList[index]);
					}else{
						this.imgTextNum=false
						this.showShadow=true
						this.addImgTextFilters=Object.assign(this.addImgTextFilters, this.addImgTextLists);
					}
				}
				console.log(this.addImgTextFilters)
			},
			downImgTextData(index){
				if(index || index===0){
					let downs=this.addImgTextList[index]
					this.addImgTextList[index]=this.addImgTextList[index+1]
					this.addImgTextList[index+1]=downs
					this.showImgTextData(index+1,true)
				}else{
					let downs=this.addImgTextList[0]
					this.addImgTextList[0]=this.addImgTextLists
					this.addImgTextLists=downs
					this.showImgTextData(0,true)
				}
			},
			upImgTextData(index){
				let ups=this.addImgTextList[index]
				if(index){
					this.addImgTextList[index]=this.addImgTextList[index-1]
					this.addImgTextList[index-1]=ups
					this.showImgTextData(index-1,true)
				}else{
					this.addImgTextList[index]=this.addImgTextLists
					this.addImgTextLists=ups
					this.showImgTextData()
				}
			},
			delImgTextData(index){
				this.addImgTextList.splice(index, 1)
			},
			async addImgTextData(){
				this.addImgTextList.push({
					title:'',
					thumb_media_id:'',
					content_source_url:'',
					thumb_media_url:'',
					showShadow:true
				})
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.addImgTextFileds.resetFields();
					this.showImgTextData(this.addImgTextList.length-1,true)
				}
			},
			 keyListEdit(type,index){
				this.addRule=true;
				if(type){
					var newArr=[]
					if(this.keyList[index].prefect_match_keywords.length){
						for(var i in this.keyList[index].prefect_match_keywords){
							newArr.push({
								value:this.keyList[index].prefect_match_keywords[i],
				            	selectName:'2'
							})
						}
					}
					if(this.keyList[index].semi_match_keywords.length){
						for(var i in this.keyList[index].semi_match_keywords){
							newArr.push({
								value:this.keyList[index].semi_match_keywords[i],
				            	selectName:'1'
							})
						}
					}
					if(this.keyList[index].type=="image"){
						this.keyAddData.type='image'
						this.keyAddData.content=this.keyList[index].content
						this.keyImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.keyList[index].content
						this.keyText=''
						this.keyVideoName=''
						this.keyVoiceName=''
						this.keyImgTextUrl=''
					}else if(this.keyList[index].type=="video"){
						this.keyAddData.type='video'
						this.keyAddData.content=this.keyList[index].content
						this.keyVideoName=this.keyList[index].content
						this.keyImgUrl=''
						this.keyText=''
						this.keyVoiceName=''
						this.keyImgTextUrl=''
					}else if(this.keyList[index].type=="voice"){
						this.keyAddData.type='voice'
						this.keyAddData.content=this.keyList[index].content
						this.keyVoiceName=this.keyList[index].content
						this.keyVideoName=''
						this.keyImgUrl=''
						this.keyText=''
						this.keyImgTextUrl=''
					}else if(this.keyList[index].type=="news"){
						this.keyAddData.type='news'
						this.keyAddData.content=this.keyList[index].content
						this.keyImgTextUrl=this.keyList[index].content
						this.keyVideoName=''
						this.keyImgUrl=''
						this.keyVoiceName=''
						this.keyText=''
					}else{
						this.keyAddData.type='text'
						this.keyAddData.content=this.keyList[index].content
						this.keyText=this.keyList[index].content
						this.keyVideoName=''
						this.keyImgUrl=''
						this.keyVoiceName=''
						this.keyImgTextUrl=''
					}
					this.keyAddData={
						name: this.keyList[index].name,
						keyMains: newArr,
						content: this.keyList[index].content,
						type:this.keyList[index].type
					}					
					console.log(this.keyList[index])
				}else{
					this.keyAllContent=false
					this.keyAddData={
						name: '',
						keyMains: [{
				            value: '',
				            selectName:'1'
				          }],
						content: '',
						type:''
					}
				}
			},
			async voiceSave(){
				this.voiceData.app_id=this.appId
		    	let list = await this.adminApi(NoPublicService).addMaterials('voice',this.appId,this.voiceData)
		    	console.log(list)
		    	if(list){
		    		this.addVoiceVisible = false
		    	}
			},
			async videoSave(){
				this.videoData.app_id=this.appId
		    	let list = await this.adminApi(NoPublicService).addMaterials('video',this.appId,this.videoData)
		    	console.log(list)
		    	if(list){
		    		this.addVideoVisible = false
		    	}
			},
			chooseImg(index,item){
				for(var i in this.groupImgList){
					this.groupImgList[i].className=0
				}
				this.imgSaveTo=item
				this.groupImgList[index].className=1
			},
			chooseImgText(index,item){
				console.log(index)
				for(var i in this.imgTextDatas){
					this.imgTextDatas[i].className=0
				}
				this.imgTextSaveTo=item
				this.imgTextDatas[index].className=1
			},
			menuHandleSuccess(response, file, fileList) {
				this.menuImg=false
				this.menuImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+response.data.url
					console.log(response)
					console.log(file)
					console.log(fileList)
			},
			menuHandleRemove(file, fileList) {
				if(!file) return
				
			},
			voiceHandleSuccess(response, file, fileList) {
				this.voiceData.file_path=response.data.file_path
					console.log(response)
					console.log(file)
					console.log(fileList)
			},
			voiceHandleRemove(file, fileList) {
				if(!file) return
				
			},
			videoHandleSuccess(response, file, fileList) {
				this.videoData.file_path=response.data.file_path
					console.log(response)
					console.log(file)
					console.log(fileList)
			},
			videoHandleRemove(file, fileList) {
				if(!file) return
				
			},
			updateHandleSuccess(response, file, fileList) {
					this.groupImgList.push({url:response.data.url});
				
				this.groupImgShow=true;
			},
			updateHandleRemove(file, fileList) {
				if(!file) return
				this.followImgShow=true;
			},
			followHandleSuccess(response, file, fileList) {
				this.imgSaveTo=response.data
				this.followImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+response.data.url;
				this.followImgShow=false;
			},
			followHandleRemove(file, fileList) {
				if(!file) return
				this.followImgShow=true;
			},
			stopHandleSuccess(response, file, fileList) {
				this.imgSaveTo=response.data
				this.stopImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+response.data.url;
				this.stopImgShow=false;
			},
			stopHandleRemove(file, fileList) {
				if(!file) return
				this.stopImgShow=true;
			},
			groupSubmit(){
				let valid = this.$refs.groupFileds.validate();
				if(valid){
					this.groupList.push({name:this.groupData.group,num:0})
					this.visible2=false
			    }
			},
			groupClick(index,indexPath){
				console.log(index)
				console.log(indexPath)
			},
			imgTextSubmit(){
				if(this.submitType=="menus"){
					this.menuImgText=false
					this.menuImgTextUrl=this.imgTextSaveTo
					if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].types='news'
		    			this.button[this.menuNum].sub_button[this.subMenuNum].media_id=this.imgTextSaveTo.media_id
		    			this.button[this.menuNum].sub_button[this.subMenuNum].imgTextUrl=this.imgTextSaveTo
		    		}else{
		    			this.button[this.menuNum].types='news'
		    			this.button[this.menuNum].media_id=this.imgTextSaveTo.media_id
		    			this.button[this.menuNum].imgTextUrl=this.imgTextSaveTo
		    		}
				}else if(this.submitType=="key"){
					this.keyAddData.type='news'
					this.keyAddData.content=this.imgTextSaveTo.media_id
					this.keyAllContent=true
					this.keyImgTextUrl=this.imgTextSaveTo
				}
				this.imgTextVisible=false
			},
			imgSubmit(){
				if(this.submitType=="menus"){
					this.menuImg=false
					this.menuImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
		    		if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].types='image'
		    			this.button[this.menuNum].sub_button[this.subMenuNum].media_id=this.imgSaveTo.media_id
		    			this.button[this.menuNum].sub_button[this.subMenuNum].imgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
		    		}else{
		    			this.button[this.menuNum].types='image'
		    			this.button[this.menuNum].media_id=this.imgSaveTo.media_id
		    			this.button[this.menuNum].imgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
		    		}
				}else if(this.submitType=="key"){
					this.keyAddData.type='image'
					this.keyAddData.content=this.imgSaveTo.media_id
					this.keyAllContent=true
					this.keyImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
				}else if(this.submitType=="news"){
					this.stopImgShow=false
					this.stopImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
				}else if(this.submitType=="followed"){
					this.followImgShow=false
					this.followImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
				}else{
					this.addImgTextFilters.thumb_media_id=this.imgSaveTo.media_id
					this.addImgTextFilters.thumb_media_url=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
					if(this.imgTextNum || this.imgTextNum===0){
						this.addImgTextList[this.imgTextNum].thumb_media_id=this.imgSaveTo.media_id
						this.addImgTextList[this.imgTextNum].thumb_media_url=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
					}else{
						this.addImgTextLists.thumb_media_id=this.imgSaveTo.media_id
						this.addImgTextLists.thumb_media_url=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.imgSaveTo.url
					}
				}
				this.imgVisible=false
			},
			textSubmit(){
				this.keyAddData.type='text'
				this.keyAddData.content=this.textData.content
				this.keyText=this.textData.content
				this.keyAllContent=true
				this.textVisible=false
			},
			voiceSubmit(){
				if(this.submitType=="menus"){
					this.menuVoice=false
					this.menuVoiceName=this.voiceSaveTo.name
					if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].types='voice'
//		    			this.button[this.menuNum].sub_button[this.subMenuNum].media_id=this.voiceSaveTo.media_id
		    			this.button[this.menuNum].sub_button[this.subMenuNum].voiceName=this.voiceSaveTo.name
		    		}else{
		    			this.button[this.menuNum].types='voice'
//		    			this.button[this.menuNum].media_id=this.voiceSaveTo.media_id
		    			this.button[this.menuNum].voiceName=this.voiceSaveTo.name
		    		}
				}else if(this.submitType=="key"){
					this.keyAddData.type='voice'
					this.keyAddData.content=this.voiceSaveTo.media_id
					this.keyAllContent=true
					this.keyVoiceName=this.voiceSaveTo.name
				}else if(this.submitType=="news"){
					this.stopVoiceShow=false
					this.stopVoiceName=this.voiceSaveTo.name
				}else if(this.submitType=="followed"){
					this.followVoiceShow=false
					this.followVoiceName=this.voiceSaveTo.name
				}
				this.voiceVisible=false
			},
			videoSubmit(){
				console.log(this.submitType)
				if(this.submitType=="menus"){
					this.menuVideo=false
					this.menuVideoName=this.videoSaveTo.name
					if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].types='video'
//		    			this.button[this.menuNum].sub_button[this.subMenuNum].media_id=this.videoSaveTo.media_id
		    			this.button[this.menuNum].sub_button[this.subMenuNum].videoName=this.videoSaveTo.name
		    		}else{
		    			this.button[this.menuNum].types='video'
//		    			this.button[this.menuNum].media_id=this.videoSaveTo.media_id
		    			this.button[this.menuNum].videoName=this.videoSaveTo.name
		    		}
				}else if(this.submitType=="key"){
					this.keyAddData.type='video'
					this.keyAddData.content=this.videoSaveTo.media_id
					this.keyAllContent=true
					this.keyVideoName=this.videoSaveTo.name
				}else if(this.submitType=="news"){
					this.stopVideoShow=false
					this.stopVideoName=this.videoSaveTo.name
				}else if(this.submitType=="followed"){
					this.followVideoShow=false
					this.followVideoName=this.videoSaveTo.name
				}
				this.videoVisible=false
			},
			replyClick(){
				this.stopAddData.type='text'
			},
			videoBeforeUpload(file) {
				if(file.type != "video/mp4" && file.type != "video/wma" && file.type != "video/wav" && file.type != "video/amr") {
					this.$message({message: '只能上传mp4、wma、wav、amr文件',type: 'warning'})
					return false
				}
				if(file.size > 20e6) {
					this.$message({ message: '图片大小不能超过20M', type: 'warning' })
					return false
				}
			},
			voiceBeforeUpload(file) {
				console.log(file)
				if(file.type != "audio/mp3" && file.type != "audio/wma" && file.type != "audio/wav" && file.type != "audio/amr") {
					this.$message({message: '只能上传mp3、wma、wav、amr文件',type: 'warning'})
					return false
				}
				if(file.size > 30e6) {
					this.$message({ message: '图片大小不能超过30M', type: 'warning' })
					return false
				}
			},
			addVoice(){
				let result = this.$nextTick();
				if( result ) {
					this.voiceFileList=[]
				    this.addVoiceVisible=true
				}
			},
			addVideo(){
				let result =  this.$nextTick();
				if( result ) {
					this.videoFileList=[]
				    this.addVideoVisible=true
				}
			},
		    voiceCurrentChange(currentRow, oldCurrentRow) {
		    	this.voiceSaveTo=currentRow
		    },
		    videoCurrentChange(currentRow, oldCurrentRow) {
		    	this.videoSaveTo=currentRow
		    },
			handleSelectionChange(val) {
		        this.publicIds=[]
		        for(var i in val){
		        	this.publicIds.push(val.id)
		        }
		    },
		    async modifyReply(para){
		    	console.log(para)
		    	let list = await this.adminApi(NoPublicService).replyUpdateData (para)
		    	console.log(list)
		    },
		    async ruleSubmit(data){
		    	console.log(data)
		    	let para={
		    		app_id:this.appId,
		    		type:data.type,
		    		content:data.content,
		    		prefect_match_keywords:[],
		    		semi_match_keywords:[]
		    	}
		    	if(data.keyMains.length){
		    		for(var i in data.keyMains){
		    			if(data.keyMains[i].selectName==2){
		    				para.prefect_match_keywords.push(data.keyMains[i].value)
		    			}else{
		    				para.semi_match_keywords.push(data.keyMains[i].value)
		    			}
		    		}
		    	}
		    	console.log(para)
		    	let valid = await this.$refs.keyAddFileds.validate();
				if(valid){
		    		let result = await this.$confirm('确认保存吗？', '提示', {})
					if(result) {
				    	let list = await this.adminApi(NoPublicService).replyCreateData (para)
				    	if(list){
				    		this.addRule=false
				    		this.$message({message:"保存成功",type: 'success'})
				    	}
				    }
			    }
		    },
		    async attentionReply(data){
		    	console.log(data)
		    	let para={
		    		app_id:this.appId,
		    		type:data.type,
		    		content:data.type=="text"?data.content:data.type=="voice"?this.videoSaveTo.media_id:data.type=="video"?this.videoSaveTo.media_id:this.imgSaveTo.media_id
		    	}
				if(para.content){
					let result = await this.$confirm('确认保存吗？', '提示', {})
					if(result) {
				    	let list = await this.adminApi(NoPublicService).replyCreateData (para)
				    	if(list) {
							this.$message({message:"保存成功",type: 'success'})
						}
				    }
				}else{
					this.$message({message:"请添加素材",type: 'warning'})
				}
		    },
		    async newsReply(data){
		    	console.log(data)
		    	let para={
		    		app_id:this.appId,
		    		type:data.type,
		    		content:data.type=="text"?data.content:data.type=="voice"?this.videoSaveTo.media_id:data.type=="video"?this.videoSaveTo.media_id:this.imgSaveTo.media_id
		    	}
		    	if(para.content){
					let result = await this.$confirm('确认保存吗？', '提示', {})
					if(result) {
				    	let list = await this.adminApi(NoPublicService).replyCreateData (para)
				    	if(list) {
							this.$message({message:"保存成功",type: 'success'})
						}
				    }
				}else{
					this.$message({message:"请添加素材",type: 'warning'})
				}
		    },
			async getReply(type,row){
				this.appId=row.app_id;
				this.replyVisible=true;
				let list = await this.adminApi(NoPublicService).getReplyLists(this.appId)
				console.log(list)
				if(list){
					this.keyList=[]
					for(var i in list){
						if(list[i].prefect_match_keywords || list[i].semi_match_keywords){
							list[i].keyWords=list[i].prefect_match_keywords.join(',')+','+list[i].semi_match_keywords.join(',')
							if(list[i].type=="image"){
								list[i].content="1 图片"
							}else if(list[i].type=="video"){
								list[i].content="1 视频"
							}else if(list[i].type=="voice"){
								list[i].content="1 语音"
							}else{
								list[i].content="1 图文"
							}
							this.keyList.push(list[i])
						}else if(list[i].focus_reply){
							this.followAddData.type=list[i].type
							if(list[i].type=="image"){
								this.followImgShow=false
								this.followImgUrl=this.IMAGE_SERVER_HOST+'/material/'+list[i].content+'?app_id='+this.appId
							}else if(list[i].type=="video"){
								this.followVideoShow=false
								this.followVideoName=list[i].content
							}else if(list[i].type=="voice"){
								this.followVoiceShow=false
								this.followVoiceName=list[i].content
							}else{
								this.followAddData.content=list[i].content
							}
							
						}else{
							this.stopAddData.type=list[i].type
							if(list[i].type=="image"){
								this.stopImgShow=false
								this.stopImgUrl=this.IMAGE_SERVER_HOST+'/material/'+list[i].content+'?app_id='+this.appId
							}else if(list[i].type=="video"){
								this.stopVideoShow=false
								this.stopVideoName=list[i].content
							}else if(list[i].type=="voice"){
								this.stopVoiceShow=false
								this.stopVoiceName=list[i].content
							}else{
								this.stopAddData.content=list[i].content
							}
						}
					}
				}
			},
			async getImgTextMaterials(value){
				this.submitType=value
				this.imgTextVisible=true
				let list = await this.adminApi(NoPublicService).getMaterialsLists(this.appId,"news")
				if(list){
					for(var i in list.item){
						list.item[i].className=0
					}
					this.imgTextDatas=list.item
				}
				console.log(list.item)
			},
			async getImgMaterials(value){
				this.submitType=value
				this.imgVisible=true
				let list = await this.adminApi(NoPublicService).getMaterialsLists(this.appId,"image")
				if(list){
					for(var i in list.item){
						list.item[i].className=0
					}
					this.groupImgList=list.item
					this.groupImgShow=true
				}
			},
			async getVoiceMaterials(value){
				this.submitType=value
				this.voiceVisible=true
				let list = await this.adminApi(NoPublicService).getMaterialsLists(this.appId,"voice")
				if(list){
					this.voiceList=list.item
				}
				console.log(list)
			},					
			async getVideoMaterials(value){
				this.submitType=value
				this.videoVisible=true
				let list = await this.adminApi(NoPublicService).getMaterialsLists(this.appId,"video")
				if(list){
					this.videoList=list.item
				}
				console.log(list)
			},						
			async saveMenu(){
				let para={
					app_id:this.appId,
					menus:{button:this.button}
				}
				let list = await this.adminApi(NoPublicService).addMenu(para);
				if(list){
					this.$message({message:"保存成功",type: 'success'})
					if(this.releaseId){
						this.releaseMenu()
					}else{
						this.releaseId=list.id
						this.releaseVisible=true
					}
				}
				console.log(list)
			},
			async releaseMenu(){
				let list = await this.adminApi(NoPublicService).releaseMenu(this.releaseId);
				if(list){
					this.$message({message:"发布成功",type: 'success'})
					this.releaseVisible=false
				}
				console.log(list)
			},
			async getMenu(type,row){
				this.menuVisible=true;
				this.appId=row.app_id;
				this.publicName=row.app_name
				let result = await this.$nextTick();
				if( result ) {
					let list = await this.adminApi(NoPublicService).getMenuLists();
					if(list.data){
						this.releaseId=list.data[0].id
						this.button=list.data[0].menus.button
						this.menuFormType=true
						this.menuBinding(0)
					}
					console.log(this.button)
					console.log(list.data)
				}
			},
			addKeyMain(){
				this.keyAddData.keyMains.push({
		            value: '',
			        selectName: '1',
		          key: Date.now()
		        })
			},
			removeKeyMain(item) {
		        var index = this.keyAddData.keyMains.indexOf(item)
		        if (index !== -1) {
		          this.keyAddData.keyMains.splice(index, 1)
		        }
		    },
		    modifySubmenu(value,num,type){
		    	this.subMenuNum=num
		    	if(!type){
		    		this.menuAddName=value
		    		
		    		this.menuType=type//子菜单和主菜单名判断
		    		this.submenuType=false//判断主菜单下的子菜单是否添加
		    		
		    		this.menuBinding(this.menuNum,this.subMenuNum)
		    	}
		    },
		    addSubmenu(value,num){
		    	if(this.button[num].sub_button.length<5){
		    		if(this.button[num].sub_button.length==0){
		    			this.$confirm('<h3>子菜单确认</h3>添加子菜单后，一级菜单的内容将被清除。确定添加子菜单？', '温馨提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          dangerouslyUseHTMLString: true,
				          type: 'warning'
				        }).then(() => {
				        	delete this.button[num].type
				        	this.submenuType=true;
				          	this.button[num].sub_button.push({
				    			name:"子菜单名称",
				    			type:"click"
				    		})
				        }).catch(() => {
				                 
				        });
		    		}else{
		    			this.button[num].sub_button.push({
			    			name:"子菜单名称",
			    			type:"click"
			    		})
		    		}
		    	}
		    	this.addPopperClass="addPopperClass"+this.button[num].sub_button.length
		    	console.log(this.button)
		    },
		    synchronizeMenuUrl(){
		    	if(this.menuAddData.url){
		    		if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].url=this.menuAddData.url
		    		}else{
						this.button[this.menuNum].url=this.menuAddData.url
		    		}
		    	}
				console.log(this.button)
			},
		    synchronizeMenuName(){
		    	if(this.menuAddData.name){
		    		this.menuAddName=this.menuAddData.name
		    		if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].name=this.menuAddData.name
		    		}else{
						this.button[this.menuNum].name=this.menuAddData.name
		    		}
		    	}
				console.log(this.button)
			},
		    synchronizeMenuType(){
		    	if(this.menuAddData.type){
		    		if(this.subMenuNum || this.subMenuNum===0){
		    			this.button[this.menuNum].sub_button[this.subMenuNum].type=this.menuAddData.type
		    		}else{
		    			this.button[this.menuNum].type=this.menuAddData.type
		    		}
		    	}
				console.log(this.button)
			},
			async menuBinding(mainNum,childNum){
				console.log(this.menuAddData)
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.menuAddFileds.resetFields();
				    if(childNum || childNum===0){
				    	this.menuAddData.name=this.button[mainNum].sub_button[childNum].name
				    	if(this.button[mainNum].sub_button[childNum].type){
			    			this.menuAddData.type=this.button[mainNum].sub_button[childNum].type
							if(this.button[mainNum].sub_button[childNum].type=="view"){
								this.menuAddData.url=''
								this.menuAddData.url=this.button[mainNum].sub_button[childNum].url
							}else if(this.button[mainNum].sub_button[childNum].type=="click"){
								switch (this.button[mainNum].sub_button[childNum].types){
									case 'news':
						    		 	this.stopTextValue='1'
						    		 	this.menuImgText=false
										this.menuImgTextUrl=this.button[mainNum].sub_button[childNum].imgTextUrl
										this.menuVoice=true
										this.menuVideo=true
										this.menuImg=true
						    		    break;
						    		 case 'image':
						    		 	this.stopTextValue='2'
						    		 	this.menuImg=false
										this.menuImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.button[mainNum].sub_button[childNum].imgUrl
										this.menuVoice=true
										this.menuVideo=true
										this.menuImgText=true
						    		    break;
						    		 case 'voice':
						    		 	this.stopTextValue='3'
						    		 	this.menuVoice=false
										this.menuVoiceName=this.button[mainNum].sub_button[childNum].voiceName
										this.menuVideo=true
										this.menuImg=true
										this.menuImgText=true
						    		    break;
						    		 case 'video':
						    		 	this.stopTextValue='4'
						    		 	this.menuVideo=false
										this.menuVideoName=this.button[mainNum].sub_button[childNum].videoName
										this.menuImg=true
										this.menuVoice=true
										this.menuImgText=true
						    		    break;
						    		  default:
						    		  	this.menuImg=true
										this.menuVoice=true
										this.menuVideo=true
										this.menuImgText=true
						    		  
					    		}
							}else{
								this.menuAddData.type=this.button[mainNum].sub_button[childNum].type
							}
						}
				    }else{
					    this.menuAddData.name=this.button[mainNum].name
						if(this.button[mainNum].type){
			    			this.menuAddData.type=this.button[mainNum].type
							if(this.button[mainNum].type=="view"){
								this.menuAddData.url=''
								this.menuAddData.url=this.button[mainNum].url
							}else if(this.button[mainNum].type=="click"){
								switch (this.button[mainNum].types){
									case 'news':
						    		 	this.stopTextValue='1'
						    		 	this.menuImgText=false
										this.menuImgTextUrl=this.button[mainNum].imgTextUrl
										this.menuVoice=true
										this.menuVideo=true
										this.menuImg=true
						    		    break;
						    		 case 'image':
						    		 	this.stopTextValue='2'
						    		 	this.menuImg=false
										this.menuImgUrl=this.IMAGE_SERVER_HOST+'/material/view?material_src='+this.button[mainNum].imgUrl
										this.menuVoice=true
										this.menuVideo=true
										this.menuImgText=true
						    		    break;
						    		 case 'voice':
						    		 	this.stopTextValue='3'
						    		 	this.menuVoice=false
										this.menuVoiceName=this.button[mainNum].voiceName
										this.menuVideo=true
										this.menuImg=true
										this.menuImgText=true
						    		    break;
						    		 case 'video':
						    		 	this.stopTextValue='4'
						    		 	this.menuVideo=false
										this.menuVideoName=this.button[mainNum].videoName
										this.menuImg=true
										this.menuVoice=true
										this.menuImgText=true
						    		    break;
						    		  default:
						    		  	this.menuImg=true
										this.menuVoice=true
										this.menuVideo=true
										this.menuImgText=true
						    		  
					    		}
							}else{
								this.menuAddData.type=this.button[mainNum].type
							}
						}
		    		}
				    console.log(this.button[mainNum])
				    console.log(this.menuAddData)
				}
			},
		    async addMenu(value,num,type){
		    	this.subMenuNum=false
		    	this.menuNum=num
		    	if(type){
		    		this.menuAddName=value
		    		this.menuType=type
		    		this.menuFormType=type
		    		
		    		if(this.button[num].sub_button.length){
		    			this.submenuType=true
		    		}else{
		    			this.submenuType=false
		    		}
		    	}
		    	if(this.button.length==1){
		    		this.addMenuDisabled=true
    				this.button[0].width=135
		    		this.button[0].name="菜单名称"
		    		this.button[0].sub_button=[]
					this.button.push({
		    			width:135,
						name:"",
						type:"click",
						sub_button:[]
					})
		    	}else if(this.button.length==2){
		    		this.addMenuDisabled=true
		    			switch (num){
			    		 case 1:
			    		 	if(!value){
				    		 	this.button[0].width=90
						    	this.button[1].width=90
						    	this.button[1].name="菜单名称"
						    	this.button[1].sub_button=[]
								this.button.push({
					    			width:90,
									name:"",
									type:"click",
									sub_button:[]
					    		})
								this.addMenuDisabled=false
							}
			    		 break;
			    		  default:
			    		  this.addMenuDisabled=false
			    		  this.menuBinding(num)
			    		}
		    		
		    	}else if(this.button.length==3){
		    		this.addMenuDisabled=true
		    		switch (num){
		    		 case 2:
		    		 	if(!value){
		    		 		this.button[2].type="click"
			    		  	this.button[2].name="菜单名称"
				    		this.button[2].sub_button=[]
				    		this.addMenuDisabled=false
				    	}else{
				    		this.menuBinding(num)
				    	}
				    	this.addMenuDisabled=false
		    		  break;
		    		  default:
		    		  this.menuBinding(num)
		    		  this.addMenuDisabled=false
		    		}
		    	}
		    },
		    deleteMenu(){
		    	 this.$confirm('删除后'+this.menuAddName+'菜单下设置的内容将被删除', '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	if(this.subMenuNum || this.subMenuNum===0){
		        		this.button[this.menuNum].sub_button.splice(this.subMenuNum,1)
		        	}else{
			        	if(this.button.length==2){
			        		if(this.button[1].name){
			        			this.button.splice(this.menuNum,1)
			        			this.button.push({
									width:135,
									sub_button:[],
									name:''
								})
			        		}else{
			        			this.button=[{
									width:273,
									sub_button:[],
									name:'添加菜单'
								}]
			        		}
			        	}else if(this.button.length==3){
			        		if(this.button[2].name){
			        			this.button.splice(this.menuNum,1)
			        			this.button.push({
									width:90,
									sub_button:[],
									name:''
								})
			        		}else{
			        			this.button.splice(this.menuNum,1)
			        			this.button.splice(1,1)
			        			this.button[0].width=135
			        			this.button.push({
									width:135,
									sub_button:[],
									name:''
								})
			        		}
			        	}
			        }
		          this.menuFormType=false
		          this.$message({ type: 'success', message: '删除成功!' });
		        }).catch(() => {
		          this.$message({ type: 'info', message: '已取消删除' });          
		        });

		    },
		    async batchDelData(){
		    	if(this.publicIds.length){
		    		let result = await this.$confirm('确认删除吗？', '提示', {})
					if(result) {
			    		let list = await this.adminApi(NoPublicService).batchDelData(this.publicIds);
			    		if(list) {
							this.$message({message:"删除成功",type: 'success'})
						}
			    		this.getList(this.filters)
			    	}
		    	}else{
		    		this.$message({message:"请先选择公众号再删除",type: 'warning'})
		    	}
		    	
		    },
		    async delData(row){
		    	let result = await this.$confirm('确认删除该条数据吗？', '提示', {})
				if(result) {
		    		let list = await this.adminApi(NoPublicService).deleteData(row.id);
		    		if(list) {
						this.$message({message:"删除成功",type: 'success'})
					}
		    		this.getList(this.filters)
		    	}
		    },
			async getUpdate(type, row, para,fun) {
				this.formVisible = true
				let result = await this.$nextTick();
				if( result ) {
				    this.$refs.formFileds.resetFields();
			    	if(type) {
						this.saveType = 1
						if(this.exData) {
							this.exData.affairId = row.id
						}
						let list = await this.adminApi(NoPublicService).detailData(row.id);
						this.formData=Object.assign(this.formData, list)
						console.log(list)
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
			async getDetail(row){
				let list = await this.adminApi(NoPublicService).detailData(row.id);
				this.detailData=list
				this.detailVisible = true
				this.$nextTick(() => {
					this.adapt()
				})
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
							let data = await self.adminApi(NoPublicService).updateData(this.formData.id,para);
							console.log(data)
							if(data) {
								this.$message({message:"修改成功",type: 'success'})
							}
						}else{
							let para = Object.assign({}, this.formData);
							let data = await self.adminApi(NoPublicService).createData(para);
							if(data) {
								this.$message({message:"新增成功",type: 'success'})
							}
						}
						this.getList(this.filters)
						this.formVisible = false
					}
				}
			},
			async getAssignMaterial(mediaId,app_id=this.appId){
				let list = await this.adminApi(NoPublicService).getAssignMaterials(mediaId, app_id);
				if(list) {
				}
				console.log(list)
			},
			async imgTextSave(){
				let list = await this.adminApi(NoPublicService).imgTextSubmit(this.appId, this.addImgTextFilters);
				if(list) {
					this.$message({message:"新增成功",type: 'success'})
					this.addImgTextVisible=false
				}
				console.log(list)
			},
			async getList(fliters, search){
			    console.log(fliters);
				let [list, meta] = await this.adminApi(NoPublicService).getLists(fliters, search);
				this.meta = meta;
				this.selectData= list;
				for(var i in this.selectData){
					this.selectData[i].index=parseInt(i)+1
				}
				this.totalNum=this.meta.total
				if(this.totalNum > 0)
				    this.verify = true;
			},
			async getPollimg(){
				// let list = await this.adminApi(NoPublicService).polling();
				// if(list) {
				// 	clearInterval(this.interval);
				// 	this.$message({message:"已验证",type: 'success'})
				// 	this.detailData=list
				// }
				// console.log(list)
			},
			polling(){
				let that=this;
//				this.interval=setInterval(function(){
//					that.getPollimg()
//				},3000)
			}
		},
		filters: {
		
		},
		 created() {
		    this.filters['selected_appid'] = this.appInfo.id;
			this.getList({
				search: 'app_id:'+this.appInfo.wechat_app_id+";",
				searchField:'app_id',
				limit:1,
				page:1
			})
			this.getPollimg()
		}
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