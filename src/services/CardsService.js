import ApiService from './ApiService';
import Exception from '../exceptions/Exception';
import AdminApiService from './AdminApiService';
import Vue from 'vue';
export default class CardsService extends ApiService{
	
	//  优惠券
	static Coupons = {
		async createData(para){
			var response =  await CardsService.post('/discount/ticket',para);
			try {
				CardsService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				CardsService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await CardsService.get('/tickets',para);
			try {
				CardsService.errorThrow(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				CardsService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await CardsService.del('/ticket',id);
			try {
				CardsService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  CardsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await CardsService.put('/ticket', id,para);
			try {
				CardsService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 CardsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await CardsService.get(`/ticket/${id}`);
			try {
				CardsService.errorThrow(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 CardsService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	
}
