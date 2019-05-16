import Model from './Model';
import RechargeableCardTransformer from './transformers/RechargeableCard';

export default class RechargeableCard extends Model {
    constructor(application) {
        super(application);
        this.transformer = RechargeableCardTransformer;
    }

    // 卡片类型
    static CARD_TYPE_DEPOSIT = 'DEPOSIT';
    static CARD_TYPE_DISCOUNT = 'DISCOUNT';
    // 限期类型
    static LIMIT_TYPE_INDEFINITE = 101;
    static LIMIT_TYPE_WEEKLY = 201;
    static LIMIT_TYPE_MONTHLY = 202;
    static LIMIT_TYPE_SEASON = 203;
    static LIMIT_TYPE_YEAR = 204;
    static LIMIT_TYPE_CUSTOM = 205;
    static LIMIT_TYPE_TIME_SPECIFIED = 206;
    // 时间单位
    static TIME_UNIT_YEAR = 'year';
    static TIME_UNIT_MONTH = 'month';
    static TIME_UNIT_DAY = 'day';
    static TIME_UNIT_HOUR = 'hour';
    // 状态类型
    static STATUS_DEFINED_ONLY = 0;
    static STATUS_ON = 11;
    static STATUS_PREFERENTIAL = 12;
    static STATUS_OFF = 21;

    static limitTypes() {
        let cardTypes = {};
        cardTypes[this.LIMIT_TYPE_INDEFINITE] = '无限期';
        cardTypes[this.LIMIT_TYPE_WEEKLY] = '周卡';
        cardTypes[this.LIMIT_TYPE_MONTHLY] = '月卡';
        cardTypes[this.LIMIT_TYPE_SEASON] = '季卡';
        cardTypes[this.LIMIT_TYPE_YEAR] = '年卡';
        cardTypes[this.LIMIT_TYPE_CUSTOM] = '自定义';
        cardTypes[this.LIMIT_TYPE_TIME_SPECIFIED] = '特定时段/天';
        return cardTypes;
    };

    static createStatusEnum() {
        let statusEnum = {};
        statusEnum[this.STATUS_DEFINED_ONLY] = '仅制卡';
        statusEnum[this.STATUS_ON] = '仅上架';
        statusEnum[this.STATUS_PREFERENTIAL] = '上架&优惠';
        return statusEnum;
    }

    static statusEnum() {
        let statusEnum = this.createStatusEnum();
        statusEnum[this.STATUS_OFF] = '下架';
        return statusEnum;
    }
}