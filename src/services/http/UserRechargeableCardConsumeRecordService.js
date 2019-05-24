import ApiService from './ApiService';

export default class UserRechargeableCardConsumeRecordService extends ApiService {
    constructor(app) {
        super(app);
    }

    async list(page = 1, search = null, limit = 10) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet('rechargeable_cards/records', {
                page: page,
                limit: limit,
                searchJson: search
            }, 'trimRouteParameter');
        }

        let consumeRecords = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination.current_page;
        let totalPage = pagination.total_pages;

        return [consumeRecords, totalNum, currentPage, totalPage];
    }

    async statistics() {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`rechargeable_cards/records/statistics`);
        }

        return response.data;
    }
}