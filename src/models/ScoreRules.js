import Model from './Model'
import ScoreRuleTranformer from './transformers/ScoreRule';
import _ from 'underscore';
export default class ScoreRules extends Model{
  constructor(application) {
    super(application);
    this.transformer = ScoreRuleTranformer;
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
