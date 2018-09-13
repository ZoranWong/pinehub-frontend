import ApiService from './ApiService';
export default class WechaMenuService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(page = 1, search = null, limit = 15) {
		let menus = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let pageCount = 0;
		let response = null;
		if(this.$application.mock()) {
			response =  await this.services('mock.wechatMenus').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('wechat/menus', {page: page, limit: limit, searchJson: search}, true);
		}
		menus = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		totalPage=pagination['totalPage'];
		currentPage = pagination['current_page'];
		pageCount = pagination['total_pages'];
		return [menus, totalNum, currentPage, totalPage, pageCount];
	}

  async show(id) {
		let response = null;
    if(this.$application.mock()) {
			response =  await this.services('wechatMenuMock').mock(id);
		}else{
			//服务器交互代码
			response = await this.httpGet('wechat/menu/' + id, null, true);
		}
    return response.data;
  }

  async syncMenu(id) {
		let response = null;
    if(this.$application.mock()) {
			response =  await this.services('wechatMenuSyncMock').mock(id);
		}else{
			//服务器交互代码
			response = await this.httpGet('wechat/menu/' + id + '/sync', null, true);
		}
    return response.data;
  }
}
