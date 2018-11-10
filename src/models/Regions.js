import Model from './Model';
import _ from 'underscore';
export default class Regions extends Model {
    constructor(application) {
        super(application);
    }

    data() {
        this.dataMap = {
            provinces: [],
            currentProvinceId: null,
            cities: [],
            currentCityId: null,
            counties: [],
            currentCountyId: null
        };
        return this.dataMap;
    }

    computed() {
        return {
            provinces() {
                return this.provinces;
            },
            province() {
                return _.findWhere(this.provinces, {id: this.currentProvinceId});
            },
            cities() {
                return _.where(this.cities, {'province_id': this.currentProvinceId});
            },
            city() {
                return _.findWhere(this.cities, {'id': this.currentCityId});
            },
            counties() {
                return _.where(this.counties, {'city_id': this.currentCityId});
            },
            county() {
                return _.findWhere(this.counties, {'id': this.currentCountyId});
            }
        };
    }

    listeners() {
        this.addEventListener('append', function({list, key}, model) {
            let $this = this;
            _.each(list, function(item) {
                if(!_.findWhere($this[key], {'code': item['code']})) {
                    $this[key].push(item);
                }
            });
        });

        this.addEventListener('setCurrentProvince', function({provinceId}) {
            this.currentProvinceId = provinceId
        });

        this.addEventListener('setCurrentCity', function({cityId}) {
            this.currentCityId = cityId;
        });

        this.addEventListener('setCurrentCounty', function({countyId}) {
            this.currentCountyId = countyId;
        });
    }
}
