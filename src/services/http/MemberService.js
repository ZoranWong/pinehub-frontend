import ApiService from './ApiService';
export default class MemberService extends ApiService{
    constructor(application) {
        super(application);
    }
    async list(page = 1, search = null, limit = 15) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.members').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('members', {page: page, limit: limit, searchJson: search});
        }
        let members = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        return [members, totalNum, currentPage,  totalPage];
    }
}
