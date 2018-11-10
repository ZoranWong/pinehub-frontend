import Command from './Command';
export default class CreateShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, shop) {
        try{
            let result = await this.$service('http.shops').create(projectId, shop);
            if(result) {
                this.$message({
                    message: '恭喜你，店铺创建成功！',
                    type: 'success'
                });
                this.$router.push({
                    name: 'shops',
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
        return 'CREATE_SHOP';
    }
}
