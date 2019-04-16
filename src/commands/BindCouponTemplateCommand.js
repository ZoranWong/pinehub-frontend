import Command from './Command';
import UserTemplateMessage from "../models/transformers/UserTemplateMessage";

export default class BindCouponTemplateCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(ticketId, templateId, wxType, scene, type) {
        try {
            let response = await this.http.tickets.bindTemplate(ticketId, templateId, wxType, scene, type);
            return new UserTemplateMessage(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'BIND_COUPON_TEMPLATE';
    }
}