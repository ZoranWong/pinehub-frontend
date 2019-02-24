import Mock from './Mock';
/* eslint-disable */
export default class Members extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data(page = 1, search = null, limit = 15) {
        return {
            "data|15":[{
                "id|+1": 1,
                "nickname": "@CWORD(4, 7)",
                "mobile": /^(135)\d{9}$/,
                "card": "@CWORD(3, 6)",
                "orders_count": "@integer( 1, 1000)",
                "score": "@integer(1, 1000)",
                "total_score": "@integer(1, 1000)",
                "can_use_score": "@integer(1, 100)",
                "sex": "MALE",
                "is_member": "@boolean",
                "channel": "@integer(0, 2)",
                "tags|0-4": [
                    "@CWORD(3, 6)"
                ],
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
