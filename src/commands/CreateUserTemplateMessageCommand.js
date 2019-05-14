import Command from './Command';

export default class CreateUserTemplateMessageCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(userTemplateMessage) {
        try {
            delete userTemplateMessage['keywords'];
            delete userTemplateMessage['parent'];
            return await this.http.userTemplateMessages.create(userTemplateMessage);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_USER_TEMPLATE';
    }
}