import Mock from './Mock';
/* eslint-disable */
export default class Merchandises extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data|15":[{
        "id|+1": 1,
        "name": "@CWORD(4, 7)",
        "sell_price": "@float( 1, 5000, 1, 99 )",
        "stock_num|+12": 129,
        "sell_num|+1": 78,
        "visitor_num|+2": 10,
        "visit_time|+3": 20,
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
