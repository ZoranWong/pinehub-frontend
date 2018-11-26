import ApiService from './ApiService';
export default class ActivityMerchandisesService extends ApiService{
    constructor(application) {
        super(application);
    }

    async list(activityId, page = 1, search = null, limit = 15) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.merchandises').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet(`new/merchandise/activity/${activityId}/merchandises`, {page: page, limit: limit, searchJson: search});
        }
        let merchandises = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        return [merchandises, totalNum, currentPage,  totalPage];
    }

    async addMerchandise (projectId, activityId, merchandise) {
        let response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.merchandise.create').mock(merchandise);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPost(`/new/merchandise/activity/${activityId}/merchandise`, merchandise);
        }

        return response.data;
    }

    async updateMerchanidse (projectId, activityId, id, merchandise) {
        let response = null;

        if(this.$application.needMock()) {
            response =  await this.service('mock.merchandise.create').mock(merchandise);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPut(`/new/merchandise/activity/${activityId}/merchandise`, id, merchandise);
        }

        return response.data;
    }

    async show(id) {
        let response = await this.httpGet(`merchandise/${id}`);
        return response.data;
    }
}
