import ApiService from './AuthService';
export default class TokenService extends ApiService {
    static async getToken () {
      	let token = await this.asyncToken();
      	if(!!token){
      		let now = Date.now();
      		let ttl = new Date(token['ttl']['date']);
      		let refreshTTL = new Date(token['refresh_ttl']['date']);
      		if(ttl.getTime() < now && refreshTTL.getTime() > now) {
      			console.log('before refresh', token);
      		    token = await this.refreshToken(token['token']);
      		    this.setToken(token);
      		    console.log('after refresh', token);
      		    return  token['token'];
      		}else if(now > refreshTTL.getTime()){
                return false;
      		}

      	}else{
      		return false;
      	}
      	return token['token'];
    }
    static asyncToken(){
    	let token = sessionStorage.getItem('token');
      token = JSON.parse(token);
      return new Promise(function(resolve) {
        return resolve(token);
      }).then(function (token) {
        return  token;
      });
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
