import ApiService from './ApiService';
import Exception from '../exceptions/Exception';
import Vue from 'vue';
export default class MerchandisesService extends ApiService{
	static host = '';
	static modules = [];
	static Merchandises = {
		async getLists (para){
			var response =  await MerchandisesService.get('/merchandises', para);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteData (id) {
			var response =  await MerchandisesService.post('/merchandise',para);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await MerchandisesService.get(`/merchandise/${id}`);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await MerchandisesService.put('/merchandise', id,para);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createData (para) {
			var response =  await MerchandisesService.post(`/merchandise`,para);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		//商品分组添加
		async createGroup (para) {
			var response =  await MerchandisesService.post(`/category`,para);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		//商品分组列表
		async getGroups (para){
			var response =  await MerchandisesService.get('/categories', para);
			try {
				MerchandisesService.validate(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 MerchandisesService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	static module (module) { 
		return adminApiService.modules[module];
	}
}