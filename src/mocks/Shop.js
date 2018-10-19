import Mock from './Mock';
/* eslint-disable */
export default class Shop extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data":{
        "id|+1": 1,
        "manager_name": "@CWORD(3, 8)",
        "code": /^[A-Z]{2}\d{6}$/,
        "address": "@county(true)",
        "lat": "@float(1, 180)",
        "lng": "@float(1, 180)",
        "description": "@cparagraph(3, 4)",
        "manager_mobile": /^1(3|4|5|7|8)\d{9}$/,
        "city_id|+1": 1,
        "country_id": 1,
        "province_id|+1": 1,
        "county_id|+1": 1,
        "content": "@cparagraph(6, 10)",
        "name": "@CWORD(4, 10)",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }
    };
  }
}
