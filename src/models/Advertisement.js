import Model from './Model';
import AdvertisementTransformer from './transformers/Advertisement';
import _ from "underscore";

export default class Advertisement extends Model {
    constructor(application) {
        super(application);
        this.transformer = AdvertisementTransformer;
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