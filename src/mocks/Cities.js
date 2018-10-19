import Mock from './Mock';
/* eslint-disable */
export default class Cities extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(provinceId) {
    return {
      "data|15":[{
        "id|+1": 1,
        "code": /\d{12}/,
        "province_id": provinceId,
        "name": "@CITY",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }]
    };
  }
}
