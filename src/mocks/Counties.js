import Mock from './Mock';
/* eslint-disable */
export default class Counties extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data(cityId) {
        return {
            "data|15":[{
                "id|+1": 1,
                "code": /\d{12}/,
                "city_id": cityId,
                "name": "@COUNTY",
                "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
                "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
            }]
        };
    }
}
