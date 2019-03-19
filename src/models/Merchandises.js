import Model from './Model';
import MerchandiseTransformer from './transformers/Merchandise';
export default class Merchandises extends Model{
    constructor(application) {
        super(application);
        this.transformer = MerchandiseTransformer;
    }
}
