import Command from './Command';
export default class UpdateMerchandiseCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, id, merchandise) {
        let result = await this.$service('http.merchandises').update(projectId, id, merchandise);
        if(result) {
            this.$message({
                message: '恭喜你，商品修改成功！',
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
        return 'UPDATE_MERCHANDISE';
    }
}
