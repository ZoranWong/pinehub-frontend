import Model from './Model';
import RechargeableCardTransformer from './transformers/RechargeableCard';

export default class RechargeableCard extends Model {
    constructor(application) {
        super(application);
        this.transformer = RechargeableCardTransformer;
    }
}