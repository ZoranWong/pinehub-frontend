import ApiService from './ApiService';
import Vue from 'vue';
export class AuthService extends ApiService{
	static host = Vue.AUTH_SERVER_HOST;

	static async getPublicKey(){
		var response =  await ApiService.get('/public/key');
		try {
			var data = response.data;
			return  data.public_key;
		} catch (e) {

		} finally {

		}
	}
}
