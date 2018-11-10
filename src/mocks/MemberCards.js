import Mock from './Mock';
/* eslint-disable */
export default class MemberCards extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data(page = 1, search = null, limit = 15) {
        return {
            "data|15":[{
                "id|+1": 1,
                "title": "@CWORD(3, 6)",
                "sync": "@boolean",
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
