import Mock from './Mock';
export default class Coupon extends Mock {
  constructor(application) {
    super(application);
    this.total = 100;
  }
  data(page = 1, search = null, limit = 10) {
    return {
      "data|10":[{
        "id|+1": 1,
        "title": "@NAME",
        "code": /\d{12}/,
        "qrCode": "@CITY",
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
