import Model from './Model'
import CustomerTranformer from './transformers/Customer';
import _ from 'underscore';
export default class Customers extends Model{
  constructor(application) {
    super(application);
    this.transformer = CustomerTranformer;
  }
}
