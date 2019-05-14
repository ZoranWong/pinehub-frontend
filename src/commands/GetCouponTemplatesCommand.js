import Command from './Command';

export default class GetCouponTemplatesCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(ticketId) {
        try {
            let response = await this.http.tickets.getTemplateMessages(ticketId);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'GET_COUPON_TEMPLATES';
    }
}