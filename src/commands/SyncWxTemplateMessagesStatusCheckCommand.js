import Command from './Command';

export default class SyncWxTemplateMessagesStatusCheckCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(type) {
        try {
            let result = await this.http.wxTemplateMessages.syncStatusCheck(type);
            this.$notify({
                title: '模板消息同步',
                message: '状态：' + result.msg,
                type: 'success'
            });
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'SYNC_WX_TEMPLATE_MESSAGES_STATUS_CHECK';
    }
}