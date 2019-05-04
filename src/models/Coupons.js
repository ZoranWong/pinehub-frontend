import Model from './Model';
import CouponCardTransformer from './transformers/CouponCard';
import _ from "underscore";

export default class Coupons extends Model {
    constructor(application) {
        super(application);
        this.transformer = CouponCardTransformer;
    }

    data() {
        let superData = super.data();
        this.dataMap = _.extend(superData, {
            entity: null
        });
        return this.dataMap;
    }

    listeners() {
        super.listeners();

        this.addEventListener('createEditInit', function ({entity}) {
            this.entity = entity;
        });
    }
}
