import Model from './Model';
import _ from 'underscore';
import MenuTransformer from './transformers/WechatMenu';
export default class WechaMenu extends Model {
    constructor(application) {
        super(application);
        this.transformer = MenuTransformer;
    }
}
