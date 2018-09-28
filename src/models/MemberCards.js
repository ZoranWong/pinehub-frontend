import Model from './Model';
import _ from 'underscore';
import MemberCardTransformer from './transformers/MemberCard';
export default class MemberCards extends Model{
  constructor(application) {
    super(application);
    this.transformer = MemberCardTransformer;
  }
}
