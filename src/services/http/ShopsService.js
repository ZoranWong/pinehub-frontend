import ApiService from './ApiService';
export default class ShopsService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(page = 1, search = null, limit = 15) {
		let shops = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.shops').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('shops', {page: page, limit: limit, searchJson: search});
		}
		shops = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [shops, totalNum, currentPage, totalPage];
	}
}
