import UserTransformer from './Member';
import OrderTransformer from './Order';
import RechargeableCardTransformer from './RechargeableCard';
import UserRechargeableCardTransformer from './UserRechargeableCard';

export default class UserRechargeableCardConsumeRecord {
    constructor(consumeRecord) {
        this.id = consumeRecord['id'];
        this.index = consumeRecord['index'];

        this.user = consumeRecord['user'] ? new UserTransformer(consumeRecord['user']['data']) : null;
        this.order = consumeRecord['order'] ? new OrderTransformer(consumeRecord['order']['data']) : null;
        this.rechargeableCard = consumeRecord['rechargeableCard'] ?
            new RechargeableCardTransformer(consumeRecord['rechargeableCard']['data']) : null;
        this.userRechargeableCard = consumeRecord['userRechargeableCard'] ? new UserRechargeableCardTransformer(consumeRecord['userRechargeableCard']['data']) : null;

        this.type = consumeRecord['type'];
        this.typeDesc = consumeRecord['type_desc'];

        this.consume = consumeRecord['consume'];
        this.save = consumeRecord['save'];
        this.channel = consumeRecord['channel'];
        this.channelDesc = consumeRecord['channel_desc'];

        this.createdAt = consumeRecord['created_at'];
        this.updatedAt = consumeRecord['updated_at'];
    }

}