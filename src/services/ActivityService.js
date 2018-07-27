import ApiService from './ApiService';
import Exception from '../exceptions/Exception';
import Vue from 'vue';
export default class ActivityService extends ApiService{
	static host = '';
	static modules = [];
	static FullActivitys = {
		async getLists (para){
			var response =  await ActivityService.get('/order-gifts', para);
			try {
				ActivityService.validate(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteData (id) {
			var response =  await ActivityService.post('/order-gift',para);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await ActivityService.get(`/order-gift/${id}`);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await ActivityService.put('/order-gift', id,para);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createData (para) {
			var response =  await ActivityService.post(`/order-gift`,para);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//支付二维码
		
		//参数二维码
	}
	static PayActivitys = {
		async getLists (para){
			var response =  await ActivityService.get('/merchandises', para);
			try {
				ActivityService.validate(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteData (id) {
			var response =  await ActivityService.post('/merchandise',para);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await ActivityService.get(`/merchandise/${id}`);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id) {
			var response =  await ActivityService.put('/merchandise', id);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createData (para) {
			var response =  await ActivityService.post(`/merchandise`,para);
			try {
				ActivityService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ActivityService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	static module (module) { 
		return adminApiService.modules[module];
	}
}