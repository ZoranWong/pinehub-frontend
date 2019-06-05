import ApiService from './ApiService';

export default class ExcelService extends ApiService {
    constructor(app) {
        super(app);
    }

    async export(projectId, key, query, search) {
        this.header('ProjectId', projectId);
        query['key'] = key;
        query['searchJson'] = search;
        return await this.download(`/export`, query);
    }
}