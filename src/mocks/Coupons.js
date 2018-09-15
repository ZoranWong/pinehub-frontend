import Mock from './Mock';
/* eslint-disable */
export default class Coupons extends Mock {
  constructor(application) {
    super(application);
    this.total = 100;
  }
  data(page = 1, search = null, limit = 10) {
    return {
      "data|15":[{
        "id|+1": 1,
        "title": "@NAME",
        "code": /\d{12}/,
        "use_rate": "@float( 0, 0.9999, 0, 99 )",
        "type": "@CITY",
        "is_publish": "@boolean(1, 9, true)",
        "issued_num": "@integer( 50, 500 )",
        "stock_num": "@integer( 100, 100000 )",
        "received_num": "@integer( 20, 200 )",
        "use_num": "@integer( 10, 100 )",
        "end_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }],
      "meta": {
        "pagination":{
             "total": this.total,
             "count": 1,
             "per_page": limit,
             "current_page": page,
             "total_pages": Math.ceil(this.total / limit),
             "links":[]
         }
      }
    };
  }
}
