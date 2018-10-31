import ApiService from './ApiService';
export default class ProjectsService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(page = 1, search = null, limit = 20) {
		let shops = null;
		let totalNum = 0;
		let currentPage = 0;
		let pageCount = 0;
		let response = null;
		try{
			if(this.$application.needMock()) {
				response =  await this.service('mock.projects').mock(page, search, limit);
			}else{
				//服务器交互代码
				response =  await this.httpGet('apps', {page: page, limit: limit, searchJson: search});
			}
			shops = response.data;
			let pagination = response.meta.pagination;
			totalNum = pagination.total;
			currentPage = pagination['current_page'];
			pageCount = pagination['total_pages'];
			return [shops, totalNum, currentPage, pageCount];
		}catch(error) {
			this.$application.$error(error.data.message);
			this.tokenExpired(error);
			throw new Error();
		}
	}

	async show(id) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.project').mock(id);
		}else{
			//服务器交互代码
			console.log('project', id);
			response =  await this.header({'ProjectId': id}).httpGet(`app/${id}`);
		}
		return response.data;
	}

	async delete(id) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.delete').mock(id);
		}else{
			//服务器交互代码
			response =  await this.httpDelete(`app/${id}`);
		}
		return response.data['delete_count'] > 0;
	}

	async create(name, logo, contactName, contactPhoneNum) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.project').mock();
		}else{
			//服务器交互代码
			response =  await this.httpPost(`app`, {name: name, logo: logo, contact_name: contactName, contact_phone_num: contactPhoneNum});
		}
		return response.data;
	}

  async sevenDaysCount(id) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.sevenDaysCount').mock(id);
		}else{
			//服务器交互代码
			response =  await this.header({'ProjectId': id}).httpGet(`app/statistics/seven_days`);
		}
		return response.data;
	}

	async makeSure() {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.project').mock();
		}else{
			//服务器交互代码
			response =  await this.httpPut(`project`);
		}
		return response.data;
	}

	async update (id, {name = null, logo = null, contactName = null, contactPhoneNum = null}) {
		let response = null;
		if(this.$application.needMock ()) {
			response =  await this.service ('mock.project').mock (id);
		}else{
			//服务器交互代码
			let data = {};
			if (name) data['name'] = name;
			if (logo) data['logo'] = logo;
			if (contactName) data['contact_name'] = contactName;
			if (contactPhoneNum) data['contact_phone_num'] = contactPhoneNum;
			response =  await this.httpPut(`app`, id, data);
		}
		return response.data;
	}

	async addMpConfig(projectId, config) {
		let response = null;
		if(this.$application.needMock ()) {
			response =  await this.service ('mock.mpConfig').mock (id);
		}else{
			//服务器交互代码
			response =  await this.header({'ProjectId': projectId}).httpPost (`app/mp/config`, config);
		}
		return response.data;
	}

	async updateMpConfig(projectId, id, config) {
		let response = null;
		if(this.$application.needMock ()) {
			response =  await this.service ('mock.mpConfig').mock (id);
		}else{
			//服务器交互代码
			response =  await this.header({'ProjectId': projectId}).httpPut (`app/mp/config`, id, config);
		}
		return response.data;
	}
}
