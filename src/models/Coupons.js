import Model from './Model';
import _ from 'underscore';
import CouponCardTransformer from './transformers/CouponCard';
export default class Coupons extends Model {
  constructor(application) {
    super(application);
    this.transformer = CouponCardTransformer;
  }
  data() {
    return _.extend(super.data(), {

    });
  }
  computed() {
    return _.extend(super.computed(), {

    });
  }

  dispatchs() {
    return _.extend(super.dispatchs(), {

    });
  }

  listeners() {
    return _.extend(super.listeners(), {

    });
  }
}
