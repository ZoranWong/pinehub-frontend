import Mock from './Mock';
/* eslint-disable */
export default class Shops extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data(page = 1, search = null, limit = 15) {
        return {
            "data|15":[{
                "id|+1": 1,
                "code": /\d{12}/,
                "country": "中国",
                "province": "@PROVINCE",
                "city": "@CITY",
                "county": "@COUNTY",
                "address": "@COUNTY(true)",

                "num": "@integer( 10, 100 )",
                "money": "@float( 1, 5000, 1, 99 )",
                "goods": "@integer( 10, 500 )",
                "turnover": "@float( 1, 6000, 1, 99 )",
                "sells": "@float( 1, 3000, 1, 99 )",
                "actual": "@float( 1, 2000, 1, 99 )",
                "shopTurnover": "@float( 1, 10000, 1, 99 )",

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
