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
      getShopsBuyPage(){
        return (page) => {
          return this.orders[page -1];
        };
      }
    });
  }
}
