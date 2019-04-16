import Command from './Command';

export default class UnBindCouponTemplateCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(ticketId, templateId) {
        try {
            let response = await this.http.tickets.unBindTemplate(ticketId, templateId);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UNBIND_COUPON_TEMPLATE';
    }
}