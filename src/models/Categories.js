import Model from './Model'
import _ from 'underscore';
import CategoryTransformer from './transformers/Category';
export default class categories extends Model{
  constructor(application) {
    super(application);
    this.transformer = CategoryTransformer;
  }
  computed() {
    let computed = super.computed();
    return _.extend(computed, {

    });
  }
  data() {
    let data = super.data();
    return _.extend(data, {

    });
  }
  dispatchs() {
    let dispatchs = super.dispatchs();
    return _.extend(dispatchs, {

    });
  }

  listeners() {
    let listeners = super.listeners();
    return _.extend(listeners, {

    });
  }
}
