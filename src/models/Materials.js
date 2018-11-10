import Model from './Model'
import MaterialTransformer from './transformers/Material';
export default class Materials extends Model{
    constructor(application) {
        super(application);
        this.transformer = MaterialTransformer;
    }
}
