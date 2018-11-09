import ApiService from './ApiService';
export default class ScoreRulesService extends ApiService{
	constructor(application) {
		super(application);
	}

	async list(page = 1, search = null, limit = 15) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.scoreRules').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('special/score/rules', {page: page, limit: limit, searchJson: search});
		}
		let rules = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		return [rules, totalNum, currentPage,  totalPage];
	}
	async generalRule() {
		let response = await this.httpGet('general/score/rule');
		return response.data;
	}

	async create(projectId, rule) {
		let response = await this.header({"ProjectId": projectId}).httpPost('score-rule', rule);
		return response.data;
	}

	async update(projectId, id, rule) {
		let response = await  this.header({"ProjectId": projectId}).httpPut(`score-rule`, id, rule);
		return response.data;
	}

    async show(projectId, id) {
        let response = await  this.header({"ProjectId": projectId}).httpGet(`score-rule/${id}`);
        return response.data;
    }
}
