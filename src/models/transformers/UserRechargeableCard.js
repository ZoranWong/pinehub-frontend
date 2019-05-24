import RechargeableCardTransformer from '../transformers/RechargeableCard';

export default class UserRechargeableCard {
    constructor(userRechargeableCard) {
        this.id = userRechargeableCard['id'];
        this.userId = userRechargeableCard['user_id'];
        this.customerId = userRechargeableCard['customer_id'];
        this.orderId = userRechargeableCard['order_id'];

        this.amount = userRechargeableCard['amount'];
        this.validAt = userRechargeableCard['valid_at'];
        this.invalidAt = userRechargeableCard['invalid_at'];
        this.isAutoRenew = userRechargeableCard['is_auto_renew'];
        this.status = userRechargeableCard['status'];
        this.statusDesc = userRechargeableCard['statusDesc'];

        this.rechargeableCard = userRechargeableCard['rechargeableCard'] ? new RechargeableCardTransformer(userRechargeableCard['rechargeableCard']['data']) : null;

        this.createdAt = userRechargeableCard['created_at'];
        this.updatedAt = userRechargeableCard['updated_at'];
    }
}