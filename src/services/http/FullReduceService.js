import ApiService from './ApiService';
export default class FullReduceService extends ApiService{
	constructor(application) {
		super(application);
	}
	//组装搜索字段
	buildSearchStr(searchFields) {
		return {'status': searchFields['status']};
	}
}
