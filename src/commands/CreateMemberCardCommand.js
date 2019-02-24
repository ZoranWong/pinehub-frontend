import Command from './Command';
export default class CreateMemberCardCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle( card ) {
        try{
            let result = await this.$service('http.memberCards').create(this.$requestInput('projectId'), card);
            if(result) {
                this.$message({
                    message: '恭喜你，店铺创建成功！',
                    type: 'success'
                });
                this.$router.push({
                    name: 'member-cards',
                    params: {
                        projectId: this.$requestInput('projectId')
                    }
                });
            }
        }catch (e) {
            console.log(e);
        }

    }
    static commandName() {
        return 'CREATE_MEMBER_CARD';
    }
}
