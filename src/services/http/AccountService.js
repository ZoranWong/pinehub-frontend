import ApiService from './ApiService';
export default class AccountService extends ApiService {
  constructor(app) {
    super(app);
  }

  async signIn(username, password) {
    let response = null;
    if(this.$application.needMock()) {
      response =  await this.service('mock.account').mock(username, password);
    }else{
      //服务器交互代码
      response = await this.httpGet('login');
    }
    return response.data;
  }

  signUp(username, password) {
    console.log(username, password);
  }

  async publicKey() {
    let response = null;
    if(this.$application.needMock()) {
      response =  await this.service('pulicKeyMock').mock(id);
    }else{
      //服务器交互代码
      response = await this.httpGet('public/key');
    }
    return response.data;
  }

  accountInfo() {

  }
  setting() {

  }
}
