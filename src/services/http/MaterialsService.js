import ApiService from './ApiService';
export default class MaterialsService extends ApiService{
    constructor(application) {
        super(application);
    }
    async list(page = 1, search = null, limit = 10) {
        let materials = null;
        let totalNum = 0;
        let currentPage = 0;
        let totalPage = 0;
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.materials').mock(page, search, limit);
        }else{
            //服务器交互代码
            response = await this.httpGet('materials', {page: page, limit: limit, searchJson: search});
        }
        materials = response.data;
        let pagination = response.meta.pagination;
        totalNum = pagination.total;
        currentPage = pagination['current_page'];
        totalPage = pagination['total_pages'];
        return [materials, totalNum, currentPage, totalPage];
    }

    async uploadMaterial(appId, type, fileField, file, title = null, introduction = null) {
        let response = null;
        let request = new FormData();
        request.append('app_id', appId);
        request.append(fileField, file);
        request.append('file_field', fileField);
        if(title)
            request.append('title', title);
        if(introduction)
            request.append('introduction', introduction);
        if(this.$application.needMock()) {
            response =  await this.service('mock.material.upload').mock(request);
        }else{
            //服务器交互代码
            response = await this.httpPost(`${type}/material`, request);
        }
        return response.data;
    }
}
