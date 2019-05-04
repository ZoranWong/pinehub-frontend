import CouponCard from './CouponCard';

export default class Advertisement {
    constructor(advertisement) {
        const STATUS = {
            0: '等待投放',
            1: '投放中',
            2: '已过期',
            3: '已下架',
        };

        const SEX = {
            'ALL': '不限',
            'MALE': '男性',
            'FEMALE': '女性'
        };

        this.id = advertisement['id'];
        this.title = advertisement['title'];
        this.bannerUrl = advertisement['banner_url'];
        this.beginAt = advertisement['begin_at'];
        this.endAt = advertisement['end_at'];
        this.status = advertisement['status'];
        this.statusDesc = STATUS[this.status];
        this.createdAt = advertisement['created_at'];
        this.updatedAt = advertisement['updated_at'];
        this.sexDesc = SEX[advertisement['conditions']['sex']];
        this.conditions = {
            sex: advertisement['conditions']['sex'],
            payment_amount: '￥' + advertisement['conditions']['payment_amount']
        };
        if (advertisement['ticket']) {
            this.ticket = new CouponCard(advertisement['ticket']);
        }
    }
}