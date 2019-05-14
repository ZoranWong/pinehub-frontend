import BaseModel from './UserTemplateMessage';
import UserTemplateMessageTransformer from './transformers/UserTemplateMessage';

export default class UserTemplateWithOfficialAccount extends BaseModel {
    constructor(app) {
        super(app);
        this.transformer = UserTemplateMessageTransformer;
    }
}