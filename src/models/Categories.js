import Model from './Model'
import _ from 'underscore';
import CategoryTransformer from './transformers/Category';
export default class Categories extends Model{
  constructor(application) {
    super(application);
    this.transformer = CategoryTransformer;
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
