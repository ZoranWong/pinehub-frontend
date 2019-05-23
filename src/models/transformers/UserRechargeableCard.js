import RechargeableCardTransformer from '../transformers/RechargeableCard';
import OrderTransformer from '../transformers/Order';

export default class UserRechargeableCard {
    constructor(userRechargeableCard) {
        this.id = userRechargeableCard['id'];
        this.userId = userRechargeableCard['user_id'];
        this.customerId = userRechargeableCard['customer_id'];
        this.orderId = userRechargeableCard['order_id'];
        this.rechargeableCardId = userRechargeableCard['rechargeable_card_id'];
        this.userRechargeableCardId = userRechargeableCard['user_rechargeable_card_id'];

        this.type = userRechargeableCard['type'];
        this.typeDesc = userRechargeableCard['type_desc'];

        this.rechargeableCard = new RechargeableCardTransformer(userRechargeableCard['rechargeable_card']['data']);
        this.order = new OrderTransformer(userRechargeableCard['order']['data']);
        this.user = userRechargeableCard['user']['data'];
        this.userRechargeableCard = userRechargeableCard['user_rechargeable_card']['data'];

        this.consumeAmount = userRechargeableCard['consume'];
        this.saveAmount = userRechargeableCard['save'];

        this.createdAt = userRechargeableCard['created_at'];
        this.updatedAt = userRechargeableCard['updated_at'];
    }
}