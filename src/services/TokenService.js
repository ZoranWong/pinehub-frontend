import {CookieStorage} from "cookie-storage";

export default class TokenService {
    static canRefresh() {

    }
    static refresh() {

    }
    static getToken () {
    	let token=sessionStorage.getItem('token');
    	if(token){
    		token = JSON.parse(token);
    	}else{
    		return null;
    	}
		return token['token']
    }
    static setToken (token) {
        sessionStorage.setItem('token', JSON.stringify(token))
    }
}