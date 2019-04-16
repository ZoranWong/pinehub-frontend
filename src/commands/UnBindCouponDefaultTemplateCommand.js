import Command from './Command';

export default class UnBindCouponDefaultTemplateCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(templateId, wxType, scene, type) {
        try {
            let response = await this.http.tickets.unBindDefaultTemplate(templateId, wxType, scene, type);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UNBIND_COUPON_DEFAULT_TEMPLATE';
    }
}