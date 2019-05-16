import Command from './Command';
import RechargeableCardModel from "../models/RechargeableCard";
import RechargeableCard from "../models/transformers/RechargeableCard";

export default class CreateRechargeableCardCommand extends Command {
    constructor(app) {
        super(app);
    }

    buildInfo(rechargeableCard) {
        let rechargeableCardInfo = JSON.parse(JSON.stringify(rechargeableCard));

        switch (rechargeableCardInfo['card_type']) {
            case RechargeableCardModel.CARD_TYPE_DEPOSIT:
                rechargeableCardInfo['discount'] = 100;
                rechargeableCardInfo['usage_scenarios'] = [0];// 储蓄卡全场通用
                break;
            case RechargeableCardModel.CARD_TYPE_DISCOUNT:
                rechargeableCardInfo['amount'] = 0;
                break;
        }

        switch (rechargeableCardInfo['type']) {
            case RechargeableCardModel.LIMIT_TYPE_INDEFINITE:
                rechargeableCardInfo['count'] = 0;
                rechargeableCardInfo['unit'] = '';
                break;
            case RechargeableCardModel.LIMIT_TYPE_WEEKLY:
                rechargeableCardInfo['count'] = 7;
                rechargeableCardInfo['unit'] = RechargeableCardModel.TIME_UNIT_DAY;
                rechargeableCardInfo['specified_start'] = null;
                rechargeableCardInfo['specified_end'] = null;
                break;
            case RechargeableCardModel.LIMIT_TYPE_MONTHLY:
                rechargeableCardInfo['count'] = 1;
                rechargeableCardInfo['unit'] = RechargeableCardModel.TIME_UNIT_MONTH;
                rechargeableCardInfo['specified_start'] = null;
                rechargeableCardInfo['specified_end'] = null;
                break;
            case RechargeableCardModel.LIMIT_TYPE_SEASON:
                rechargeableCardInfo['count'] = 3;
                rechargeableCardInfo['unit'] = RechargeableCardModel.TIME_UNIT_MONTH;
                rechargeableCardInfo['specified_start'] = null;
                rechargeableCardInfo['specified_end'] = null;
                break;
            case RechargeableCardModel.LIMIT_TYPE_YEAR:
                rechargeableCardInfo['count'] = 1;
                rechargeableCardInfo['unit'] = RechargeableCardModel.TIME_UNIT_YEAR;
                rechargeableCardInfo['specified_start'] = null;
                rechargeableCardInfo['specified_end'] = null;
                break;
            case RechargeableCardModel.LIMIT_TYPE_CUSTOM:
                rechargeableCardInfo['specified_start'] = null;
                rechargeableCardInfo['specified_end'] = null;
                break;
        }

        return rechargeableCardInfo;
    }

    async handle(rechargeableCard) {
        try {
            let rechargeableCardInfo = this.buildInfo(rechargeableCard);
            let result = await this.http.rechargeableCards.create(rechargeableCardInfo);
            return new RechargeableCard(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_RECHARGEABLE_CARD';
    }
}