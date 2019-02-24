import ApiService from './ApiService';
export default class CategoriesService extends ApiService{
    constructor(application) {
        super(application);
    }

    async list(page = 1, search = null, limit = 15) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.categories').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('categories', {page: page, limit: limit, searchJson: search});
        }
        let categories = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let totalPage=pagination['totalPage'];
        let currentPage = pagination['current_page'];
        let pageCount = pagination['total_pages'];
        return [categories, totalNum, currentPage, totalPage, pageCount];
    }

    async create(projectId, category) {
        let response = await this.header({"ProjectId": projectId}).httpPost('category', category);
        return response.data;
    }
}
