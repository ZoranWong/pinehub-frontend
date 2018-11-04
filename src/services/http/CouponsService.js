import ApiService from './ApiService';
export default class CouponsService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(page = 1, search = null, limit = 10) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.tickets').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('tickets', {page: page, limit: limit, searchJson: search});
		}
		let shops = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		return [shops, totalNum, currentPage, totalPage];
	}
}
