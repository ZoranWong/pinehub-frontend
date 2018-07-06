import {ApiService} from 'AuthService';

export default class TokenService extends ApiService {
    static getToken () {
      	let token = sessionStorage.getItem('token');
      	if(token){
      		token = JSON.parse(token);
      		let now = Date.now();
      		let ttl = new Date(token['ttl']['date']);
      		let refreshTTL = new Date(token['refresh_ttl']['date']);
      		if(ttl.getTime() > now.getTime() && refreshTTL.getTime() < now.getTime()) {
      		    token = this.refreshToken(token['token']);
      		    this.setToken(token);
      		    return  token['token'];
      		}else{
                return false;
      		}

      	}else{
      		return false;
      	}
      	return token['token'];
    }
    static setToken (token) {
        sessionStorage.setItem('token', JSON.stringify(token))
    }

    static async refreshToken(token) {
        let response = await this.get('/token-refresh',{'token' : token});
        try {
            TokenService.validate(response.data);
            var data = response.data.data;
            return  data;
        } catch (e) {
            TokenService.exception.throwError(response.data.message, response.data['status_code']);
            return false
        } finally {

        }
    }
}
