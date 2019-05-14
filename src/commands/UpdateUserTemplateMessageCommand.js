import Command from './Command';

export default class UpdateUserTemplateMessageCommand extends Command {

    constructor(app) {
        super(app);
    }

    async handle(userTemplateMessage) {
        try {
            return await this.http.userTemplateMessages.update(userTemplateMessage);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UPDATE_USER_TEMPLATE';
    }
}