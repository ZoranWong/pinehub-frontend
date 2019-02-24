export default class Shop {
    constructor(shop) {
        this.index = shop['index'];
        this.id = shop['id'];
        this.name = shop['name'];
        this.manager = shop['manager'];
        this.code = shop['code'];
        this.province = shop['province'];
        this.city = shop['city'];
        this.county = shop['county'];
        this.boss = this.manager ?  ((this.manager['real_name'] ? this.manager['real_name'] :
            (this.manager['nickname'] ? this.manager['nickname'] : this.manager['user_name']))
            + '('+ this.manager['mobile'] +')') : '没有老板';
        this.address = shop['address'];
        this.thisMonthAmount = shop['this_month_amount'].toFixed(2);
        this.lastMonthAmount = shop['last_month_amount'].toFixed(2);
        this.sellAmount = shop['sell_amount'].toFixed(2);
        this.orderCount = shop['order_count'];
        this.merchandiseCount = shop['merchandise_count'];
        this.balance = shop['balance'].toFixed(2);
    }
}
