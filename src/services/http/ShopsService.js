import ApiService from './ApiService';
import Exception from '../exceptions/Exception';
import Vue from 'vue';
export default class ShopsService extends ApiService{
//	static host = '';
	static modules = [];
	static Shops = {
		async getLists (para){
			var response =  await ShopsService.get('/shops', para);
			try {
				ShopsService.validate(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteShop (id) {
			var response =  await ShopsService.post('/shop',para);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await ShopsService.get(`/shop/${id}`);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateShop (id) {
			var response =  await ShopsService.put('/shop', id);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createShop (para) {
			var response =  await ShopsService.post(`/shop`,para);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
		//支付二维码
		
		//参数二维码
	}
	static Areas = {
		async getCountries (){
			var response =  await ShopsService.get('/countries', {});
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getProvinces (countryId){
			var response =  await ShopsService.get(`/country/${countryId}/provinces`, {});
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getProvince (id){
			var response =  await ShopsService.get(`/province/${id}`, {});
			try {
				ShopsService.validate(response.data);
				var data = response.data;
				return  data;
			} catch (e) {
				ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getCities (provinceId){
			var response =  await ShopsService.get(`/province/${provinceId}/cities`, {});
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async getCounty (cityId){
			var response =  await ShopsService.get(`city/${cityId}/counties`, {});
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
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
			var response =  await ShopsService.get('/orders', para);
			try {
				ShopsService.validate(response.data);
				var data = response.data;
				return  [data.data, data.meta.pagination];
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async shipOrder (id,para) {
			var response =  await ShopsService.put(`/order/${id}/sent`,para);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async deleteShop (id) {
			var response =  await ShopsService.post('/shop',para);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await ShopsService.get(`/shop/${id}`);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateShop (id) {
			var response =  await ShopsService.put('/shop', id);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async createShop (para) {
			var response =  await ShopsService.post(`/shop`,para);
			try {
				ShopsService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 ShopsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
}