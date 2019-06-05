import Model from './Model';
import UserRechargeableCardConsumeRecordTransformer from './transformers/UserRechargeableCardConsumeRecord';

export default class UserRechargeableCardConsumeRecord extends Model {
    constructor(app) {
        super(app);
        this.transformer = UserRechargeableCardConsumeRecordTransformer;
    }

    static CHANNEL_WX = 100;
    static CHANNEL_WX_CODE_SWEEP_PAYMENT = 101;
    static CHANNEL_WX_BALANCE_CENTER = 102;
    static CHANNEL_ALI = 200;

    static channels() {
        let channels = {};
        channels[this.CHANNEL_WX] = '微信小程序';
        channels[this.CHANNEL_WX_CODE_SWEEP_PAYMENT] = '微信扫码付';
        channels[this.CHANNEL_WX_BALANCE_CENTER] = '微信小程序余额中心';
        channels[this.CHANNEL_ALI] = '支付宝小程序';
        return channels;
    }
}