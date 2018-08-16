export default class Shop {
  constructor(shop) {
    this.index = shop.index;
    this.id = shop.id;
    this.name = shop.name;
    this.manager = shop.manager;
    this.code = shop.code;
    this.province = shop.province;
    this.city = shop.city;
    this.county = shop.city;
    this.boss = this.manager.user_name + '('+ this.manager.mobile +')';
    this.address = shop.address;
    
    this.num = shop.num;
    this.money = shop.money.toFixed(2);
    this.sells = shop.sells.toFixed(2);
    this.goods = shop.goods;
    this.turnover = shop.turnover.toFixed(2);
    this.actual = shop.actual.toFixed(2);
    this.shopTurnover = shop.shopTurnover.toFixed(2);
  }
}
