import ApiService from './ApiService';
export default class UpToCutActivitiesService extends ApiService{
    constructor(application) {
        super(application);
    }

    async list(page = 1, search = null, limit = 15) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.upToCutActivities').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('payment_activities/coupon', {page: page, limit: limit, searchJson: search});
        }
        let activities = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        return [activities, totalNum, currentPage,  totalPage];
    }

    async create(projectId, activity) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.activity.utc.create').mock(activity);
        } else {
            response = await this.header({'ProjectId': projectId}).httpPost(`payment_activity/coupon`, activity);
        }
        return response.data;
    }

    async show(id) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.activity.utc.show').mock();
        } else {
            response = await this.httpGet(`activity/utc/${id}`);
        }
        return response.data;
    }
}
