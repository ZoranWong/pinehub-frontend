import ApiService from './ApiService';
export default class CategoriesService extends ApiService{
	constructor(application) {
		super(application);
	}

	async list(page = 1, search = null, limit = 15) {
		let categories = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let pageCount = 0;
		let response = null;
		if(this.$application.mock()) {
			response =  await this.services('mock.categories').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('categories', {page: page, limit: limit, searchJson: search});
		}
		categories = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		totalPage=pagination['totalPage'];
		currentPage = pagination['current_page'];
		pageCount = pagination['total_pages'];
		return [categories, totalNum, currentPage, totalPage, pageCount];
	}
}
