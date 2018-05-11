import ApiService from './ApiService';
export class AuthService extends ApiService{
	static host = process.env.AUTH_SERVER_HOST;
	
	static async getPublicKey(){
		return await ApiService.get('/public/key');
	}
}
