import Mock from './Mock';
/* eslint-disable */
export default class Projects extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(page = 1, search = null, limit = 20) {
    console.log('mock projects');
    return {
      "data|12":[{
        "id|+1": 1,
        "name": "@NAME",
        "logo": "@image('125x125','#4A7BF7','Hello')",
        "qr_code": "@image('125x125','#FF6600','QRcode')",
        "contact_name": "@CWORD(3, 4)",
        "contact_phone_num": /^(135)\d{8}/,
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
