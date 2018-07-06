import ApiService from './ApiService';
import tokenService from "./TokenService";
import AdminApiService from './AdminApiService';
import Vue from 'vue';
//const md5 = require("./md5");
const md5 = require('js-md5')
export default class AuthService extends ApiService{
	 static host = '';
	 static publicKey = '';
	 
	 constructor() {
	 	super();
	 	console.log(Vue);
	    console.log(AuthService.host); // 42
	 }
	static async getPublicKey(){
		var response =  await this.get('/public/key');
		try {
			var data = response.data.data;
			return  data.public_key;
		} catch (e) {
			this.exception.throwError(response.data.message, response.data.status_code);
			return false
		} finally {

		}
	}
	static async login(mobile, password){
		password = md5(password + this.publicKey);
		var response =  await this.get('/auth', {mobile: mobile, password: password});
		try {
			var data = response.data;
			return  {user: data, token: data.meta.token};
		} catch (e) {
			return false
		} finally {

		}
	}
	static async logout(){
		var token=tokenService.getToken();
		var response =  await this.get('/logout', {token : token});
		try {
			var data = response.data;
			return  data;
		} catch (e) {
			this.exception.throwError(response.data.message, response.data.status_code);
			return false
		} finally {

		}
	}
}
