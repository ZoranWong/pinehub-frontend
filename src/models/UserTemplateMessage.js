import Model from './Model';
import UserTemplateMessageTransformer from './transformers/UserTemplateMessage';
import _ from "underscore";

export default class UserTemplateMessage extends Model {
    constructor(app) {
        super(app);
        this.transformer = UserTemplateMessageTransformer;
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