import _ from 'underscore';
export default class CouponCard {
  constructor(coupon) {
    this.id = coupon['id'];
    this.index=coupon['index'];
    this.title = coupon['title'];
    this.type = coupon['type'];
    this.publish = coupon['is_publish'] ? '是' : '否';
    this.code = coupon['code'];
    this.issuedNum = coupon['issued_num'];
    this.stockNum = coupon['stock_num'];
    this.receivedNum = coupon['received_num'];
    this.useNum = coupon['use_num'];
    this.useRate = (coupon['use_rate'] * 100).toFixed(2)+'%';
    let endAt = '';
    if(_.isObject(coupon['end_at'])) {
      endAt = coupon['end_at']['date'];
    }else{
      endAt = coupon['end_at'];
    }
    endAt = new Date(endAt);
    this.endAt = endAt.format('yyyy-MM-dd hh:mm:ss');
  }
}
