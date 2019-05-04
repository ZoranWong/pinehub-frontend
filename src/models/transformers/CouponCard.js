import _ from 'underscore';

export default class CouponCard {
    constructor(coupon) {
        const CARD_TYPES = {
            'DISCOUNT': '折扣券',
            'CASH': '现金券'
        };

        const SYNC = [
            '同步失败',
            '同步中',
            '同步成功'
        ];

        this.id = coupon['id'];
        this.index = coupon['index'];
        this.title = coupon['title'];
        this.status = coupon['status'];
        this.statusDesc = coupon['status_desc'];
        this.type = CARD_TYPES[coupon['card_type']];
        this.content = coupon['card_type'] === 'CASH' ? (coupon['least_cost'] > 0 ? `满${coupon['least_cost']}元减${coupon['reduce_cost']}元` : `减${coupon['reduce_cost']}元`) : `${coupon['discount']}折`;
        this.publish = coupon['platform'] === 'WX_TICKET' ? SYNC[coupon['sync']] : '平台优惠券不需要同步';
        this.code = coupon['code'];
        this.cardId = coupon['card_id'];
        this.issuedNum = coupon['issue_count'] ? coupon['issue_count'] : '无限制';
        this.stockNum = coupon['quantity'];
        this.receivedNum = coupon['user_get_count'];
        this.usedNum = coupon['used_count'];
        this.beginToEnd = coupon['begin_at'] && coupon['end_at'] ? (coupon['begin_at'] + '-' + coupon['end_at']) : '不限时间';
        this.usedRate = (coupon['used_rate'] * 100).toFixed(2) + '%';
        let startAt = '', endAt = '';
        if (_.isObject(coupon['begin_at'])) {
            startAt = coupon['begin_at']['date'];
        } else {
            startAt = coupon['begin_at'];
        }
        startAt = new Date(startAt);

        if (_.isObject(coupon['end_at'])) {
            endAt = coupon['end_at']['date'];
        } else {
            endAt = coupon['end_at'];
        }
        endAt = new Date(endAt);
        this.startAt = startAt.format('yyyy-MM-dd hh:mm:ss');
        this.endAt = endAt.format('yyyy-MM-dd hh:mm:ss');
        this.activeTime = coupon['active_time'];
        this.promoteUrl = coupon['promote_url'];
        this.promoteMiniCodeUrl = coupon['promote_minicode_url'];
    }
}
