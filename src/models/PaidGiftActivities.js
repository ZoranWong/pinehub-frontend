import Model from './Model';
import _ from 'underscore';
import PaidGiftActivityTransformer from './transformers/PaidGiftActivity';
export default class PaidGiftActivities extends Model {
  constructor(application) {
    super(application);
    this.transformer = PaidGiftActivityTransformer;
  }
}
