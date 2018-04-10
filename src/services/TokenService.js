import {CookieStorage} from "cookie-storage";

export default class TokenService {
    static canRefresh() {

    }

    static refresh() {

    }

    static getToken () {

    }

    static setToken (token, expires) {
        CookieStorage.setItem('token', token, {
            path: '/',
            domain: process.env.API_SERVER_HOST,
            expires: expires,
            secure: true
        });
    }
}