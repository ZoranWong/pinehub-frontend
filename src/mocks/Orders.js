import Mock from "./Mock";
/* eslint-disable */
export default class Orders extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data|15":[{
        "id|+1": 1,
        "code": /\d{12}/,
        "pay_type": "WECHAT_PAY",
        "type": "@integer(0, 4)",
        "transaction_id": /\d{16}/,
        "status": "@integer(0, 8)",
        "paid_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "payment_amount": "@float( 1, 5000, 0, 99 )",
        "total_amount": "@float( 1, 5000, 1, 99 )",
        "discount_amount": "@float( 1, 5000, 1, 99 )",
        "quality": "@integer(1, 1000)",
        "order_items|3": [{
          "id|+1": 1,
          "code": /\d{12}/,
          "merchandise_id|+1": 12,
          "merchandise_name": "@NAME",
          "merchandise_image": "@IMAGE('64x64', '#4A7BF7', 'Hello')",
          "sell_price": "@float( 1, 5000, 1, 99 )",
          "quality": "@integer(1, 100)",
          "payment_amount": "@float( 1, 5000, 0, 99 )",
          "total_amount": "@float( 1, 5000, 1, 99 )",
          "discount_amount": "@float(1, 100, 1, 99)",
          "customer": {
            "nickname": "@NAME",
            "mobile": /^1(3|4|5|7|8)\d{9}$/
          },
          "shop": {
            "id|+1": 1,
            "name": "@NAME"
          },
          "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
          "status": "@integer(0, 8)",

        }],
        "cancellation": "@integer(0, 3)",
        "signed_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
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
