import Mock from './Mock';
/* eslint-disable */
export default class Account extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(id) {
    return {
      "data": {
        "id|+17"        : 1,
        "user_name"  : "@CWORD(2, 4)",
        "nickname"   : "@CWORD(2, 4)",
        "mobile":    /^(135)\d{9}$/,
        "sex"        : "@integr(0, 1)",
        "token" : "@string(64, 64)",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }
    };
  }
}
