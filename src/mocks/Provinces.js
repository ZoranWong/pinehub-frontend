import Mock from './Mock';
/* eslint-disable */
export default class Provinces extends Mock {
    constructor(application) {
        super(application);
        this.total = 150;
    }
    data() {
        return {
            "data|15":[{
                "id|+1": 1,
                "code": /\d{12}/,
                "name": "@PROVINCE",
                "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
                "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
            }]
        };
    }
}
