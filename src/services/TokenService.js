import {CookieStorage} from "cookie-storage";

export default class TokenService {
    static canRefresh() {

    }

    static refresh() {

    }

    static getToken () {

    }

    static setToken (token, expire) {
        CookieStorage.setItem('token', token, {
            path: '/',
            domain: pro
        });
    }
}