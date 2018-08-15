import ApiService from './ApiService';
export default class ShopsService extends ApiService{
	constructor(application) {
		super(application);
	}
	async shops(page = 1, search = null, limit = 15) {
		let shops = null;
		let totalNum = 0;
		let currentPage = 0;
		let pageCount = 0;
		let response = null;
		if(this.$application.mock()) {
			response =  await this.services('shopsMock').mock(page, search, limit);
		}else{
			//服务器交互代码
		}
		shops = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		pageCount = pagination['total_pages'];
		console.log(pageCount);
		return [shops, totalNum, currentPage, totalPage, pageCount];
	}
}
