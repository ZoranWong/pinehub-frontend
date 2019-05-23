import Model from 'Model';
import UserRechargeableCardTransformer from './transformers/UserRechargeableCard';

export default class UserRechargeableCard extends Model {
    constructor(app) {
        super(app);
        this.transformer = UserRechargeableCardTransformer;
    }
}