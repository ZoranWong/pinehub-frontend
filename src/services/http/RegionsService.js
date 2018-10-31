import ApiService from './ApiService';
export default class RegionsService extends ApiService{
	constructor(application) {
		super(application);
	}

	async provinces() {
		let provinces = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.provinces').mock();
		}else{
			response = await this.httpGet('provinces');
		}
		provinces = response.data;
		return provinces;
	}

  async cities(provinceId) {
		let cities = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.cities').mock(provinceId);
		}else{
			response = await this.httpGet(`province/${provinceId}/cities`);
		}
		cities = response.data;
		return cities;
	}

  async counties(cityId) {
		let counties = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.counties').mock(cityId);
		}else{
			response = await this.httpGet(`city/${cityId}/counties`);
		}
		counties = response.data;
		return counties;
	}
}
