import ApiService from './ApiService';
export default class AppService extends ApiService{
	constructor(application) {
		super(application);
    this.gateway = application.env.gateways.api.auth;
	}
	async publicKey() {
    let response = await this.httpGet('public/key');
    // if(this.$application.mock()) {
    //   response =  await this.service('pulicKeyMock').mock(id);
    // }else{
    //   //服务器交互代码
    //   response = await this.httpGet('public/key');
    // }
    return response.data;
	}
}
