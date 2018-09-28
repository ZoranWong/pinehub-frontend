import Model from './Model';
import _ from 'underscore';
import CouponCardTransformer from './transformers/CouponCard';
export default class Coupons extends Model {
  constructor(application) {
    super(application);
    this.transformer = CouponCardTransformer;
  }
}
