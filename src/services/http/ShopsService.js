import ApiService from './ApiService';
export default class ShopsService extends ApiService{
    constructor (application) {
        super(application);
    }
    async list (page = 1, search = null, limit = 15) {
        let  response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.shops').mock(page, search, limit);
        }else{
            response = await this.httpGet('shops', {page: page, limit: limit, searchJson: search});
        }

        let shops = response.data;

        let pagination = response.meta.pagination;

        let totalNum = pagination.total;

        let currentPage = pagination['current_page'];

        let totalPage = pagination['total_pages'];

        return [shops, totalNum, currentPage, totalPage];
    }

    async create (projectId, shop) {
        let response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.shop.create').mock(shop);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPost(`shop`, shop);
        }

        return response.data;
    }

    async update (projectId, shopId, shop) {
        let response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.shop.update').mock(shop);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPut(`/shop`, shopId, shop);
        }

        return response.data;
    }

    async show (projectId, shopId) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.shop.show').mock(shopId);
        } else {
            response = await this.header({'ProjectId': projectId}).httpGet(`shop/${shopId}`);
        }
        return response.data;
    }

    async skuMerchandises (shopId, page = 1, search = null, limit = 15) {
        let  response = await this.httpGet(`shop/${shopId}/merchandises`, {page: page, limit: limit, searchJson: search});

        let skuMerchandises = response.data;

        let pagination = response.meta.pagination;

        let totalNum = pagination.total;

        let currentPage = pagination['current_page'];

        let totalPage = pagination['total_pages'];

        return [skuMerchandises, totalNum, currentPage, totalPage];
    }

    async addMerchandise (projectId, shopId, merchandise) {
        let response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.merchandise.create').mock(merchandise);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPost(`/shop/${shopId}/merchandise`, merchandise);
        }

        return response.data;
    }
}
