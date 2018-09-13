import Model from './Model';
import _ from 'underscore';
import MenuTransformer from './transformers/WechatMenu';
export default class WechaMenu extends Model {
  constructor(application) {
    super(application);
    this.transformer = MenuTransformer;
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
