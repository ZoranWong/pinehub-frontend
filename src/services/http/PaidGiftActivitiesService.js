import ApiService from './ApiService';
export default class PaidGiftActivitiesService extends ApiService{
    constructor(application) {
        super(application);
    }

    async list(page = 1, search = null, limit = 15) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.payGiftActivities').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('payment_activities/gift', {page: page, limit: limit, searchJson: search});
        }
        let activities = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        return [activities, totalNum, currentPage,  totalPage];
    }
}
