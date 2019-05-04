import ApiService from './ApiService';
export default class WechaMenuService extends ApiService{
    constructor(application) {
        super(application);
    }
    async list(page = 1, search = null, limit = 15) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.wechatMenus').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('wechat/menus', {page: page, limit: limit, searchJson: search});
        }
        let menus = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let totalPage=pagination['totalPage'];
        let currentPage = pagination['current_page'];
        let pageCount = pagination['total_pages'];
        return [menus, totalNum, currentPage, totalPage, pageCount];
    }

    async show(id) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('wechatMenuMock').mock(id);
        }else{
            //服务器交互代码
            response = await this.httpGet('wechat/menu/' + id);
        }
        return response.data;
    }

    async create(projectId, menus, name = null) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('wechatMenuSyncMock').mock(menus);
        }else{
            //服务器交互代码
            response = await this.header({'ProjectId': projectId}).httpPost('wechat/menu', {menus: {button: menus}});
        }
        return response.data;
    }

    async update(projectId, id, menus, name = null) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('wechatMenuSyncMock').mock(menus);
        }else{
            //服务器交互代码
            response = await this.header({'ProjectId': projectId}).httpPut('wechat/menu', id, {menus: {button: menus}});
        }
        return response.data;
    }

    async syncMenu(projectId, id) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('wechatMenuSyncMock').mock(id);
        }else{
            //服务器交互代码
            response = await this.header({"ProjectId": projectId}).httpGet('wechat/menu/' + id + '/sync');
        }
        return response.data;
    }
}
