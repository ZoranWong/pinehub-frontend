import Model from './Model'
import CustomerTransformer from './transformers/Customer';
export default class Customers extends Model{
    constructor(application) {
        super(application);
        this.transformer = CustomerTransformer;
    }
}
