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
		if(this.$application.needMock()) {
			response =  await this.service('mock.projects').mock(page, search, limit);
		}else{
			//服务器交互代码
			response =  await this.httpGet('projects', {page: page, limit: limit, searchJson: search});
		}
		shops = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		pageCount = pagination['total_pages'];
		return [shops, totalNum, currentPage, pageCount];
	}

	async delete(id) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.delete').mock(id);
		}else{
			//服务器交互代码
			response =  await this.httpDelete(`project/${id}`);
		}
		return response.data['delete_count'] > 0;
	}

	async create(name, logo, contactName, contactPhoneNum) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.project').mock();
		}else{
			//服务器交互代码
			response =  await this.httpPost(`project`, {name: name, logo: logo, contact_name: contactName, contact_phone_num: contactPhoneNum});
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
			response =  await this.httpPost (`project/${id}`, data);
		}
		return response.data;
	}
}
