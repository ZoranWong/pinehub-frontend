export default class WxTemplateMessage {
    constructor(wxTemplateMessage) {
        this.id = wxTemplateMessage['id'];
        this.templateId = wxTemplateMessage['template_id'];
        this.wxAppId = wxTemplateMessage['wx_app_id'];
        this.title = wxTemplateMessage['title'];
        this.primaryIndustry = wxTemplateMessage['primary_industry'];
        this.deputyIndustry = wxTemplateMessage['deputy_industry'];
        this.items = wxTemplateMessage['items'];
        this.createdAt = wxTemplateMessage['created_at'];
        this.updatedAt = wxTemplateMessage['updated_at'];
    }
}