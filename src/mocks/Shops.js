import Mock from './Mock';
export default class Shops extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data|15":[{
        "id|+1": 1,
        "country": "中国",
        "province": "@PROVINCE",
        "city": "@CITY",
        "county": "@COUNTY",
        "address": "@COUNTY(true)",
        "manager": {
            "id|+1": 1,
            "nickname": "@NAME",
            "real_name": "@NAME",
            "mobile": /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            "user_name": "@NAME"
        },
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
