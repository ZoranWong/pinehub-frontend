import Model from './Model';
import MemberTranformer from './transformers/Member';
import _ from 'underscore';
export default class Members extends Model{
  constructor(application) {
    super(application);
    this.transformer = MemberTranformer;
  }
}
