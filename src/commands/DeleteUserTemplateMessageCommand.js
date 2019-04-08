import Command from './Command';

export default class DeleteUserTemplateMessageCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(templateId) {
        try {
            await this.http.userTemplateMessages.delete(templateId);
            this.$message.success('删除成功');
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'DELETE_USER_TEMPLATE_MESSAGE';
    }
}
