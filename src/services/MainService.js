import AdminApiService from './AdminApiService';
export default class MainService extends AdminApiService{
	//主页服务
	//创建应用
	static async createData(para){
		var response =  await MainService.post('/app',para);
		try {
			MainService.validate(response.data);
			var data = response.data.data;
			return  data;
		} catch (e) {
			MainService.exception.throwError(response.data.message, response.data.status_code);
			return false
		} finally {

		}
	}
	static async getLists(para){
		var response =  await MainService.get('/apps',para);
		try {
			MainService.validate(response.data);
			var data = response.data.data;
			return  [response.data.data, response.data.meta.pagination];
		} catch (e) {
			MainService.exception.throwError(response.data.message, response.data.status_code);
			return false
		} finally {

		}
	}
	static async deleteData (id) {
		var response =  await MainService.del('/app',id);
		try {
			MainService.validate(response.data);
			var data = response.data.data;
			return  data;
		} catch (e) {
			  MainService.exception.throwError(response.data.message, response.data.status_code);
			 return false;
		} finally {
			
		}
	}
	static async updateData (id,para) {
			var response =  await MainService.put('/app', id,para);
			try {
				MainService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 MainService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
	static async detailData (id) {
			var response =  await MainService.get(`/app/${id}`);
			try {
				MainService.validate(response.data);
				var data = response.data.data;
				return  data;
			} catch (e) {
				 MainService.exception.throwError(response.data.message, response.data.status_code);
				 return false;
			} finally {
				
			}
		}
}