import ApiService from './ApiService';
import Exception from '../../exceptions/ExceptionsHandler';
import Vue from 'vue';
export default class WechatService extends ApiService{
	    static async getLists (para){
			var response =  await WechatService.httpGet('/wechat/configs', para);
			try {
				WechatService.validate(response.data);
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	
		static async DeleteData (id) {
			var response =  await WechatService.httpDelete('/wechat/config',id);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async batchDelData (para) {
			var response =  await WechatService.batchDel('/wechat/configs',para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async detailData (id) {
			var response =  await WechatService.httpGet(`/wechat/config/${id}`);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async updateData (id,para) {
			var response =  await WechatService.httpPut('/wechat/config',id,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async createData (para) {
			var response =  await WechatService.httpPost(`/wechat/config`,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async addMenu (para) {
			var response =  await WechatService.httpPost(`/wechat/menu`,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async releaseMenu (id) {
			var response =  await WechatService.httpGet(`/wechat/menu/${id}/sync`);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async getMenuLists () {
			var response =  await WechatService.httpGet(`/wechat/menus`);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		static async getMenu (id) {
			var response =  await WechatService.httpGet(`/wechat/menu/${id}`);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//获取素材列表
		static async getMaterialsLists (app_id,types) {
			var response =  await WechatService.httpGet(`/wechat/materials`,{app_id:app_id,type:types});
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//获取指定临时素材
		static async getAssignMaterials (mediaId,app_id) {
			var response =  await WechatService.httpGet(`/wechat/material/${mediaId}`,{app_id:app_id});
			try {
				WechatService.validate(response.data);
				return  response.data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//添加素材
		static async addMaterials (type,app_id,para) {
			var response =  await WechatService.httpPost(`/wechat/${type}/material?app_id=${app_id}`,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//获取指定公众号自动回复列表
		static async getReplyLists (app_id) {
			var response =  await WechatService.httpGet('/wechat/auto_reply_messages', {app_id:app_id});
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//修改提交微信公众号自动回复数据
		static async replyUpdateData (id,para) {
			var response =  await WechatService.httpPut(`/wechat/auto_reply_message`,id,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//添加微信公众号自动回复数据
		static async replyCreateData (para) {
			var response =  await WechatService.httpPost(`/wechat/auto_reply_message`,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//永久图文素材保存
		static async imgTextSubmit (appid,para) {
			para['app_id'] = appid;
			var response =  await WechatService.httpPost(`/wechat/material/article`,para);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	//轮询返回接口
	static async polling(){
		var response =  await WechatService.httpGet(`/open-platform/auth/sure`);
			try {
				WechatService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 WechatService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
	}
}