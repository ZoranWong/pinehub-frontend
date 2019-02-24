import ApiService from './ApiService';
export default class CustomersService extends ApiService{
    constructor(application) {
        super(application);
    }

    async list(page = 1, search = null, limit = 15) {
        let customers = null;
        let totalNum = 0;
        let totalPage = 0;
        let currentPage = 0;
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.customers').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('customers', {page: page, limit: limit, searchJson: search});
        }
        customers = response.data;
        let pagination = response.meta.pagination;
        totalNum = pagination.total;
        currentPage = pagination['current_page'];
        totalPage = pagination['total_pages'];
        return [customers, totalNum, currentPage,  totalPage];
    }
}
