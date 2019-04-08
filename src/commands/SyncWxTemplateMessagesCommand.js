import Command from './Command';

export default class SyncWxMiniProgramTemplatesCommand extends Command {
    constructor(app) {
        super(app);
    }

    static commandName() {
        return 'sync_wx_miniprogram';
    }
}