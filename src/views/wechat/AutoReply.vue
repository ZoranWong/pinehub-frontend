<template>
	<div class="content-scroll">
		<div class="content-box" style="padding:20px 30px">
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
									<el-input v-model="stopAddData.content" type="textarea" autosize autofocus :maxlength="600"></el-input>
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
									<el-input v-model="followAddData.content" type="textarea" autofocus autosize :maxlength="600"></el-input>
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
		</div>
	</div>
</template>

<script>
/* eslint-disable */
	export default {
		name: 'WechatAutoReply',
	}
</script>

<style scoped>

</style>
