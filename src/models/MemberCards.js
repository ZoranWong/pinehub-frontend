import Model from './Model';
import _ from 'underscore';
import MemberCardTransformer from './transformers/MemberCard';
export default class MemberCards extends Model{
  constructor(application) {
    super(application);
    this.transformer = MemberCardTransformer;
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
