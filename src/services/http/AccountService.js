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
            response = await this.httpPost('login', {mobile: username, password: password}, false);
        }

        return [response.data, response.meta['token']];
    }

    signUp(username, password) {
        console.log(username, password);
    }

    async publicKey() {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('pulicKeyMock').mock();
        }else{
            //服务器交互代码
            response = await this.httpGet('public/key', [], false);
        }
        return response.data;
    }

    accountInfo() {

    }
    setting() {

    }

    async refreshToken(token) {
        try{
            let response = await this.httpGet('refresh/token', {'token': token}, false);
            return response.data;
        }catch(error) {
            return false;
        }
    }
}
