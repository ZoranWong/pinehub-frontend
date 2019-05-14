import Model from './Model';
import WxTemplateMessageTransformer from './transformers/WxTemplateMessage';
import _ from "underscore";

export default class WxTemplateMessage extends Model {
    constructor(application) {
        super(application);
        this.transformer = WxTemplateMessageTransformer;
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