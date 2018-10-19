import Command from './Command';
export default class CreateShopCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(projectId, shop, $vm) {
    let result = await this.service('http.shops').create(projectId, shop);
    if(result) {
      $vm.$message({
        message: '恭喜你，店铺创建成功！',
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
    return 'CREATE_SHOP';
  }
}
