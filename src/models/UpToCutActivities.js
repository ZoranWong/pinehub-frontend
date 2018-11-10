import Model from './Model';
import UpToCutActivityTransformer from './transformers/UpToCutActivity';
export default class UpToCutActivities extends Model {
    constructor(application) {
        super(application);
        this.transformer = UpToCutActivityTransformer;
    }
}
