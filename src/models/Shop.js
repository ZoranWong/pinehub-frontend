export default class Shop {
  constructor(shop) {
    this.id = shop.id;
    this.name = shop.name;
    this.manager = shop.manager;
    this.code = shop.code;
    this.province = shop.province;
    this.city = shop.city;
    this.county = shop.city;
  }
  boss() {
    return this.manager.user_name + '('+ this.manager.mobile +')';
  }
  location() {
    return this.province.name + '-' + this.city.name + '-' + this.county.name;
  }
}
