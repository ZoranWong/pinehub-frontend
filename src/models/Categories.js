import Model from './Model'
import CategoryTransformer from './transformers/Category';

export default class Categories extends Model {
    constructor(application) {
        super(application);
        this.transformer = CategoryTransformer;
    }

    // 预定义 key
    static KEY_VIRTUAL = 'virtual';
    static KEY_DEPOSIT_CARD = 'deposit_card';
    static KEY_DEPOSIT_CARD_GENERAL = 'deposit_card_general';
    static KEY_DEPOSIT_CARD_USER = 'deposit_card_user';
    static KEY_DEPOSIT_CARD_MERCHANT = 'deposit_card_merchant';
    static KEY_DISCOUNT_CARD = 'discount_card';
    static KEY_DISCOUNT_CARD_GENERAL = 'discount_card_general';
    static KEY_DISCOUNT_CARD_USER = 'discount_card_user';
    static KEY_DISCOUNT_CARD_MERCHANT = 'discount_card_merchant';
}
