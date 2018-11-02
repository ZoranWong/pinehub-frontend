//返回前一页命令
import Command from './Command';
export default class UpdateWechatMenuCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(id, menus) {
        let result = await this.http.wechatMenus.update(this.$requestInput('projectId'), id, menus);
        if(result) {
            // result = await this.http.wechatMenus.syncMenu(this.$requestInput('projectId'), id);
            this.$message({
                message: '更新同步成功',
                type: 'success'
            });
            this.$command('REDIRECT', {name: 'wechat-menus', params: {'projectId': this.$requestInput('projectId')}});
        }
    }

    static commandName() {
        return 'UPDATE_WECHAT_MENU';
    }
}
