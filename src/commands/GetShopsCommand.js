//汇报命令
/* eslint-disable */
import Command from './Command';
export default class GetShopsCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(page, search = null, limit = 15) {
    let [shops, totalNum, currentPage, totalPage ] = await this.service('shops').shops(page, search, limit);
    this.store().dispatch({
      type: 'shops/setShops',
      shops: shops,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage
    });
  }
  static commandName() {
    return 'get-shops';
  }
}
