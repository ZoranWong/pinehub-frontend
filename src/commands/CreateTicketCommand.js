import Command from './TicketCommand';
export default class CreateShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, ticket) {
        let ticketInfo = Command.buildTicketInfo(ticket);
        console.log('ticket info', ticketInfo);
        let result = await this.http.tickets.create(projectId, ticketInfo);
        console.log(result);
    }
    static commandName() {
        return 'CREATE_TICKET';
    }
}
