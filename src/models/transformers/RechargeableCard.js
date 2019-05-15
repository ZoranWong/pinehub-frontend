export default class RechargeableCard {
    constructor(rechargeableCard) {
        this.id = rechargeableCard['id'];
        this.index = rechargeableCard['index'];
        this.name = rechargeableCard['name'];
        this.amount = rechargeableCard['amount'] / 100;
        this.price = rechargeableCard['price'] / 100;
        this.preferentialPrice = rechargeableCard['preferential_price'] / 100;
        this.autoRenewPrice = rechargeableCard['auto_renew_price'] / 100;
        this.onSale = rechargeableCard['on_sale'];
        this.isRecommend = rechargeableCard['is_recommend'];
        this.discount = rechargeableCard['discount'];
        this.cardType = rechargeableCard['card_type'];
        this.cardTypeDesc = rechargeableCard['card_type_desc'];
        this.type = rechargeableCard['type'];
        this.typeDesc = rechargeableCard['type_desc'];
        this.timeUnit = rechargeableCard['time_unit'];
        this.count = rechargeableCard['count'];
        this.usageScenarios = rechargeableCard['usage_scenarios'];
        this.usageScenariosDesc = rechargeableCard['usage_scenarios_desc'];
        this.specifiedStart = rechargeableCard['specified_start'];
        this.specifiedEnd = rechargeableCard['specified_end'];
        this.status = rechargeableCard['status'];
        this.statusDesc = rechargeableCard['status_desc'];
        this.sort = rechargeableCard['sort'];
        // 附赠优惠券
        this.giftTickets = rechargeableCard.hasOwnProperty('giftTickets') ? rechargeableCard['gift_tickets']['data'] : [];
    }
}