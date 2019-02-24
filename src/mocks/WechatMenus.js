import Mock from './Mock';
/* eslint-disable */
export default class WechaMenus extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data(page = 1, search = null, limit = 15) {
        let data = `data|${limit}`;
        let rule = {
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
        rule[data] = [{
            "id|+1": 1,
            "name": "@CWORD(4, 7)",
            "menus|1-3":[
                {
                    'id|+1': 1,
                    'name': "@CWORD(3, 6)"
                }
            ],
            "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
            "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
        }];
        return rule;
    }
}
