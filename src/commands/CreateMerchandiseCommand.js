import Command from './Command';
export default class CreateMerchandiseCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, merchandise) {
        let result = await this.$service('http.merchandises').create(projectId, merchandise);
        if(result) {
            this.$message({
                message: '恭喜你，店铺创建成功！',
                type: 'success'
            });
            this.$router.push({
                name: 'merchandises',
                params: {
                    projectId: this.$requestInput('projectId')
                }
            });
        }
    }
    static commandName() {
        return 'CREATE_MERCHANDISE';
    }
}
