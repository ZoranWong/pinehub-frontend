import Mock from './Mock';
/* eslint-disable */
export default class FullReduce extends Mock {
  constructor(application) {
    super(application);
    this.total = 100;
  }
  data(page = 1, search = null, limit = 10) {
    return {
      "data|15":[{
        "id|+1": 1,
        "name": "@NAME",

        "num": "@integer( 10, 100 )",
        "number": "@integer( 10, 50 )",

        "get_limit": "@integer( 1,3 )",
        "pays": "@float( 1, 100, 1, 99 )",

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
