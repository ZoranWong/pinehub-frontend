import Command from './Command';

export default class SyncWxTemplateMessagesCommand extends Command {

    constructor(app) {
        super(app);
    }

    async handle(type) {
        try {
            let result = null;
            if (type === 'miniprogram') {
                result = await this.http.wxTemplateMessages.syncMiniProgramTemplateMessages();
            }
            if (type === 'official_account') {
                result = await this.http.wxTemplateMessages.syncOfficialAccountTemplateMessages();
            }
            if (result) {
                this.$notify({
                    title: '模板消息同步',
                    message: '状态：' + result.msg,
                    type: 'success'
                });
                return result;
            }
            this.$message.warning('同步对象必须为小程序或者公众号');
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'SYNC_WX_TEMPLATE_MESSAGES';
    }
}