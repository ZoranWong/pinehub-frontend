import _ from 'underscore';
export default class UpToCutActivity {
  constructor(activity) {
    this.index = activity['index'];
    this.id = activity['id'];
    this.name = activity['name'];
    this.activeTime = activity['active_time'];
    this.orderNum = activity['order_num'];
    this.paymentAmount = activity['paid_amount'].toFixed(2);
    this.userNum = activity['user_num'];
    this.status = activity['status'];
  }
}
