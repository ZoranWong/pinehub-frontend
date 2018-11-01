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
			response = await this.httpGet('shops', {page: page, limit: limit, searchJson: search});
		}
		shops = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [shops, totalNum, currentPage, totalPage];
	}

	async create(projectId, shop) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.shop.create').mock(shop);
		} else {
			response = await this.header({'ProjectId': projectId}).httpPost(`shop`, shop);
		}
		return response.data;
	}

	async update(projectId, shopId, shop) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.service('mock.shop.update').mock(shop);
		}else {
			response = await this.httpPut(`project/${projectId}/shop/${shopId}`, shop);
		}
		return response.data;
	}

	async show(projectId, shopId) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.shop.show').mock(shopId);
		} else {
			response = await this.header({'ProjectId': projectId}).httpGet(`shop/${shopId}`);
		}
		return response.data;
	}
}
