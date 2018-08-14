export default class Shop {
  constructor(shop) {
    this.id = shop.id;
    this.name = shop.name;
    this.manager = shop.manager;
    this.code = shop.code;
    this.province = shop.province;
    this.city = shop.city;
    this.county = shop.city;
    this.boss = this.manager.user_name + '('+ this.manager.mobile +')';
    this.address = shop.address;
  }
}
