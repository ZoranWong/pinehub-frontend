import ApiService from './ApiService';
import Exception from '../exceptions/Exception';
import AdminApiService from './AdminApiService';
import Vue from 'vue';
export default class UserService extends ApiService{
	static host = "";
	static async getUserInfo(){
		//获取缓存用户数
		let $user = JSON.parse(localStorage.getItem('user'));
		if($user){
		 	return await(async function(){
		 		return Promise.resolve($user);
		 	})();
		}else{
			//服务器获取
			var response =  await this.get('/self/info');
			return response.data;
		}
	}
	static async getSelectedAppid(){
		return sessionStorage.getItem('shop') || ''
	}
	//用户统计服务接口      客户管理
	static Clients = {
		async createData(para){
			var response =  await UserService.post('/app',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UserService.get('/customers',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async setMember(para){
			var response =  await UserService.post('/app',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await UserService.del('/app',id);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await UserService.put('/app', id,para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await UserService.get(`/app/${id}`);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	//会员管理
	static Members = {
		async setMember(para){
			var response =  await UserService.post('/app',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UserService.get('/members',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		}
	}
	//积分管理
	static Integrals= {
		async createData(para){
			var response =  await UserService.post('/score-rule',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getListT(para){
			var response =  await UserService.get(`/general/score-rules`,para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UserService.get(`/special/score-rules`,para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await UserService.del('/score-rule',id);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await UserService.put('/app', id,para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await UserService.get(`/score-rule/${id}`);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	//会员卡
	static MemberCards= {
		async createData(para){
			var response =  await UserService.post('/member/card',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UserService.get('/member/cards',para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UserService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await UserService.del('/app',id);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await UserService.put('/member/card', id,para);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await UserService.get(`/member/card/${id}`);
			try {
				UserService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UserService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
}
