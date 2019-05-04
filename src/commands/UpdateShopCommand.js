import Command from './Command';
import _ from 'underscore';
export default class UpdateShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, shopId, shop) {
        try{
            let result = await this.$service('http.shops').update(projectId, shopId, shop);
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
        return 'UPDATE_SHOP';
    }
}
