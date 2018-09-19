import Model from './Model';
import MemberTranformer from './transformers/Member';
import _ from 'underscore';
export default class Members extends Model{
  constructor(application) {
    super(application);
    this.transformer = MemberTranformer;
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
