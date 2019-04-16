import Command from './TicketCommand';
import CouponCard from "../models/transformers/CouponCard";

export default class CreateShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, ticket) {
        try {
            let ticketInfo = Command.buildTicketInfo(ticket);
            let result = await this.http.tickets.create(projectId, ticketInfo);
            return new CouponCard(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_TICKET';
    }
}
