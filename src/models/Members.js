import Model from './Model';
import MemberTransformer from './transformers/Member';
export default class Members extends Model{
    constructor(application) {
        super(application);
        this.transformer = MemberTransformer;
    }
}
