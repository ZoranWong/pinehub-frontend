import ApiService from './ApiService';

export default class OrdersService extends ApiService {
    constructor(application) {
        super(application);
    }

    async list(page = 1, search = null, limit = 15) {
        let response = null;
        if (this.$application.needMock()) {
            response = await this.service('mock.orders').mock(page, search, limit);
        } else {
            //服务器交互代码
            response = await this.httpGet('orders', {
                page: page,
                limit: limit,
                searchJson: search
            }, 'trimRouteParameter');
        }
        let orders = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let excelUrl = await this.excelDownload(search);
        return [orders, totalNum, currentPage, totalPage, excelUrl];
    }

    async excelDownload(search = null) {
        let response = null;
        if (this.$application.needMock()) {
            response = await this.service('mock.orders').mock(search);
        } else {
            //服务器交互代码
            response = await this.download('/download/orders/xls', {searchJson: search});
        }
        console.log(response);
        return response;
    }
}
