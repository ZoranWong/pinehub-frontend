import Mock from './Mock';
/* eslint-disable */
export default class Projects extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(id) {
    return {
      "data": {
        "id|+1": 1,
        "name": "@NAME",
        "logo": "@image('125x125','#4A7BF7','Hello')",
        "qr_code": "@image('125x125','#FF6600','QRcode')",
        "contact_name": "@CWORD(3, 4)",
        "contact_phone_num": /^(135)\d{8}/,
        "shop_count": "@integer(10, 100)",
        "order_count": "@integer(100, 10000)",
        "new_user_count": "@integer(10, 100)",
        "refunding_order_count": "@integer(10, 100)",
        "active_user_count": "@integer(100, 1000)",
        "bind_wechat": "@boolean",
        "bind_mp": "@boolean",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }
    };
  }
}
