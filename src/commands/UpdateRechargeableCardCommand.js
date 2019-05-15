import Command from './Command';
import RechargeableCard from "../models/transformers/RechargeableCard";

export default class UpdateRechargeableCardCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(rechargeableCard) {
        try {
            let result = await this.http.rechargeableCards.update(rechargeableCard);
            return new RechargeableCard(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UPDATE_RECHARGEABLE_CARD';
    }
}