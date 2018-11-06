import Command from './Command';
export default class UpdateMemberCardCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(id, card) {
        let result = await this.$service('http.memberCards').update(this.$requestInput('projectId'), id, card);
        if(result) {
            this.$message({
                message: '恭喜你，店铺创建成功！',
                type: 'success'
            });
            this.$router.push({
                name: 'memberCards',
                params: {
                    projectId: this.$requestInput('projectId')
                }
            });
        }
    }
    static commandName() {
        return 'UPDATE_MEMBER_CARD';
    }
}
