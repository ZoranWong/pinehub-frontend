import Command from './Command';

export default class GetCouponDefaultTemplatesCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(types) {
        try {
            let response = await this.http.tickets.getDefaultTemplateMessages(types);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'GET_COUPON_DEFAULT_TEMPLATES';
    }
}