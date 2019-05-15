import ApiService from './ApiService';

export default class RechargeableCardService extends ApiService {
    constructor(app) {
        super(app);
    }

    async list(page = 1, search = null, limit = 10) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet('rechargeable_cards', {
                page: page,
                limit: limit,
                searchJson: search
            }, 'trimRouteParameter');
        }

        let rechargeableCards = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination.current_page;
        let totalPage = pagination.total_pages;

        return [rechargeableCards, totalNum, currentPage, totalPage];
    }

    async create(rechargeableCard) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpPost('rechargeable_cards', rechargeableCard);
        }

        return response;
    }

    async update(rechargeableCard) {
        let response = null;
        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpPut(`rechargeable_cards`, rechargeableCard.id, {
                status: rechargeableCard.status,
                is_recommend: rechargeableCard.is_recommend,
                on_sale: rechargeableCard.on_sale,
                sort: rechargeableCard.sort
            });
        }
        return response;
    }

    async delete(rechargeableCardId) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = this.httpDelete(`rechargeable_cards/${rechargeableCardId}`);
        }

        return response;
    }
}