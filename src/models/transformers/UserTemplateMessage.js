import WxTemplateMessage from './WxTemplateMessage';

export default class UserTemplateMessage {
    constructor(userTemplateMessage) {
        this.id = userTemplateMessage['id'];
        this.wxAppId = userTemplateMessage['wx_app_id'];
        this.content = userTemplateMessage['content'];
        this.templateId = userTemplateMessage['template_id'];
        this.parent = new WxTemplateMessage(userTemplateMessage['parent']);
        this.createdAt = userTemplateMessage['created_at'];
        this.updatedAt = userTemplateMessage['updated_at'];

        this.title = this.parent.title;
        this.items = this.parent.items;
    }

}