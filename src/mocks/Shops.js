import Mock from './Mock';
export default class Shops extends Mock {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      "data|+15":[{
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
             "total": 20,
             "count": 1,
             "per_page": 15,
             "current_page|1-2": 1,
             "total_pages": 2,
             "links":[]
         }
      }
    };
  }
}
