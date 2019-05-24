import Model from './Model';
import UserRechargeableCardConsumeRecordTransformer from './transformers/UserRechargeableCardConsumeRecord';

export default class UserRechargeableCardConsumeRecord extends Model {
    constructor(app) {
        super(app);
        this.transformer = UserRechargeableCardConsumeRecordTransformer;
    }

}