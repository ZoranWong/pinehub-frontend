import ApiService from './ApiService';

export default class UserTemplateMessageService extends ApiService {
    constructor(props) {
        super(props);
    }

    async list(page = 1, search = null, limit = 10) {
        let response;
        let parentTemplateId = this.$application.vueApp.$requestInput('wxTemplateId');

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet('wechat/wxopen/template/custom/' + parentTemplateId, {
                page: page,
                limit: limit,
                searchJson: search,
            });
        }

        let userTemplateMessages = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination.current_page;
        let totalPage = pagination.total_pages;

        return [userTemplateMessages, totalNum, currentPage, totalPage];
    }

    async create(userTemplateMessage) {
        let response;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpPost('wechat/wxopen/template/custom', userTemplateMessage);
        }

        return response.data;
    }

    async update(userTemplateMessage) {
        let response;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpPut('wechat/wxopen/template/custom', userTemplateMessage.id, userTemplateMessage);
        }

        return response.data;
    }

    async delete(templateId) {
        let response;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpDelete('wechat/wxopen/template/custom', templateId);
        }

        return response;
    }
}