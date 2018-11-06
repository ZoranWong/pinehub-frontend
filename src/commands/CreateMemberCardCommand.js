import Command from './Command';
export default class CreateMemberCardCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle( card ) {
        let result = await this.$service('http.memberCards').create(this.$requestInput('projectId'), card);
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
        return 'CREATE_MEMBER_CARD';
    }
}
