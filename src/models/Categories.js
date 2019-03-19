import Model from './Model'
import CategoryTransformer from './transformers/Category';
export default class Categories extends Model{
    constructor(application) {
        super(application);
        this.transformer = CategoryTransformer;
    }
}
