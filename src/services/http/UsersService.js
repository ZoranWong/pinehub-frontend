import ApiService from './ApiService';
import Exception from '../exceptions/ExceptionsHandler';
import Vue from 'vue';
export default class UsersService extends ApiService{
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
			var response =  await UsersService.post('/app',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UsersService.get('/customers',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async setMember(para){
			var response =  await UsersService.post('/app',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await UsersService.del('/app',id);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await UsersService.put('/app', id,para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await UsersService.get(`/app/${id}`);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	//会员管理
	static Members = {
		async setMember(para){
			var response =  await UsersService.post('/app',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UsersService.get('/members',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		}
	}
	//积分管理
	static Integrals= {
		async createData(para){
			var response =  await UsersService.post('/score-rule',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getListT(para){
			var response =  await UsersService.get(`/general/score-rules`,para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UsersService.get(`/special/score-rules`,para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await UsersService.del('/score-rule',id);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await UsersService.put('/app', id,para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await UsersService.get(`/score-rule/${id}`);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	//会员卡
	static MemberCards= {
		async createData(para){
			var response =  await UsersService.post('/member/card',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await UsersService.get('/member/cards',para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				UsersService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await UsersService.del('/app',id);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await UsersService.put('/member/card', id,para);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await UsersService.get(`/member/card/${id}`);
			try {
				UsersService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 UsersService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
}
