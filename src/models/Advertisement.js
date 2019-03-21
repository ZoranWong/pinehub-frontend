import Model from './Model';
import AdvertisementTransformer from './transformers/Advertisement';

export default class Advertisement extends Model {
    constructor(application) {
        super(application);
        this.transformer = AdvertisementTransformer;
    }
}