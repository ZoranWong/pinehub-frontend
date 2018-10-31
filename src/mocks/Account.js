import Mock from './Mock';
/* eslint-disable */
export default class Account extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(id) {
    let ttl = this.service('date').addDays(1);
    let refreshTtl = this.service('date').addDays(2);
    return {
      "data": {
        "id|+17"        : 1,
        "user_name"  : "@CWORD(2, 4)",
        "nickname"   : "@CWORD(2, 4)",
        "mobile":    /^(135)\d{9}$/,
        "sex"        : "@integer(0, 1)",
        "token" : "@string(64, 64)",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      },
      "meta": {
        "token": {
          "value": "@string(64)",
          "ttl": ttl,
          "refresh_ttl": refreshTtl
        }
      }
    };
  }
}
