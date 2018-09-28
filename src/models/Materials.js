import Model from './Model'
import MaterialTranformer from './transformers/Material';
import _ from 'underscore';
export default class Materials extends Model{
  constructor(application) {
    super(application);
    this.transformer = MaterialTranformer;
  }
}
