import Mock from './Mock';
/* eslint-disable */
export default class File extends Mock {
    constructor(application) {
        super(application);
    }
    data(files) {
        return {
            "data":{
                "id|+1": 1,
                "name": "@CWORD(16, 32)",
                "driver": "@NAME",
                "bucket": "@NAME",
                "endpoint": "@NAME",
                "mime_type": "@WORD(3, 5)",
                "extension": "@WORD(3, 5)",
                "src": "@IMAGE('125x125', '#f4f4f4')",
                "path": "@IMAGE('64x64','#FF6600', '')",
                "update_time": "@DATE(yyyy-MM-dd hh:mm:ss)"
            }
        };
    }
}
