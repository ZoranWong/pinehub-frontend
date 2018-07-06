import ApiService from './ApiService';
import Exception from '../exceptions/Exception';
import AdminApiService from './AdminApiService';
import Vue from 'vue';
export default class NoPublicService extends AdminApiService{
	    static async getLists (para){
			var response =  await NoPublicService.get('/wechat/configs', para);
			try {
				NoPublicService.validate(response.data);
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	
		static async deleteData (id) {
			var response =  await NoPublicService.del('/wechat/config',id);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async batchDelData (para) {
			var response =  await NoPublicService.batchDel('/wechat/configs',para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async detailData (id) {
			var response =  await NoPublicService.get(`/wechat/config/${id}`);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async updateData (id,para) {
			var response =  await NoPublicService.put('/wechat/config', id,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async createData (para) {
			var response =  await NoPublicService.post(`/wechat/config`,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async addMenu (para) {
			var response =  await NoPublicService.post(`/wechat/menu`,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async releaseMenu (id) {
			var response =  await NoPublicService.get(`/wechat/menu/${id}/sync`);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		
		static async getMenuLists () {
			var response =  await NoPublicService.get(`/wechat/menus`);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		static async getMenu (id) {
			var response =  await NoPublicService.get(`/wechat/menu/${id}`);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//获取素材列表
		static async getMaterialsLists (app_id,types) {
			var response =  await NoPublicService.get(`/wechat/materials`,{app_id:app_id,type:types});
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//获取指定临时素材
		static async getAssignMaterials (mediaId,app_id) {
			var response =  await NoPublicService.get(`/wechat/material/${mediaId}`,{app_id:app_id});
			try {
				NoPublicService.validate(response.data);
				return  response.data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//添加素材
		static async addMaterials (type,app_id,para) {
			var response =  await NoPublicService.post(`/wechat/${type}/material?app_id=${app_id}`,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//获取指定公众号自动回复列表
		static async getReplyLists (app_id) {
			var response =  await NoPublicService.get('/wechat/auto_reply_messages', {app_id:app_id});
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//修改提交微信公众号自动回复数据
		static async replyUpdateData (id,para) {
			var response =  await NoPublicService.put(`/wechat/auto_reply_message/${id}`,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//添加微信公众号自动回复数据
		static async replyCreateData (para) {
			var response =  await NoPublicService.post(`/wechat/auto_reply_message`,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//永久图文素材保存
		static async imgTextSubmit (appid,para) {
			para['app_id'] = appid;
			var response =  await NoPublicService.post(`/wechat/material/article`,para);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	//轮询返回接口
	static async polling(){
		var response =  await NoPublicService.get(`/open-platform/auth/sure`);
			try {
				NoPublicService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 NoPublicService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
	}
}