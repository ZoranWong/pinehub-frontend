import _ from 'underscore';
export default class CouponCard {
  constructor(coupon) {
    const CARD_TYPES = {
      'DISCOUNT': '折扣券',
      'CASH': '现金券'
    };
    this.id = coupon['id'];
    this.index=coupon['index'];
    this.title = coupon['title'];
    this.type = CARD_TYPES[coupon['card_type']];
    this.publish = coupon['is_publish'] ? '是' : '否';
    this.code = coupon['code'];
    this.issuedNum = coupon['issue_count'] ? coupon['issue_count'] : '无限制';
    this.stockNum = coupon['quantity'];
    this.receivedNum = coupon['user_get_count'];
    this.usedNum = coupon['used_count'];
    this.usedRate = (coupon['used_rate'] * 100).toFixed(2) + '%';
    let startAt = '', endAt = '';
    if(_.isObject(coupon['begin_at'])) {
      startAt = coupon['begin_at']['date'];
    }else{
      startAt = coupon['begin_at'];
    }
    startAt = new Date(startAt);

    if(_.isObject(coupon['end_at'])) {
        endAt = coupon['end_at']['date'];
    }else{
        endAt = coupon['end_at'];
    }
    endAt = new Date(endAt);
    this.activeTime  = startAt.format('yyyy-MM-dd hh:mm:ss') + '-' + endAt.format('yyyy-MM-dd hh:mm:ss');
  }
}
