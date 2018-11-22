//返回前一页命令
import Command from './Command';
export default class CreateProjectCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(name, logo, contactName, contactPhoneNum) {
        try {
            let result =  await this.$service('http.projects').create(name, logo, contactName, contactPhoneNum);
            if(result) {
                //授权
                this.$emit('openPlatformAuth');
                this.saving = false;
                this.dialogShow = false;
            }else{
                this.$message({
                    message: '很遗憾，新项目创建失败！',
                    type: 'error'
                });
            }
        }catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_PROJECT';
    }
}
