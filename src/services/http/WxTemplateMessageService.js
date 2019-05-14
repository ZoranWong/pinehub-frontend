import ApiService from './ApiService';

export default class WxTemplateMessageService extends ApiService {
    constructor(app) {
        super(app);
    }

    async list(page = 1, search = null, limit = 10) {
        let response = null;

        let wx_type = this.$application.vueApp.$requestInput('wxType');

        if (this.$application.needMock()) {
            // TODO
            response = null;
        } else {
            if (wx_type === 'miniprogram') {
                response = await this.httpGet('wechat/wxopen/template/list', {
                    page: page,
                    limit: limit,
                    searchJson: search
                });
            }
            if (wx_type === 'officialAccount') {
                response = await this.httpGet('wechat/template/list', {
                    page: page,
                    limit: limit,
                    searchJson: search
                });
            }
        }

        let wxTemplateMessages = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination.current_page;
        let totalPage = pagination.total_pages;

        return [wxTemplateMessages, totalNum, currentPage, totalPage];
    }

    async syncStatusCheck(type) {
        let result = null;
        switch (type) {
            case "miniprogram" :
                result = await this.httpGet('wechat/wxopen/template/sync/check');
                break;
            case "official_account":
                result = await this.httpGet('wechat/template/sync/check');
                break;
        }
        return result;
    }

    async syncMiniProgramTemplateMessages() {
        return await this.httpGet('wechat/wxopen/template/sync');
    }

    async syncOfficialAccountTemplateMessages() {
        return await this.httpGet('wechat/template/sync');
    }
}