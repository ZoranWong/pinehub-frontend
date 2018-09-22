import Mock from './Mock';
/* eslint-disable */
export default class ScoreRules extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data|15":[{
        "id|+1": 1,
        "order_amount": "@float(100, 500, 0, 99)",
        "order_count": "@integer(10, 100)",
        "score": "@integer(1, 20)",
        "total_recieved_score": "@integer(100, 200)",
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
