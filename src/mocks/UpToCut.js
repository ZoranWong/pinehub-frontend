import Mock from './Mock';
/* eslint-disable */
export default class UpToCut extends Mock {
  constructor(application) {
    super(application);
    this.total = 150;
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data":{
        "id|+1": 1,
        "title": "@CWORD(4, 10)",
        "begin_at": "@NOW(second, yyyy-MM-dd hh:mm:ss)",
        "end_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "gifts|1-5": [
          {
            "cost": "@float(10, 50, 2, 2)",
            "least_amount": "@float(0, 1000, 2, 2)",
            "discount": "@integer(1, 10)",
            "ticket_id|+1": 1,
            "score": "@integer(10, 100)",
            "ticket_number": "@integer(1, 10)",
            "level|+1": 1,
            "gift_types": ["cost", "discount", "score", 'ticket_id']
          }
        ]
      }
    };
  }
}
