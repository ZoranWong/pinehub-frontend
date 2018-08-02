import ApiService from './ApiService';
import Exception from '../exceptions/ExceptionsHandler';
import Vue from 'vue';
export default class CouponService extends ApiService{
	//  优惠券
	static Coupons = {
		async createData(para){
			var response =  await CouponService.post('/discount/ticket',para);
			try {
				CouponService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				CouponService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async getLists(para){
			var response =  await CouponService.get('/tickets',para);
			try {
				CouponService.validate(response.data);
				var data = response.data.data;
				return  [response.data.data, response.data.meta.pagination];
			} catch (e) {
				CouponService.exception.throwError(response.data.message, response.data.status_code);
				return false
			} finally {
	
			}
		},
		async deleteData (id) {
			var response =  await CouponService.del('/ticket',id);
			try {
				CouponService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				  CouponService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async updateData (id,para) {
			var response =  await CouponService.put('/ticket', id,para);
			try {
				CouponService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 CouponService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		},
		async detailData (id) {
			var response =  await CouponService.get(`/ticket/${id}`);
			try {
				CouponService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 CouponService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	}
	
}
