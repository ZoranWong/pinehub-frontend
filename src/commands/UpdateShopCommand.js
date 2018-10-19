import Command from './Command';
export default class UpdateShopCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(projectId, shopId, shop, $vm) {
    let result = await this.service('http.shops').create(projectId, shopId, shop);
    if(result) {
      $vm.$message({
        message: '恭喜你，店铺修改成功！',
        type: 'success'
      });
      $vm.$router.push({
        name: 'shops',
        params: {
          projectId: $vm.$requestInput('projectId')
        }
      });
    }
  }

  static commandName() {
    return 'UPDATE_SHOP';
  }
}
