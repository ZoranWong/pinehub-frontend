import ApiService from './ApiService';
import Vue from 'vue';
export default class AdminApiService extends ApiService{
	static host = '';
	static modules = [];
	static Shops = {
		async getLists (para){
			var response =  await AdminApiService.get('/shops', para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteShop (id) {
			var response =  await AdminApiService.post('/shop',para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await AdminApiService.get(`/shop/${id}`);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateShop (id) {
			var response =  await AdminApiService.put('/shop', id);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createShop (para) {
			var response =  await AdminApiService.post(`/shop`,para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	static Areas = {
		async getCountries (){
			var response =  await AdminApiService.get('/countries', {});
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getProvinces (countryId){
			var response =  await AdminApiService.get(`/country/${countryId}/provinces`, {});
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getProvince (id){
			var response =  await AdminApiService.get(`/province/${id}`, {});
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data;
				return  data;
			} catch (e) {
				AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getCities (provinceId){
			var response =  await AdminApiService.get(`/province/${provinceId}/cities`, {});
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getCounty (cityId){
			var response =  await AdminApiService.get(`city/${cityId}/counties`, {});
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	
	static module (module) { 
		return adminApiService.modules[module];
	}
	
	static Orders = {
		async getLists (para){
			var response =  await AdminApiService.get('/orders', para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async shipOrder (id,para) {
			var response =  await AdminApiService.put(`/order/${id}/sent`,para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteShop (id) {
			var response =  await AdminApiService.post('/shop',para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await AdminApiService.get(`/shop/${id}`);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateShop (id) {
			var response =  await AdminApiService.put('/shop', id);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createShop (para) {
			var response =  await AdminApiService.post(`/shop`,para);
			try {
				AdminApiService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 AdminApiService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
}