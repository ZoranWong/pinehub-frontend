import Model from './Model';
import RechargeableCardTransformer from './transformers/RechargeableCard';

export default class RechargeableCard extends Model {
    constructor(application) {
        super(application);
        this.transformer = RechargeableCardTransformer;
    }

    static CARD_TYPE_DEPOSIT = 'DEPOSIT';
    static CARD_TYPE_DISCOUNT = 'DISCOUNT';
    static LIMIT_TYPE_INDEFINITE = 101;
    static LIMIT_TYPE_WEEKLY = 201;
    static LIMIT_TYPE_MONTHLY = 202;
    static LIMIT_TYPE_SEASON = 203;
    static LIMIT_TYPE_YEAR = 204;
    static LIMIT_TYPE_CUSTOM = 205;
    static LIMIT_TYPE_TIME_SPECIFIED = 206;
    static TIME_UNIT_YEAR = 'year';
    static TIME_UNIT_MONTH = 'month';
    static TIME_UNIT_DAY = 'day';
    static TIME_UNIT_HOUR = 'hour';
}