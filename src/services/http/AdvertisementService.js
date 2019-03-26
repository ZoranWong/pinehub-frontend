import ApiService from './ApiService';

export default class AdvertisementService extends ApiService {
    constructor(application) {
        super(application);
    }

    // 服务层中间件
    initServiceMiddleware() {

    }

    async list(page = 1, search = null, limit = 10) {
        let response = null;
        if (this.$application.needMock()) {
            response = await this.service('mock.advertisement').mock(page, search, limit);
        } else {
            response = await this.httpGet('advertisements', {
                page: page,
                limit: limit,
                searchJson: search
            }, 'trimRouteParameter');
        }
        let advertisements = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination.current_page;
        let totalPage = pagination.total_pages;

        return [advertisements, totalNum, currentPage, totalPage];
    }

    async create(projectId, advertisementInfo) {
        let response = null;

        if (this.$application.needMock()) {
            response = await this.service('mock.advertisement').mock();
        } else {
            response = await this.header({'ProjectId': projectId}).httpPost(`advertisement`, advertisementInfo);
        }

        let advertisement = response.data;

        return advertisement;
    }

    async update(projectId, advertisementId, params) {
        let response = null;

        if (this.$application.needMock()) {
            //
        } else {
            response = await this.header({'ProjectId': projectId}).httpPut('advertisement', advertisementId, params);
        }

        return response.data;
    }

    async disable(projectId, advertisementId) {
        return await this.update(projectId, advertisementId, {status: 3});
    }

    async enable(projectId, advertisementId) {
        return await this.update(projectId, advertisementId, {status: 1});
    }
}