import ApiService from './ApiService';
export default class MerchandisesService extends ApiService{
	constructor(application) {
		super(application);
	}

	async list(page = 1, search = null, limit = 15) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.merchandises').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('merchandises', {page: page, limit: limit, searchJson: search});
		}
		let merchandises = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		return [merchandises, totalNum, currentPage,  totalPage];
	}
	async create (projectId, merchandise) {
		let response = null;

		if(this.$application.needMock()) {
			response =  await this.service('mock.merchandise.create').mock(merchandise);
		} else {
			response = await this.header({'ProjectId': projectId}).httpPost(`merchandise`, merchandise);
		}

		return response.data;
	}

    async update (projectId, id, merchandise) {
        let response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.merchandise.create').mock(merchandise);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPut(`merchandise`, id, merchandise);
        }

        return response.data;
    }

	async show(id) {
		let response = await this.httpGet(`merchandise/${id}`);
		return response.data;
	}
}
