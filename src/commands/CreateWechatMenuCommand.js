//返回前一页命令
import Command from './Command';
export default class CreateWechatMenuCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(menus) {
        let result = await this.http.wechatMenus.create(this.$requestInput('projectId'), menus);
        if(result) {
            result = await this.http.wechatMenus.syncMenu(this.$requestInput('projectId'), result.id);
            if(result) {
                this.$message({
                    message: '菜单创建并发布成功',
                    type: 'success'
                });
                this.$command('REDIRECT', {name: 'wechat-menus', params: {'projectId': this.$requestInput('projectId')}});
            }
        }
    }

    static commandName() {
        return 'CREATE_WECHAT_MENU';
    }
}
