import Command from './TicketCommand';

export default class CreateShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, ticket) {
        try {
            let ticketInfo = Command.buildTicketInfo(ticket);
            console.log('ticket info', ticketInfo);
            let result = await this.http.tickets.create(projectId, ticketInfo);
            console.log(result);
        }catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_TICKET';
    }
}
