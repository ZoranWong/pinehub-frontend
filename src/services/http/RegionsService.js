import ApiService from './ApiService';
export default class RegionsService extends ApiService{
    constructor(application) {
        super(application);
    }

    async provinces() {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.provinces').mock();
        }else{
            response = await this.httpGet('provinces');
        }
        let provinces = response.data;
        return provinces;
    }

    async cities(provinceId) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.cities').mock(provinceId);
        }else{
            response = await this.httpGet(`province/${provinceId}/cities`);
        }
        let cities = response.data;
        return cities;
    }

    async counties(cityId) {
        let response = null;
        if(this.$application.needMock()) {
            response =  await this.service('mock.counties').mock(cityId);
        }else{
            response = await this.httpGet(`city/${cityId}/counties`);
        }
        let counties = response.data;
        return counties;
    }
}
