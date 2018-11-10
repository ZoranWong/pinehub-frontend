//返回前一页命令
import Command from './Command';
export default class UpdateProjectCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(id, name, logo, contactName, contactPhoneNum) {
        try{
            let result = await this.$service('http.projects').update(id, {
                name: name,
                logo: logo,
                contactName: contactName,
                contactPhoneNum: contactPhoneNum
            });
            if(result) {
                this.$message({
                    message: '恭喜你，应用项目更新成功！',
                    type: 'success'
                });
                this.saving = false;
                this.dialogShow = false;
                this.$parent.getProjects();
            }else{
                this.$message({
                    message: '很遗憾，项目更新失败！',
                    type: 'error'
                });
            }
        }catch (e) {
            console.log(e);
        }
    }
    static commandName() {
        return 'UPDATE_PROJECT';
    }
}
