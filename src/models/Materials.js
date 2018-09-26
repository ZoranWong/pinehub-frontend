import Model from './Model'
import MaterialTranformer from './transformers/Material';
import _ from 'underscore';
export default class Materials extends Model{
  constructor(application) {
    super(application);
    this.transformer = MaterialTranformer;
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
