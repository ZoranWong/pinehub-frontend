import ApiService from './ApiService';

export default class UserTemplateWithOfficialAccountService extends ApiService {
    constructor(props) {
        super(props);
    }

    async list(page = 1, search = null, limit = 10) {
        let response;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`wechat/wxopen/template/custom/official_account`, {
                page: page,
                limit: limit,
                searchJson: search
            });
        }

        let userTemplateMessages = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination.current_page;
        let totalPage = pagination.total_pages;

        return [userTemplateMessages, totalNum, currentPage, totalPage];
    }

}