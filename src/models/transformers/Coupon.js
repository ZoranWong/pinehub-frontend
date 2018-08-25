export default class Project {
  constructor(coupon) {
    this.title = coupon.title;
    this.cratedAt = coupon.created_at;
    this.type = coupon.type;
    this.id = coupon.id;
    this.isTrue = coupon.isTrue?'是':'否';
    this.code = coupon.code;
    this.hangs = coupon.hangs;
    this.total = coupon.total;
    this.nums = coupon.nums;
    this.useNum = coupon.useNum;
    this.useF = coupon.useF.toFixed(2)+'%';
    this.index=coupon.index
  }
}
