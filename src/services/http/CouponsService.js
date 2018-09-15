import ApiService from './ApiService';
export default class CouponsService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(page = 1, search = null, limit = 10) {
		let shops = null;
		let totalNum = 0;
		let currentPage = 0;
		let totalPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.coupons').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('coupons', {page: page, limit: limit, searchJson: search});
		}
		shops = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [shops, totalNum, currentPage, totalPage];
	}
}
