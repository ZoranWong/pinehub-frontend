import Mock from './Mock';
/* eslint-disable */
export default class Materials extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data(page = 1, search = null, limit = 15) {
        return {
            "data|12":[{
                "title": "@CWORD(4, 7)",
                "introduction": "@CWORD(16, 32)",
                "media_id|+1": 12,
                "url": "@IMAGE('64x64','#FF6600', '')",
                "update_time": "@DATE(yyyy-MM-dd hh:mm:ss)"
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
