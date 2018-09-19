import Model from './Model'
import CustomerTranformer from './transformers/Customer';
import _ from 'underscore';
export default class Customers extends Model{
  constructor(application) {
    super(application);
    this.transformer = CustomerTranformer;
  }
  computed() {
    return _.extend(super.computed(), {
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
