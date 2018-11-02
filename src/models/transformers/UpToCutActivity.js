export default class UpToCutActivity {
  constructor(activity) {
    const ACTIVITY_STATUS = [
        '未开始',
        '进行中',
        '结束',
        '关闭'
    ];
    this.index = activity['index'];
    this.id = activity['id'];
    this.name = activity['title'];
    let start = new Date(activity['start_at']['date']);
    let end = new Date(activity['end_at']['date']);
    this.activeTime = start.format('yyyy-MM-dd hh:mm:ss') + '-' + end.format('yy-MM-dd hh:mm:ss');
    this.orderNum = activity['order_count'];
    this.paymentAmount = activity['paid_amount'].toFixed(2);
    this.userNum = activity['customer_count'];
    this.status = ACTIVITY_STATUS[activity['status']];
  }
}
