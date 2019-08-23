import Command from './Command';
export default class DelShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, shopId) {
        try{
            let result = await this.$service('http.shops').del(projectId, shopId);
            if(result) {
                this.$message({
                    message: '恭喜你，店铺修改成功！',
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
        return 'DEL_SHOP';
    }
}
