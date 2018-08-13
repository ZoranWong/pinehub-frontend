import ApiService from './ApiService';
export default class ShopsService extends ApiService{
	constructor(application) {
		super(application);
	}
	async shops() {
		if(this.$application.mock()) {
			return await this.services('shopsMock').mock();
		}
	}
}
