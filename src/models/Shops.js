import Model from './Model'
import _ from 'underscore';
import ShopTransformer from './transformers/Shop';
export default class Shops extends Model{
  constructor(application) {
    super(application);
    this.transformer = ShopTransformer;
  }
  computed() {
    return _.extend(super.computed(), {
      getShopsBuyPage: (state) => (page) => {
        return state.orders[page -1];
      }
    });
  }
  data() {
    return _.extend(super.data(), {

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
